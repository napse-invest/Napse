import { useSearchParams } from 'next/navigation'

type QueryParams = Record<
  'server' | 'exchangeAccount' | 'space' | 'fleet' | 'bot',
  string
>
type OptionalQueryParams = Partial<QueryParams>

export function buildURLQuery(baseUrl: string, params: Record<string, string>) {
  baseUrl = baseUrl.split('?')[0]
  if (!baseUrl.endsWith('/')) {
    baseUrl = baseUrl + '/'
  }
  baseUrl = baseUrl + '?'
  const existingParams = baseUrl.split('?')[1]
  if (existingParams) {
    params = {
      ...existingParams
        .split('&')
        .map((p) => p.split('='))
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}),
      ...params
    }
  }

  return (
    baseUrl.split('?')[0] +
    '?' +
    Object.keys(params)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
      )
      .join('&')
  )
}

export function standardUrl(
  baseUrl: string,
  id: string | null,
  params: QueryParams
) {
  const url = baseUrl + (id ? id + '/' : '')
  return buildURLQuery(url, params)
}

export function standardUrlPartial(
  baseUrl: string,
  id: string | null,
  params: OptionalQueryParams,
  searchParams: ReturnType<typeof useSearchParams>
) {
  var server = searchParams.get('server') || ''
  if (params.server || params.server === '') {
    server = params.server
  }
  var exchangeAccount = searchParams.get('exchangeAccount') || ''
  if (params.exchangeAccount || params.exchangeAccount === '') {
    exchangeAccount = params.exchangeAccount
  }
  var space = searchParams.get('space') || ''
  if (params.space || params.space === '') {
    space = params.space
  }
  var fleet = searchParams.get('fleet') || ''
  if (params.fleet || params.fleet === '') {
    fleet = params.fleet
  }
  var bot = searchParams.get('bot') || ''
  if (params.bot || params.bot === '') {
    bot = params.bot
  }

  return standardUrl(baseUrl, id, {
    server,
    exchangeAccount,
    space,
    fleet,
    bot
  })
}
