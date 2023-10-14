interface Server {
  name: string
  url: string
  id: string
  token: string
}

function addServer(
  name: string,
  url: string,
  token: string
): number | undefined {
  if (typeof window !== 'undefined') {
    if (!localStorage.servers) {
      localStorage.servers = JSON.stringify({})
    }
    var id = 0
    const servers = JSON.parse(localStorage.servers)
    while (servers[id]) {
      id++
    }
    servers[id] = { name, url, token }
    localStorage.servers = JSON.stringify(servers)
    return id
  }
}

function removeServer(id: string): void {
  if (typeof window !== 'undefined') {
    if (!localStorage.servers) {
      localStorage.servers = JSON.stringify({})
    }
    const servers = JSON.parse(localStorage.servers)
    delete servers[id]
    localStorage.servers = JSON.stringify(servers)
  }
}

function updateServer(server: Server) {
  if (typeof window !== 'undefined') {
    if (!localStorage.servers) {
      localStorage.servers = JSON.stringify({})
    }
    const servers = JSON.parse(localStorage.servers)
    servers[server.id] = {
      name: server.name,
      url: server.url,
      token: server.token
    }
    localStorage.servers = JSON.stringify(servers)
  }
}

function getServer(id: string): Server {
  if (typeof window !== 'undefined') {
    if (!localStorage.servers) {
      localStorage.servers = JSON.stringify({})
    }
    return {
      id: id.toString() || '',
      name: '',
      url: '',
      token: '',
      ...JSON.parse(localStorage.servers)[id]
    }
  }
  return { name: '', url: '', id: '', token: '' }
}

function getServers(): Record<string, Server> {
  if (typeof window !== 'undefined') {
    if (!localStorage.servers) {
      localStorage.servers = JSON.stringify({})
    }
    const parsed = JSON.parse(localStorage.servers)
    Object.keys(parsed).map((key) => {
      parsed[key]['id'] = key.toString()
    })
    return parsed
  }
  return {}
}

export { addServer, getServer, getServers, removeServer, updateServer }
export type { Server }
