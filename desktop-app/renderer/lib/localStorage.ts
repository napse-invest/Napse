interface Server {
  name: string
  url: string
  token: string
}

function addServer(
  name: string,
  url: string,
  token: string
): string | undefined {
  if (typeof window !== 'undefined') {
    if (!localStorage.servers) {
      localStorage.servers = JSON.stringify({})
    }
    const servers = JSON.parse(localStorage.servers)
    if (Object.keys(servers).includes(name)) {
      return
    }
    servers[name] = { name, url, token }
    localStorage.servers = JSON.stringify(servers)
    return name
  }
}

function updateServer(server: Server) {
  if (typeof window !== 'undefined') {
    if (!localStorage.servers) {
      localStorage.servers = JSON.stringify({})
    }
    const servers = JSON.parse(localStorage.servers)
    servers[server.name] = {
      name: server.name,
      url: server.url,
      token: server.token
    }
    localStorage.servers = JSON.stringify(servers)
  }
}

function removeServer(name: string): void {
  if (typeof window !== 'undefined') {
    if (!localStorage.servers) {
      localStorage.servers = JSON.stringify({})
    }
    const servers = JSON.parse(localStorage.servers)
    delete servers[name]
    localStorage.servers = JSON.stringify(servers)
  }
}

function getServer(name: string): Server {
  if (typeof window !== 'undefined') {
    if (!localStorage.servers) {
      localStorage.servers = JSON.stringify({})
    }
    return {
      name: '',
      url: '',
      token: '',
      ...JSON.parse(localStorage.servers)[name]
    }
  }
  return { name: '', url: '', token: '' }
}

function getServers(): Record<string, Server> {
  if (typeof window !== 'undefined') {
    if (!localStorage.servers) {
      localStorage.servers = JSON.stringify({})
    }
    return JSON.parse(localStorage.servers)
  }
  return {}
}

export { addServer, getServer, getServers, removeServer, updateServer }
export type { Server }
