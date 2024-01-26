import {
  CreateEnvironmentCommand,
  ElasticBeanstalkClient
} from '@aws-sdk/client-elastic-beanstalk'
import {
  EB_BUCKET_NAME,
  getBucketURL,
  getIAMRoleArn,
  getInstanceProfileArn
} from 'main/helpers'

export default async function Main(
  secrets: {
    AWS__API_TOKEN: string
    AWS__API_SECRET: string
    AWS__REGION: string
  },
  mainWindow: Electron.BrowserWindow,
  applicationName: string,
  environmentName: string,
  instanceProfileName: string,
  serviceRoleName: string,
  versionLabel: string
) {
  const client = new ElasticBeanstalkClient({
    region: secrets.AWS__REGION,
    credentials: {
      accessKeyId: secrets.AWS__API_TOKEN,
      secretAccessKey: secrets.AWS__API_SECRET
    }
  })

  const params = {
    ApplicationName: applicationName,
    EnvironmentName: environmentName,
    SolutionStackName: '64bit Amazon Linux 2023 v4.1.2 running Docker',
    OptionSettings: [
      {
        Namespace: 'aws:autoscaling:launchconfiguration',
        OptionName: 'IamInstanceProfile',
        Value: await getInstanceProfileArn(
          secrets,
          mainWindow,
          instanceProfileName
        )
      },
      {
        Namespace: 'aws:autoscaling:launchconfiguration',
        OptionName: 'InstanceType',
        Value: 't2.small'
      },
      {
        Namespace: 'aws:elasticbeanstalk:environment',
        OptionName: 'EnvironmentType',
        Value: 'SingleInstance'
      },
      {
        Namespace: 'aws:ec2:instances',
        OptionName: 'EnableSpot',
        Value: 'true'
      },
      {
        Namespace: 'aws:elasticbeanstalk:environment',
        OptionName: 'ServiceRole',
        Value: await getIAMRoleArn(secrets, mainWindow, serviceRoleName)
      },
      {
        Namespace: 'aws:elasticbeanstalk:cloudwatch:logs',
        OptionName: 'StreamLogs',
        Value: 'true'
      },
      {
        Namespace: 'aws:elasticbeanstalk:cloudwatch:logs',
        OptionName: 'DeleteOnTerminate',
        Value: 'true'
      },
      {
        Namespace: 'aws:elasticbeanstalk:cloudwatch:logs',
        OptionName: 'RetentionInDays',
        Value: '7'
      },
      {
        Namespace: 'aws:elasticbeanstalk:application:environment',
        OptionName: 'DJANGO_SECRET_KEY',
        Value: 'django-secret-key'
      },
      {
        Namespace: 'aws:elasticbeanstalk:application:environment',
        OptionName: 'AWS_ACCESS_KEY_ID',
        Value: secrets.AWS__API_TOKEN
      },
      {
        Namespace: 'aws:elasticbeanstalk:application:environment',
        OptionName: 'AWS_SECRET_ACCESS_KEY',
        Value: secrets.AWS__API_SECRET
      },
      {
        Namespace: 'aws:elasticbeanstalk:application:environment',
        OptionName: 'AWS_S3_BUCKET_URI',
        Value: getBucketURL(EB_BUCKET_NAME, 'litestream')
      }
    ],
    VersionLabel: versionLabel
  }

  try {
    const data = await client.send(new CreateEnvironmentCommand(params))
    mainWindow.webContents.send('AWSChannel', {
      from: 'createEBEnvironment',
      message: `Environment ${environmentName} created`,
      success: true,
      response: data
    })
  } catch (err) {
    mainWindow.webContents.send('AWSChannel', {
      from: 'createEBEnvironment',
      message: `Environment ${environmentName} failed to create`,
      success: false,
      error: err
    })
  }
}
