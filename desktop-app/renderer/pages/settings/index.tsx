import ContextHeader from '@/components/layout/contextHeader'
import DefaultPageLayout from '@/components/layout/defaultPageLayout'
import { Button } from '@/components/ui/button'
import { ipcRenderer } from 'electron'
import fs from 'fs'
import path from 'path'
import { useEffect, useState } from 'react'

export default function Settings(): JSX.Element {
  useEffect(() => {
    ipcRenderer.on('AWSChannel', function listener(event, data) {
      console.log(data)
    })
  }, [])
  return (
    <ContextHeader isServer>
      <DefaultPageLayout
        header="Settings"
        description="Here you can configure the application."
      >
        <div className="">
          <SecretsInPutOrReadFromFile />
        </div>
      </DefaultPageLayout>
    </ContextHeader>
  )
}

const defaultSecrets = {
  AWS__API_TOKEN: '',
  AWS__API_SECRET: '',
  AWS__REGION: ''
}

function SecretsInPutOrReadFromFile(): JSX.Element {
  const [secrets, setSecrets] = useState(defaultSecrets)
  const [deployData, setDeployData] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    const rootPath = process.env.HOME || process.env.USERPROFILE
    if (!rootPath) throw new Error('No root path found')
    const filePath = path.join(rootPath, '.napse', 'secrets.json')
    const dirPath = path.dirname(filePath)
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true })
    }
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8')
      setSecrets(JSON.parse(data))
    } else {
      fs.writeFileSync(filePath, JSON.stringify(defaultSecrets), 'utf8')
    }
  }, [])
  return (
    <div>
      <div>
        {secrets.AWS__API_TOKEN} | {secrets.AWS__API_SECRET} |{' '}
        {secrets.AWS__REGION}
      </div>
      <Button
        onClick={() => {
          const res = ipcRenderer.invoke('deployAWS', {
            secrets
          })
        }}
      >
        Deploy to AWS
      </Button>
      <Button
        onClick={() => {
          const res = ipcRenderer.invoke('fullCleanupAWS', {
            secrets
          })
        }}
      >
        Full Reset
      </Button>
      <Button
        onClick={() => {
          const res = ipcRenderer.invoke('updateAWS', {
            secrets
          })
        }}
      >
        Update
      </Button>
      <div>{deployData.error || null}</div>
    </div>
  )
}
