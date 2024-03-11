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

function getLastUpdateDateCheck(provider: string): string {
  if (typeof window !== 'undefined') {
    if (!localStorage.updates) {
      localStorage.updates = JSON.stringify({})
    }
    if (!localStorage.updates[provider]) {
      const updates = JSON.parse(localStorage.updates)
      updates[provider] = {}
      localStorage.updates = JSON.stringify(updates)
    }
    const updates = JSON.parse(localStorage.updates)
    if (!updates[provider].lastUpdateDateCheck) {
      updates[provider].lastUpdateDateCheck = new Date(0)
      updates[provider].updateable = false
      localStorage.updates = JSON.stringify(updates)
    }
    return JSON.parse(localStorage.updates)[provider].lastUpdateDateCheck
  }
  return ''
}

function updateLastUpdateDateCheck(
  provider: string,
  updateable: boolean
): void {
  if (typeof window !== 'undefined') {
    if (!localStorage.updates) {
      localStorage.updates = JSON.stringify({})
    }
    if (!localStorage.updates[provider]) {
      const updates = JSON.parse(localStorage.updates)
      updates[provider] = {}
      localStorage.updates = JSON.stringify(updates)
    }
    const updates = JSON.parse(localStorage.updates)

    updates[provider].lastUpdateDateCheck = new Date()
    updates[provider].updateable = updateable
    localStorage.updates = JSON.stringify(updates)
  }
}

export {
  addServer,
  getLastUpdateDateCheck,
  getServer,
  getServers,
  removeServer,
  updateLastUpdateDateCheck,
  updateServer
}
export type { Server }
