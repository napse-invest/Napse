interface Server {
  name: string
  url: string
  id: string
}

function addServer(name: string, url: string): number | undefined {
  if (typeof window !== 'undefined') {
    if (!localStorage.servers) {
      localStorage.servers = JSON.stringify({})
    }
    var id = 0
    const servers = JSON.parse(localStorage.servers)
    while (servers[id]) {
      id++
    }
    servers[id] = { name, url }
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

function getServer(id: string): Server {
  if (typeof window !== 'undefined') {
    if (!localStorage.servers) {
      localStorage.servers = JSON.stringify({})
    }
    return (
      { ...JSON.parse(localStorage.servers)[id], id: id.toString() } || {
        name: '',
        url: '',
        id: ''
      }
    )
  }
  return { name: '', url: '', id: '' }
}

function getServers(): Record<string, Server> {
  if (typeof window !== 'undefined') {
    if (!localStorage.servers) {
      localStorage.servers = JSON.stringify({})
    }
    const parsed = JSON.parse(localStorage.servers)
    Object.entries(parsed).map(([key, value], index) => {
      parsed[key]['id'] = index.toString()
    })
    return parsed
  }
  return {}
}

export { addServer, getServer, getServers, removeServer }
