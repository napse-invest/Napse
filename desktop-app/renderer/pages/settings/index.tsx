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
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { addServer, removeServer } from '@/lib/localStorage'
import { ReloadIcon } from '@radix-ui/react-icons'
import { ipcRenderer } from 'electron'
import fs from 'fs'
import path from 'path'
import { useEffect, useState } from 'react'
import { z } from 'zod'

const defaultSecrets = {
  AWS__API_TOKEN: '',
  AWS__API_SECRET: '',
  AWS__REGION: ''
}

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

export default function Settings(): JSX.Element {
  const [infoDeploy, setInfoDeploy] = useState('')
  const [infoUpdate, setInfoUpdate] = useState('')
  const [infoFullReset, setInfoFullReset] = useState('')
  const [isErrorMessage, setIsErrorMessage] = useState(false)
  const [secrets, setSecrets] = useState(defaultSecrets)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [canScroll, setCanScroll] = useState(false)
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  useEffect(() => {
    ipcRenderer.on('AWSChannel', function listener(event, data) {
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
            'AWS',
            'https://' + serverData.domain,
            serverData.master_key
          )
        }
      } else if (data.from === 'update') {
        setInfoUpdate(data.errorMessage ? data.errorMessage : data.message)
      } else if (data.from === 'fullReset') {
        setInfoFullReset(data.errorMessage ? data.errorMessage : data.message)
        removeServer('AWS')
      }
      setIsErrorMessage(data.errorMessage ? true : false)

      setLoading(data.busy)
      setProgress(data.progress)
      setCanScroll(data.busy)
    })
  }, [])

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
  }, [])

  return (
    <ContextHeader isServer>
      <DefaultPageLayout
        header="Settings"
        description="Here you can configure the application."
      >
        <Tabs defaultValue={'Deploy to AWS'}>
          <TabsList>
            <TabsTrigger value={'Deploy to AWS'}>Deploy to AWS</TabsTrigger>
          </TabsList>

          <TabsContent value={'Deploy to AWS'}>
            <Carousel className="w-[40%]" setApi={setApi}>
              <CarouselContent>
                <CarouselItem>
                  <Card className="h-[100%]">
                    <CardHeader>
                      <CardTitle>Step 1 : AWS credentials</CardTitle>
                      <CardDescription>
                        In order to get started, please fill in this form with
                        you AWS credentials.
                        <br />
                        Next step : Deployement
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
                            possibilities: ['eu-west-3', 'us-east-1']
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
                </CarouselItem>
                <CarouselItem>
                  <Card className="h-[100%]">
                    <CardHeader>
                      <CardTitle>Step 2 : Deployment</CardTitle>
                      <CardDescription>
                        {
                          "We've made deploying your own server easy, just click this button!"
                        }
                        <br />
                        Next step : Updating
                      </CardDescription>
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
                        disabled={loading}
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
                </CarouselItem>
                <CarouselItem>
                  <Card className="h-[100%]">
                    <CardHeader>
                      <CardTitle>Step 3 : Updating</CardTitle>
                      <CardDescription>
                        {
                          "He's a little button to update your server, just in case you want to do so."
                        }
                        <br />
                        Next step : Full Reset
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center">
                      <div className="h-4" />
                      <Button
                        className="w-[100%]"
                        onClick={async () => {
                          await new Promise((resolve) =>
                            setTimeout(resolve, 100)
                          )
                          ipcRenderer.invoke('updateAWS', {
                            secrets
                          })
                        }}
                        disabled={loading}
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
                </CarouselItem>
                <CarouselItem>
                  <Card className="h-[100%]">
                    <CardHeader>
                      <CardTitle>Step 4 : Full Reset</CardTitle>
                      <CardDescription>
                        {
                          "Had enough of your server? Just click this button and it'll be gone."
                        }
                        <br />
                        {"It's just that easy."}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center">
                      <div className="h-4" />
                      <Button
                        className="w-[100%]"
                        onClick={() => {
                          const res = ipcRenderer.invoke('fullCleanupAWS', {
                            secrets
                          })
                        }}
                        disabled={loading}
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
                </CarouselItem>
              </CarouselContent>
              <div className="text-muted-foreground text-center text-sm">
                Slide {current} of {count}
              </div>
              <CarouselPrevious disabled={canScroll || current === 1} />
              <CarouselNext disabled={canScroll || current === count} />
            </Carousel>
          </TabsContent>
        </Tabs>
      </DefaultPageLayout>
    </ContextHeader>
  )
}
