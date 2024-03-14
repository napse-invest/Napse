import CustomForm from '@/components/custom/selectedObject/inputs'
import ContextHeader from '@/components/layout/contextHeader'
import DefaultPageLayout from '@/components/layout/defaultPageLayout'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/components/ui/use-toast'
import {
  addServer,
  getLastUpdateDateCheck,
  removeServer,
  updateLastUpdateDateCheck
} from '@/lib/localStorage'
import { ReloadIcon } from '@radix-ui/react-icons'
import { ipcRenderer } from 'electron'
import fs from 'fs'
import path from 'path'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { z } from 'zod'

const defaultSecrets = {
  AWS__API_TOKEN: '',
  AWS__API_SECRET: '',
  AWS__REGION: ''
}
type TypeProviders =
  | 'Amazon Web Services'
  | 'Microsoft Azure'
  | 'Google Cloud Platfrom'

function writeSecretsToFile(secrets: { [key: string]: string }) {
  const rootPath = process.env.HOME || process.env.USERPROFILE
  if (!rootPath) throw new Error('No root path found')
  const filePath = path.join(
    rootPath,
    process.env.NODE_ENV === 'production' ? '.napse' : '.napse-dev',
    'secrets.json'
  )
  const dirPath = path.dirname(filePath)
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
  fs.writeFileSync(filePath, JSON.stringify(secrets), 'utf8')
}

async function testIsDeployed(
  secrets: { [key: string]: string },
  provider: TypeProviders
) {
  if (provider === 'Amazon Web Services') {
    return await ipcRenderer.invoke('isDeployedAWS', {
      secrets
    })
  }
  throw new Error('Provider not supported')
}

async function testIsReadyToUpdate(
  secrets: { [key: string]: string },
  provider: TypeProviders
) {
  if (provider === 'Amazon Web Services') {
    return await ipcRenderer.invoke('isReadyToUpdateAWS', {
      secrets
    })
  }
  throw new Error('Provider not supported')
}

