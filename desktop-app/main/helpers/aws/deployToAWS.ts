import { BrowserWindow } from 'electron'
import {
  attachIAMPolicy,
  connectRoleToInstanceProfile,
  createBucket,
  createEBApp,
  createEBAppVersion,
  createEBEnvironement,
  createIAMRole,
  downloadAWSDeployPackage,
  getEnvironments,
  getNapseVersion,
  unzipPackage,
  updateEBEnvironment,
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
  const version = await getNapseVersion()
  await downloadAWSDeployPackage(mainWindow, version)
  await createBucket(secrets, mainWindow, EB_BUCKET_NAME)
  await unzipPackage(`deploy-aws-${version}.zip`)
  await uploadFileToBucket(
    secrets,
    mainWindow,
    path.join(`deploy-aws-${version}`, 'config.json'),
    'config.json',
    EB_BUCKET_NAME
  )
  await uploadFileToBucket(
    secrets,
    mainWindow,
    path.join(`deploy-aws-${version}`, `deploy-${version}.zip`),
    `deploy-${version}.zip`,
    EB_BUCKET_NAME
  )

  await createEBApp(secrets, mainWindow, EB_APP_NAME, EB_APP_DESCRIPTION)
  await createEBAppVersion(
    secrets,
    mainWindow,
    EB_APP_NAME,
    EB_BUCKET_NAME,
    version
  )

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
    for (const policyArn of policyArnsServiceRole) {
      await attachIAMPolicy(
        secrets,
        mainWindow,
        policyArn,
        IAM_ROLE_NAME_SERVICE_ROLE
      )
    }
  }

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
    for (const policyArn of policyArnsEC2Role) {
      await attachIAMPolicy(
        secrets,
        mainWindow,
        policyArn,
        IAM_ROLE_NAME_EC2_ROLE
      )
    }
    await connectRoleToInstanceProfile(
      secrets,
      mainWindow,
      IAM_INSTANCE_PROFILE_NAME,
      IAM_ROLE_NAME_EC2_ROLE
    )
  }

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
  while (!allDeployedOrTerminated) {
    const environments = await getEnvironments(
      secrets,
      mainWindow,
      EB_APP_NAME,
      EB_ENV_NAME,
      'waiting for deployment to get envURL'
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
  mainWindow.webContents.send('AWSChannel', {
    from: 'deployToAWS',
    message: `Napse deployed to ${envURL}`,
    success: true,
    response: {
      envURL
    }
  })
}
