import axios from 'axios'

export default function Main(): Promise<string> {
  return axios
    .get(
      `https://api.github.com/repos/napse-invest/napse-developer-toolkit/releases/latest`
    )
    .then((response) => {
      return response.data.tag_name
    })
    .catch((error) => {
      throw error
    })
}
