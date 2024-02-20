import {
  AuthorizeSecurityGroupIngressCommand,
  DescribeInstancesCommand,
  DescribeSecurityGroupsCommand,
  EC2Client,
  RevokeSecurityGroupIngressCommand
} from '@aws-sdk/client-ec2'
import {
  DescribeEnvironmentsCommand,
  ElasticBeanstalkClient
} from '@aws-sdk/client-elastic-beanstalk'
import { EB_ENV_NAME } from 'main/helpers'

export default async function Main(
  secrets: {
    AWS__API_TOKEN: string
    AWS__API_SECRET: string
    AWS__REGION: string
  },
  mainWindow: Electron.BrowserWindow
) {
  const ebClient = new ElasticBeanstalkClient({
    region: secrets.AWS__REGION,
    credentials: {
      accessKeyId: secrets.AWS__API_TOKEN,
      secretAccessKey: secrets.AWS__API_SECRET
    }
  })
  const describeEnvironmentsResponse = await ebClient.send(
    new DescribeEnvironmentsCommand({
      EnvironmentNames: [EB_ENV_NAME]
    })
  )
  const ec2Client = new EC2Client({
    region: secrets.AWS__REGION,
    credentials: {
      accessKeyId: secrets.AWS__API_TOKEN,
      secretAccessKey: secrets.AWS__API_SECRET
    }
  })
  if (describeEnvironmentsResponse.Environments === undefined) {
    throw new Error('No environments found')
  }
  const environment = describeEnvironmentsResponse.Environments[0]
  const environmentId = environment.EnvironmentId
  if (!environmentId) {
    throw new Error('No environmentId found')
  }

  const describeInstancesResponse = await ec2Client.send(
    new DescribeInstancesCommand({
      Filters: [
        {
          Name: 'tag:elasticbeanstalk:environment-id',
          Values: [environmentId]
        }
      ]
    })
  )
  const instances = []
  for (const reservation of describeInstancesResponse.Reservations || []) {
    for (const instance of reservation.Instances || []) {
      instances.push(instance.InstanceId)
    }
  }
  for (const instanceId of instances) {
    const describeInstnce = await ec2Client.send(
      new DescribeInstancesCommand({
        InstanceIds: [instanceId as string]
      })
    )

    const securityGroups = []
    for (const reservation of describeInstnce.Reservations || []) {
      for (const instance of reservation.Instances || []) {
        for (const sg of instance.SecurityGroups || []) {
          securityGroups.push(sg.GroupId)
        }
      }
    }
    for (const sg of securityGroups) {
      const describeSecurityGroupsResponse = await ec2Client.send(
        new DescribeSecurityGroupsCommand({
          GroupIds: [sg as string]
        })
      )
      if (!describeSecurityGroupsResponse.SecurityGroups) {
        throw new Error('No security groups found')
      }
      const securityGroup = describeSecurityGroupsResponse.SecurityGroups[0]
      const ingressRules = securityGroup.IpPermissions
      if (!ingressRules) {
        throw new Error('No ingress rules found')
      }
      // Revoke each ingress rule
      for (const rule of ingressRules) {
        try {
          const ipRangesRule = {
            FromPort: rule.FromPort,
            IpProtocol: rule.IpProtocol,
            IpRanges: rule.IpRanges,
            ToPort: rule.ToPort
          }

          await ec2Client.send(
            new RevokeSecurityGroupIngressCommand({
              GroupId: sg as string,
              IpPermissions: [ipRangesRule]
            })
          )
        } catch (e) {
          console.log(e)
        }
      }
      try {
        await ec2Client.send(
          new AuthorizeSecurityGroupIngressCommand({
            GroupId: sg as string,
            IpPermissions: [
              {
                FromPort: 443,
                ToPort: 443,
                IpProtocol: 'tcp',
                IpRanges: [
                  {
                    CidrIp: '0.0.0.0/0'
                  }
                ]
              }
            ]
          })
        )
      } catch (e) {
        console.log(e)
      }
    }
  }
}
