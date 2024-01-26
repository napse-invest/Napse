import createEBApp from './aws/EB/createEBApp'
import createEBAppVersion from './aws/EB/createEBAppVersion'
import createEBEnvironement from './aws/EB/createEBEnvironement'
import deleteEBApp from './aws/EB/deleteEBApp'
import deleteEBEnvironment from './aws/EB/deleteEBEnvironment'
import getEnvironments from './aws/EB/getEnvironments'
import updateEBEnvironment from './aws/EB/updateEBEnvironment'
import attachIAMPolicy from './aws/IAM/attachIAMPolicy'
import connectRoleToInstanceProfile from './aws/IAM/connectRoleToInstanceProfile'
import createIAMRole from './aws/IAM/createIAMRole'
import deleteIAMRole from './aws/IAM/deleteIAMRole'
import deleteInstanceProfile from './aws/IAM/deleteInstanceProfile'
import detachPoliciesFromRole from './aws/IAM/detachPoliciesFromRole'
import detachRoleFromInstanceProfile from './aws/IAM/detachRolesFromInstanceProfile'
import getIAMRoleArn from './aws/IAM/getIAMRoleArn'
import getIAMUserArn from './aws/IAM/getIAMUserArn'
import getInstanceProfileArn from './aws/IAM/getInstanceProfileArn'
import downloadAWSDeployPackage from './aws/Napse/downloadAWSDeployPackage'
import getNapseVersion from './aws/Napse/getNapseVersion'
import createBucket from './aws/S3/createBucket'
import deleteBucket from './aws/S3/deleteBucket'
import emptyBucket from './aws/S3/emptyBucket'
import getBucketURL from './aws/S3/getBucketURL'
import uploadFileToBucket from './aws/S3/uploadFileToBucket'
import createSecret from './aws/Secrets/createSecret'
import deleteAllSecrets from './aws/Secrets/deleteAllSecrets'
import deleteSecret from './aws/Secrets/deleteSecret'
import deployToAWS, {
  EB_APP_DESCRIPTION,
  EB_APP_NAME,
  EB_BUCKET_NAME,
  EB_ENV_NAME,
  IAM_INSTANCE_PROFILE_NAME,
  IAM_ROLE_NAME_EC2_ROLE,
  IAM_ROLE_NAME_SERVICE_ROLE
} from './aws/deployToAWS'
import fullCleanupAWS from './aws/fullCleanupAWS'
import updateAWSApp from './aws/updateAWSApp'
import createWindow from './create-window'
import deleteFilesAndDirectories from './utils/deleteFilesAndDirectories'
import unzipPackage from './utils/unzipPackage'

export {
  // Constants
  EB_APP_DESCRIPTION,
  EB_APP_NAME,
  EB_BUCKET_NAME,
  EB_ENV_NAME,
  IAM_INSTANCE_PROFILE_NAME,
  IAM_ROLE_NAME_EC2_ROLE,
  IAM_ROLE_NAME_SERVICE_ROLE,
  // Functions
  attachIAMPolicy,
  connectRoleToInstanceProfile,
  createBucket,
  createEBApp,
  createEBAppVersion,
  createEBEnvironement,
  createIAMRole,
  createSecret,
  createWindow,
  deleteAllSecrets,
  deleteBucket,
  deleteEBApp,
  deleteEBEnvironment,
  deleteFilesAndDirectories,
  deleteIAMRole,
  deleteInstanceProfile,
  deleteSecret,
  deployToAWS,
  detachPoliciesFromRole,
  detachRoleFromInstanceProfile,
  downloadAWSDeployPackage,
  emptyBucket,
  fullCleanupAWS,
  getBucketURL,
  getEnvironments,
  getIAMRoleArn,
  getIAMUserArn,
  getInstanceProfileArn,
  getNapseVersion,
  unzipPackage,
  updateAWSApp,
  updateEBEnvironment,
  uploadFileToBucket
}