async function testHasAvailableUpdate(
  secrets: { [key: string]: string },
  provider: TypeProviders
) {
  if (provider === 'Amazon Web Services') {
    if (
      new Date(getLastUpdateDateCheck(provider)).getTime() + 1000 * 60 * 60 <
      new Date().getTime()
    ) {
      const updatable = await ipcRenderer.invoke('hasAvailableUpdate', {
        secrets
      })
      updateLastUpdateDateCheck(provider, updatable)
      return updatable
    } else {
      return false
    }
  }
  throw new Error('Provider not supported')
}
async function updateStatus(
  secrestsSet: boolean,
  secrets: { [key: string]: string },
  provider: TypeProviders,
  setIsDeployed: Dispatch<SetStateAction<boolean>>,
  setIsReadyToUpdate: Dispatch<SetStateAction<boolean>>,
  setHasAvailableUpdate: Dispatch<SetStateAction<boolean>>
) {
  if (!secrestsSet) return
  setIsDeployed(await testIsDeployed(secrets, provider))
  setIsReadyToUpdate(await testIsReadyToUpdate(secrets, provider))
  setHasAvailableUpdate(await testHasAvailableUpdate(secrets, provider))
}
export default function Settings(): JSX.Element {
  const { toast } = useToast()
  const [infoDeploy, setInfoDeploy] = useState('')
  const [infoUpdate, setInfoUpdate] = useState('')
  const [infoFullReset, setInfoFullReset] = useState('')
  const [isErrorMessage, setIsErrorMessage] = useState(false)
  const [secrets, setSecrets] = useState(defaultSecrets)
  const [secrestsSet, setSecretsSet] = useState(false)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [provider, setProvider] = useState<TypeProviders>('Amazon Web Services')
  const [isDeployed, setIsDeployed] = useState(false)
  const [isReadyToUpdate, setIsReadyToUpdate] = useState(false)
  const [hasAvailableUpdate, setHasAvailableUpdate] = useState(false)

  useEffect(() => {
    ipcRenderer.on('ServerChannel', function listener(event, data) {
      if (data.from === 'deploy') {
        setInfoDeploy(data.errorMessage ? data.errorMessage : data.message)
        if (data.extraData?.envURL) {
          const rootPath = process.env.HOME || process.env.USERPROFILE
          if (!rootPath) throw new Error('No root path found')
          const filePath = path.join(
            rootPath,
            process.env.NODE_ENV === 'production' ? '.napse' : '.napse-dev',
            'napse-secrets.json'
          )
          let serverData = null
          if (fs.existsSync(filePath)) {
            serverData = JSON.parse(fs.readFileSync(filePath, 'utf8'))
          } else {
            throw new Error('No secrets file found')
          }
          addServer(
            provider,
            'https://' + serverData.domain,
            serverData.master_key
          )
        }
      } else if (data.from === 'update') {
        setInfoUpdate(data.errorMessage ? data.errorMessage : data.message)
      } else if (data.from === 'fullReset') {
        setInfoFullReset(data.errorMessage ? data.errorMessage : data.message)
        removeServer(provider)
      }
      if (data.step === 'END') {
        updateStatus(
          secrestsSet,
          secrets,
          provider,
          setIsDeployed,
          setIsReadyToUpdate,
          setHasAvailableUpdate
        )
      }
      setIsErrorMessage(data.errorMessage ? true : false)

      setLoading(data.busy)
      setProgress(data.progress)
    })
  }, [
    provider,
    secrestsSet,
    secrets,
    setIsDeployed,
    setIsReadyToUpdate,
    setHasAvailableUpdate
  ])

  useEffect(() => {
    const rootPath = process.env.HOME || process.env.USERPROFILE
    if (!rootPath) throw new Error('No root path found')
    const filePath = path.join(
      rootPath,
      process.env.NODE_ENV === 'production' ? '.napse' : '.napse-dev',
      'secrets.json'
    )

    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8')
      setSecrets(JSON.parse(data))
    } else {
      writeSecretsToFile(defaultSecrets)
    }
    setSecretsSet(true)
  }, [])

  useEffect(() => {
    async function apiCall() {
      updateStatus(
        secrestsSet,
        secrets,
        provider,
        setIsDeployed,
        setIsReadyToUpdate,
        setHasAvailableUpdate
      )
    }
    apiCall()
  }, [secrets, provider, secrestsSet])

  useEffect(() => {
    if (hasAvailableUpdate) {
      toast({
        title: 'Update available',
        description: 'An update is available for your server.'
      })
    }
  }, [hasAvailableUpdate, toast])

  return (
    <ContextHeader isServer>
      <DefaultPageLayout
        header="Settings"
        description="Here you can configure the application."
      >
        <div className="flex flex-col space-y-5">
          <Separator />
          <h2 className="text-2xl font-bold leading-tight tracking-tighter">
            Server Configuration
          </h2>
          <p className="text-sm">
            {
              "In order to fully use Napse's functionalities, you'll need to deploy your own server. Don't worry, we've made it easy for you !"
            }
            <br />
            Start by selecting your provider and then follow the steps.
          </p>

          <DropdownMenu>
            <DropdownMenuTrigger asChild className="h-7 w-32 ">
              <Button variant="outline" disabled={loading}>
                Provider
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuRadioGroup
                value={provider}
                onValueChange={(value) => {
                  setProvider(value as TypeProviders)
                }}
              >
                <DropdownMenuRadioItem value="Amazon Web Services">
                  Amazon Web Services
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Microsoft Azure" disabled>
                  Microsoft Azure
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Google Cloud Platfrom" disabled>
                  Google Cloud
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          {provider && (
            <Tabs defaultValue={'Setup'} className="max-w-xl">
              <TabsList>
                <Separator orientation="vertical" className="relative h-2/3" />
                <TabsTrigger value={'Setup'} disabled={loading}>
                  Setup
                </TabsTrigger>
                <TabsTrigger value={'Deploy'} disabled={loading}>
                  Deploy
                </TabsTrigger>
                <TabsTrigger value={'Update'} disabled={loading}>
                  Update
                </TabsTrigger>
                <TabsTrigger value={'Pause'} disabled={loading}>
                  Pause
                </TabsTrigger>
                <TabsTrigger value={'Full Reset'} disabled={loading}>
                  Full Reset
                </TabsTrigger>
              </TabsList>
              <TabsContent value={'Setup'}>
                <Card>
                  <CardHeader>
                    <CardTitle>{provider + ' credentials'}</CardTitle>
                    <CardDescription>
                      In order to get started, please fill in this form with
                      your {provider} credentials.
                      <br />
                      {"You'll need to create an " +
                        provider +
                        " account if you don't have one."}
                      <br />
                      More info here:
                      <br />
                      <button
                        className="focus:ring-opacity/50 text-blue-500 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={() =>
                          ipcRenderer.send(
                            'open-new-window',
                            'https://napse-invest.github.io/Napse/'
                          )
                        }
                      >
                        https://napse-invest.github.io/Napse/
                      </button>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CustomForm
                      inputs={[
                        {
                          label: 'Token',
                          key: 'token',
                          type: 'input',
                          zod: z.string(),
                          value: secrets.AWS__API_TOKEN
                        },
                        {
                          label: 'Secret',
                          key: 'secret',
                          type: 'input',
                          zod: z.string(),
                          value: secrets.AWS__API_SECRET
                        },
                        {
                          label: 'Region',
                          key: 'region',
                          type: 'select',
                          zod: z.string(),
                          value: secrets.AWS__REGION,
                          default: secrets.AWS__REGION,
                          placeholder: secrets.AWS__REGION,
                          possibilities: {
                            'eu-west-3': 'eu-west-3',
                            'us-east-1': 'us-east-1'
                          }
                        }
                      ]}
                      onSubmit={(values) => {
                        writeSecretsToFile({
                          AWS__API_TOKEN: values.token,
                          AWS__API_SECRET: values.secret,
                          AWS__REGION: values.region
                        })
                        setSecrets({
                          AWS__API_TOKEN: values.token,
                          AWS__API_SECRET: values.secret,
                          AWS__REGION: values.region
                        })
                      }}
                      buttonDescription="Save"
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value={'Deploy'}>
                <Card className="h-[100%]">
                  <CardHeader>
                    <CardTitle>Deployment</CardTitle>
                    <CardDescription>
                      {
                        "We've made deploying your own server easy, just click this button!"
                      }
                    </CardDescription>
                    {isDeployed && (
                      <div className=" text-destructive text-sm">
                        Warning: Server already deployed
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="flex flex-col items-center justify-center">
                    <div className="h-4" />
                    <Button
                      className="w-[100%]"
                      onClick={() => {
                        ipcRenderer.invoke('deployAWS', {
                          secrets
                        })
                      }}
                      disabled={loading || isDeployed}
                    >
                      {loading && (
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      {loading ? 'Deploying' : 'Deploy to AWS'}
                    </Button>
                    <div className="h-1" />
                    {loading && <Progress value={progress} />}
                    <div className="h-1" />
                    <div className="text-muted-foreground text-center text-sm">
                      {infoDeploy}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value={'Update'}>
                <Card className="h-[100%]">
                  <CardHeader>
                    <CardTitle>Updating</CardTitle>
                    <CardDescription>
                      {
                        "Here's a little button to update your server, just in case you want to do so."
                      }
                    </CardDescription>
                    <div className=" text-destructive text-sm">
                      {!isDeployed
                        ? 'Warning: No server deployed'
                        : !isReadyToUpdate
                        ? 'Warning: Server not ready'
                        : !hasAvailableUpdate
                        ? 'Warning: No updates available'
                        : ''}
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center justify-center">
                    <div className="h-4" />
                    <Button
                      className="w-[100%]"
                      onClick={async () => {
                        await new Promise((resolve) => setTimeout(resolve, 100))
                        ipcRenderer.invoke('updateAWS', {
                          secrets
                        })
                      }}
                      disabled={
                        loading ||
                        !isReadyToUpdate ||
                        !isDeployed ||
                        !hasAvailableUpdate
                      }
                    >
                      {loading && (
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      {loading ? 'Updating' : 'Update'}
                    </Button>
                    <div className="h-1" />
                    {loading && <Progress value={progress} />}
                    <div className="h-1" />
                    <div
                      className={
                        (isErrorMessage
                          ? ' text-destructive'
                          : 'text-muted-foreground') + ' text-center text-sm'
                      }
                    >
                      {infoUpdate}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value={'Pause'}>
                <Card className="h-[100%]">
                  <CardHeader>
                    <CardTitle>Pause</CardTitle>
                    <CardDescription>
                      {
                        "If you're not using your server, you can pause it to save some money."
                      }
                    </CardDescription>
                    <div className=" text-destructive text-sm">
                      {!isDeployed
                        ? 'Warning: No server deployed'
                        : !isReadyToUpdate
                        ? 'Warning: Server not ready'
                        : ''}
                    </div>
                  </CardHeader>

                  <CardContent className="flex flex-col items-center justify-center">
                    <div className="h-4" />
                    <Button
                      className="w-[100%]"
                      onClick={() => {
                        ipcRenderer.invoke('fullCleanupAWS', {
                          secrets: secrets,
                          deleteData: false
                        })
                      }}
                      disabled={loading || !isReadyToUpdate || !isDeployed}
                    >
                      {loading && (
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      {loading ? 'Shutting down server' : 'Shut down server'}
                    </Button>

                    <div className="h-1" />
                    {loading && <Progress value={progress} />}
                    <div className="h-1" />
                    <div className="text-muted-foreground text-center text-sm">
                      {infoFullReset}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value={'Full Reset'}>
                <Card className="h-[100%]">
                  <CardHeader>
                    <CardTitle>Full Reset</CardTitle>
                    <CardDescription>
                      {
                        "Had enough of your server? Just click this button and it'll be gone."
                      }
                    </CardDescription>
                    <div className=" text-destructive text-sm">
                      {!isDeployed
                        ? 'Warning: No server deployed'
                        : !isReadyToUpdate
                        ? 'Warning: Server not ready'
                        : ''}
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center justify-center">
                    <div className="h-4" />
                    <Button
                      className="w-[100%]"
                      onClick={() => {
                        ipcRenderer.invoke('fullCleanupAWS', {
                          secrets: secrets,
                          deleteData: true
                        })
                      }}
                      disabled={loading || !isReadyToUpdate || !isDeployed}
                    >
                      {loading && (
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      {loading ? 'Reseting' : 'Full Reset'}
                    </Button>

                    <div className="h-1" />
                    {loading && <Progress value={progress} />}
                    <div className="h-1" />
                    <div className="text-muted-foreground text-center text-sm">
                      {infoFullReset}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </DefaultPageLayout>
    </ContextHeader>
  )
}
