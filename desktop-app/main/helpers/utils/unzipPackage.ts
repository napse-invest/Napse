import extract from 'extract-zip'
import path from 'path'

export default async function Main(fileName: string) {
  const homeDir = process.env.HOME || process.env.USERPROFILE
  if (!homeDir) throw new Error('No root path found')
  const destDir = path.join(homeDir, '.napse')

  await extract(path.join(destDir, fileName), {
    dir: path.join(destDir, fileName.replace('.zip', ''))
  })
}
