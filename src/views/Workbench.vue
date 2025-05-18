<script setup lang="ts">
import { ref } from 'vue'
import { useConnectionStore } from '../stores/connection'

const connectionStore = useConnectionStore()
const currentConnection = connectionStore.currentConnection

// 命令输入
const commandInput = ref('')

// 命令历史
const commandHistory = ref<{command: string, result: string, timestamp: number}[]>([])

// 执行命令
const executeCommand = () => {
  if (!commandInput.value.trim()) return
  
  // 这里将来会实现实际的命令执行逻辑
  // 目前只是模拟添加到历史记录
  commandHistory.value.unshift({
    command: commandInput.value,
    result: '(功能开发中) 命令已接收: ' + commandInput.value,
    timestamp: Date.now()
  })
  
  // 清空输入
  commandInput.value = ''
}

// 清空历史
const clearHistory = () => {
  commandHistory.value = []
}

// 格式化时间
const formatTime = (timestamp: number) => {
  return new Date(timestamp).toLocaleTimeString()
}
</script>

<template>
  <div class="workbench-container">
    <div class="workbench-header">
      <h1>Redis 命令工作台</h1>
    </div>
    
    <div v-if="!currentConnection" class="no-connection">
      <el-empty description="请先连接到Redis服务器">
        <el-button type="primary" @click="$router.push('/connections')">前往连接</el-button>
      </el-empty>
    </div>
    
    <div v-else class="workbench-content">
      <div class="connection-info">
        <el-alert
          title="当前连接"
          type="success"
          :closable="false"
        >
          <template #default>
            <div class="connection-details">
              <span><strong>{{ currentConnection.name }}</strong></span>
              <span>{{ currentConnection.host }}:{{ currentConnection.port }}</span>
              <span v-if="currentConnection.db !== undefined">DB: {{ currentConnection.db }}</span>
            </div>
          </template>
        </el-alert>
      </div>
      
      <div class="command-input-area">
        <el-input
          v-model="commandInput"
          type="text"
          placeholder="输入Redis命令，例如: GET key"
          :rows="3"
          @keyup.enter="executeCommand"
        >
          <template #append>
            <el-button type="primary" @click="executeCommand">执行</el-button>
          </template>
        </el-input>
      </div>
      
      <div class="command-history">
        <div class="history-header">
          <h3>命令历史</h3>
          <el-button 
            type="danger" 
            size="small" 
            @click="clearHistory"
            :disabled="commandHistory.length === 0"
          >
            清空历史
          </el-button>
        </div>
        
        <el-empty v-if="commandHistory.length === 0" description="暂无命令历史" />
        
        <div v-else class="history-list">
          <el-card v-for="(item, index) in commandHistory" :key="index" class="history-item">
            <div class="history-command">
              <div class="command-time">{{ formatTime(item.timestamp) }}</div>
              <div class="command-text">> {{ item.command }}</div>
            </div>
            <div class="history-result">
              <pre>{{ item.result }}</pre>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.workbench-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  color: var(--el-text-color-primary);
}

.workbench-header {
  margin-bottom: 2rem;
}

.workbench-header h1 {
  color: var(--el-color-danger);
  margin: 0;
}

.no-connection {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
}

.workbench-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.connection-info {
  margin-bottom: 1rem;
}

.connection-details {
  display: flex;
  gap: 1rem;
}

.command-input-area {
  margin-bottom: 1.5rem;
}

.command-history {
  background-color: var(--secondary-background);
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid var(--border-color);
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.history-header h3 {
  color: var(--el-color-danger);
  margin: 0;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.history-item {
  border-left: 3px solid var(--el-color-danger);
}

.history-command {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.command-time {
  color: var(--el-text-color-secondary);
  font-size: 0.9rem;
}

.command-text {
  font-family: monospace;
  font-weight: bold;
}

.history-result {
  background-color: rgba(0, 0, 0, 0.2);
  padding: 0.5rem;
  border-radius: 4px;
  font-family: monospace;
  white-space: pre-wrap;
}

.history-result pre {
  margin: 0;
  white-space: pre-wrap;
}
</style>