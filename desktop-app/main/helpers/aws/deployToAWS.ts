import { BrowserWindow } from 'electron'
import fs from 'fs'
import {
  attachIAMPolicy,
  connectRoleToInstanceProfile,
  createBucket,
  createEBApp,
  createEBAppVersion,
  createEBEnvironement,
  createIAMRole,
  downloadAWSDeployPackage,
  downloadBucket,
  getEnvironments,
  getNapseVersion,
  securityGroupSetup,
  unzipPackage,
  updateEBEnvironment,
  updateStatus,
  uploadFileToBucket
} from 'main/helpers'
import path from 'path'

export const EB_BUCKET_NAME = 'napse-eb-bucket'
export const EB_APP_NAME = 'napse'
export const EB_APP_DESCRIPTION = 'No description'
export const EB_ENV_NAME = 'napse-env'
export const IAM_ROLE_NAME_SERVICE_ROLE = 'napse-iam-service-role'
export const IAM_ROLE_NAME_EC2_ROLE = 'napse-iam-ec2-role'
export const IAM_INSTANCE_PROFILE_NAME = 'napse-iam-instance-profile'

export default async function Main(
  secrets: {
    AWS__API_TOKEN: string
    AWS__API_SECRET: string
    AWS__REGION: string
  },
  mainWindow: BrowserWindow
) {
  updateStatus(mainWindow, 'deploy', 'START')
  updateStatus(mainWindow, 'deploy', 'getNapseVersion')
  const version = await getNapseVersion()
  updateStatus(mainWindow, 'deploy', 'downloadAWSDeployPackage')
  await downloadAWSDeployPackage(mainWindow, version)
  updateStatus(mainWindow, 'deploy', 'createBucket')
  await createBucket(secrets, mainWindow, EB_BUCKET_NAME)
  updateStatus(mainWindow, 'deploy', 'unzipPackage')
  await unzipPackage(`deploy-aws-${version}.zip`)
  updateStatus(mainWindow, 'deploy', 'uploadFileToBucket1')
  await uploadFileToBucket(
    secrets,
    mainWindow,
    path.join(`deploy-aws-${version}`, 'config.json'),
    'config.json',
    EB_BUCKET_NAME
  )
  updateStatus(mainWindow, 'deploy', 'uploadFileToBucket2')
  await uploadFileToBucket(
    secrets,
    mainWindow,
    path.join(`deploy-aws-${version}`, `deploy-${version}.zip`),
    `deploy-${version}.zip`,
    EB_BUCKET_NAME
  )
  updateStatus(mainWindow, 'deploy', 'createEBApp')
  await createEBApp(secrets, mainWindow, EB_APP_NAME, EB_APP_DESCRIPTION)
  updateStatus(mainWindow, 'deploy', 'createEBAppVersion')
  await createEBAppVersion(
    secrets,
    mainWindow,
    EB_APP_NAME,
    EB_BUCKET_NAME,
    version
  )
  updateStatus(mainWindow, 'deploy', 'createIAMRole1')
  if (
    await createIAMRole(secrets, mainWindow, IAM_ROLE_NAME_SERVICE_ROLE, {
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Principal: {
            Service: 'elasticbeanstalk.amazonaws.com'
          },
          Action: 'sts:AssumeRole',
          Condition: {
            StringEquals: {
              'sts:ExternalId': 'elasticbeanstalk'
            }
          }
        }
      ]
    })
  ) {
    const policyArnsServiceRole = [
      'arn:aws:iam::aws:policy/service-role/AWSElasticBeanstalkEnhancedHealth',
      'arn:aws:iam::aws:policy/AWSElasticBeanstalkManagedUpdatesCustomerRolePolicy'
    ]
    updateStatus(mainWindow, 'deploy', 'attachIAMPolicy1')
    for (const policyArn of policyArnsServiceRole) {
      await attachIAMPolicy(
        secrets,
        mainWindow,
        policyArn,
        IAM_ROLE_NAME_SERVICE_ROLE
      )
    }
  }

  updateStatus(mainWindow, 'deploy', 'createIAMRole2')
  if (
    await createIAMRole(secrets, mainWindow, IAM_ROLE_NAME_EC2_ROLE, {
      Version: '2008-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Principal: {
            Service: 'ec2.amazonaws.com'
          },
          Action: 'sts:AssumeRole'
        }
      ]
    })
  ) {
    const policyArnsEC2Role = [
      'arn:aws:iam::aws:policy/AWSElasticBeanstalkWebTier',
      'arn:aws:iam::aws:policy/AWSElasticBeanstalkWorkerTier',
      'arn:aws:iam::aws:policy/AWSElasticBeanstalkMulticontainerDocker',
      'arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess'
    ]
    updateStatus(mainWindow, 'deploy', 'attachIAMPolicy2')
    for (const policyArn of policyArnsEC2Role) {
      await attachIAMPolicy(
        secrets,
        mainWindow,
        policyArn,
        IAM_ROLE_NAME_EC2_ROLE
      )
    }
    updateStatus(mainWindow, 'deploy', 'connectRoleToInstanceProfile')
    await connectRoleToInstanceProfile(
      secrets,
      mainWindow,
      IAM_INSTANCE_PROFILE_NAME,
      IAM_ROLE_NAME_EC2_ROLE
    )
  }

  updateStatus(mainWindow, 'deploy', 'createEBEnvironement')
  await createEBEnvironement(
    secrets,
    mainWindow,
    EB_APP_NAME,
    EB_ENV_NAME,
    IAM_INSTANCE_PROFILE_NAME,
    IAM_ROLE_NAME_SERVICE_ROLE,
    version
  )
  let allDeployedOrTerminated = false
  let envURL = ''
  updateStatus(mainWindow, 'deploy', 'waitForEbEnvToBeReady')
  while (!allDeployedOrTerminated) {
    const environments = await getEnvironments(
      secrets,
      mainWindow,
      EB_APP_NAME,
      EB_ENV_NAME
    )
    if (environments) {
      for (const env of environments) {
        if (env.Status === 'Ready') {
          allDeployedOrTerminated = true
          if (env.CNAME === undefined) {
            throw new Error('EndpointURL is undefined')
          }
          envURL = env.CNAME
          break
        }
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }
  securityGroupSetup(secrets, mainWindow)
  updateStatus(mainWindow, 'deploy', 'updateEBEnvironment')
  await updateEBEnvironment(
    secrets,
    mainWindow,
    EB_APP_NAME,
    EB_ENV_NAME,
    version,
    [
      {
        Namespace: 'aws:elasticbeanstalk:application:environment',
        OptionName: 'NAPSE_API_DOMAIN',
        Value: envURL
      }
    ]
  )
  let downloaded = false
  updateStatus(mainWindow, 'deploy', 'downloadBucket')
  while (!downloaded) {
    downloaded = await downloadBucket(
      secrets,
      mainWindow,
      'napse-secrets.json',
      EB_BUCKET_NAME
    )
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  updateStatus(mainWindow, 'deploy', 'syncBucket')
  const rootPath = process.env.HOME || process.env.USERPROFILE
  if (!rootPath) throw new Error('No root path found')

  const filePath = path.join(
    rootPath,
    process.env.NODE_ENV === 'production' ? '.napse' : '.napse-dev',
    'napse-secrets.json'
  )
  const data = fs.readFileSync(filePath, 'utf8')
  const jsonData = JSON.parse(data)
  jsonData['domain'] = envURL
  fs.writeFileSync(filePath, JSON.stringify(jsonData), 'utf8')
  uploadFileToBucket(
    secrets,
    mainWindow,
    'napse-secrets.json',
    'napse-secrets.json',
    EB_BUCKET_NAME
  )
  updateStatus(mainWindow, 'deploy', 'END', undefined, { envURL })
}
