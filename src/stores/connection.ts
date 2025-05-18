import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * Redis实例连接类型接口;
 */
export interface RedisConnection {
  id: string
  name: string
  host: string
  port: number
  username?: string
  password?: string
  db?: number
  isConnected: boolean
}

export const useConnectionStore = defineStore('connection', () => {
  const connections = ref<RedisConnection[]>([])
  const currentConnection = ref<RedisConnection | null>(null)

  function addConnection(connection: Omit<RedisConnection, 'id' | 'isConnected'>) {
    const newConnection = {
      ...connection,
      id: Date.now().toString(),
      isConnected: false
    }
    connections.value.push(newConnection)
    return newConnection
  }

  function removeConnection(id: string) {
    const index = connections.value.findIndex(conn => conn.id === id)
    if (index !== -1) {
      connections.value.splice(index, 1)
      if (currentConnection.value?.id === id) {
        currentConnection.value = null
      }
    }
  }

  function setCurrentConnection(id: string) {
    const connection = connections.value.find(conn => conn.id === id)
    if (connection) {
      currentConnection.value = connection
    }
  }

  function updateConnectionStatus(id: string, isConnected: boolean) {
    const connection = connections.value.find(conn => conn.id === id)
    if (connection) {
      connection.isConnected = isConnected
    }
  }

  return {
    connections,
    currentConnection,
    addConnection,
    removeConnection,
    setCurrentConnection,
    updateConnectionStatus
  }
})