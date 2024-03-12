export default function Main(bucketName: string, key: string) {
  return `s3://${bucketName}/${key}`
}
