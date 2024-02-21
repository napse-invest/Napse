interface StatusStep {
  description: string
  busy: boolean
}

const SATUS = {
  deploy: {
    START: {
      description: 'Starting the deployment process.',
      busy: false
    },
    getNapseVersion: {
      description: 'Getting the latest Napse verision from GitHub.',
      busy: true
    },
    downloadAWSDeployPackage: {
      description: 'Downloading the deploy package from GitHub.',
      busy: true
    },
    createBucket: {
      description:
        'Creating the bucket for the Elastic Beanstalk. This is where all the files will be stored.',
      busy: true
    },
    unzipPackage: {
      description: 'Unzipping the deploy package.',
      busy: true
    },
    uploadFileToBucket1: {
      description:
        'Uploading the config file to the bucket. This file contains the configuration for the Elastic Beanstalk.',
      busy: true
    },
    uploadFileToBucket2: {
      description:
        'Uploading the deploy package to the bucket. This is the actual application that will be deployed.',
      busy: true
    },
    createEBApp: {
      description: 'Creating the Elastic Beanstalk application.',
      busy: true
    },
    createEBAppVersion: {
      description: 'Creating the Elastic Beanstalk application version.',
      busy: true
    },
    createIAMRole1: {
      description:
        'Creating the IAM role for the Elastic Beanstalk. This role will be used to manage the EC2 instances.',
      busy: true
    },
    attachIAMPolicy1: {
      description:
        'Attaching the IAM policy to the IAM role. This policy will allow the EC2 instances to access the S3 bucket.',
      busy: true
    },
    createIAMRole2: {
      description:
        'Creating the IAM role for the Elastic Beanstalk. This role will be used to manage the EC2 instances.',
      busy: true
    },
    attachIAMPolicy2: {
      description:
        'Attaching the IAM policy to the IAM role. This policy will allow the EC2 instances to access the S3 bucket.',
      busy: true
    },
    connectRoleToInstanceProfile: {
      description:
        'Connecting the IAM role to the instance profile. This profile will be used to launch the EC2 instances.',
      busy: true
    },
    createEBEnvironement: {
      description: 'Creating the Elastic Beanstalk environment.',
      busy: true
    },
    waitForEbEnvToBeReady: {
      description:
        'Waiting for the Elastic Beanstalk environment to be ready. This may take a few minutes. Please do not close the application.',
      busy: true
    },
    updateEBEnvironment: {
      description: 'Updating the Elastic Beanstalk environment.',
      busy: true
    },
    downloadBucket: {
      description:
        'Downloading the bucket from S3. This will be used to sync the local files with the bucket. This may take a few minutes. Please do not close the application.',
      busy: true
    },
    syncBucket: {
      description: 'Syncing the bucket with the local files.',
      busy: true
    },
    END: {
      description: 'Deployment complete, happy trading!',
      busy: false
    }
  },
  update: {
    START: {
      description: 'Starting the update process.',
      busy: false
    },
    waitForEbEnvToBeReady: {
      description:
        'Waiting for the Elastic Beanstalk environment to be ready. This may take a few minutes. Please do not close the application.',
      busy: true
    },
    getNapseVersion: {
      description: 'Getting the latest Napse verision from GitHub.',
      busy: true
    },
    downloadAWSDeployPackage: {
      description: 'Downloading the deploy package from GitHub.',
      busy: true
    },
    unzipPackage: {
      description: 'Unzipping the deploy package.',
      busy: true
    },
    uploadFileToBucket1: {
      description:
        'Uploading the config file to the bucket. This file contains the configuration for the Elastic Beanstalk.',
      busy: true
    },
    uploadFileToBucket2: {
      description:
        'Uploading the deploy package to the bucket. This is the actual application that will be deployed.',
      busy: true
    },
    createEBAppVersion: {
      description: 'Creating the Elastic Beanstalk application version.',
      busy: true
    },
    updateEBEnvironment: {
      description: 'Updating the Elastic Beanstalk environment.',
      busy: true
    },
    waitForEbEnvToBeReady2: {
      description:
        'Waiting for the Elastic Beanstalk environment to be ready. This may take a few minutes.',
      busy: true
    },
    END: {
      description: 'Update complete, happy trading!',
      busy: false
    }
  },
  fullReset: {
    START: {
      description: 'Starting the full reset process.',
      busy: false
    },
    deleteFilesAndDirectories1: {
      description: 'Deleting files and directories.',
      busy: true
    },
    deleteFilesAndDirectories2: {
      description: 'Deleting files and directories.',
      busy: true
    },
    waitForEnvironmentsToTerminateOrDeploy: {
      description:
        'Waiting for environments to terminate / deploy before cleaning up',
      busy: true
    },
    deleteEBEnvironment: {
      description: 'Deleting the Elastic Beanstalk environment.',
      busy: true
    },
    waitForEnvironmentsToTerminate: {
      description: 'Waiting for environments to terminate.',
      busy: true
    },
    deleteAllSecrets: {
      description: 'Deleting all secrets.',
      busy: true
    },
    deleteInstanceProfile: {
      description: 'Deleting the instance profile.',
      busy: true
    },
    deleteIAMRole1: {
      description: 'Deleting the IAM role.',
      busy: true
    },
    deleteIAMRole2: {
      description: 'Deleting the IAM role.',
      busy: true
    },
    deleteEBApp: {
      description: 'Deleting the Elastic Beanstalk application.',
      busy: true
    },
    deleteBucket: {
      description: 'Deleting the bucket.',
      busy: true
    },
    END: {
      description: 'Full reset complete, see you soon!',
      busy: false
    }
  }
}

export default async function Main<T extends keyof typeof SATUS>(
  mainWindow: Electron.BrowserWindow,
  stage: T,
  step: keyof (typeof SATUS)[T],
  errorMessage?: string,
  extraData?: { [key: string]: string }
) {
  const index = Object.keys(SATUS[stage]).indexOf(step as string)
  mainWindow.webContents.send('AWSChannel', {
    from: stage,
    message:
      `${index}/${Object.keys(SATUS[stage]).length - 1} ` +
      (SATUS[stage][step] as StatusStep).description,
    busy: errorMessage ? false : (SATUS[stage][step] as StatusStep).busy,
    progress: (index / (Object.keys(SATUS[stage]).length - 1)) * 100,
    errorMessage: errorMessage,
    extraData: extraData
  })
}
