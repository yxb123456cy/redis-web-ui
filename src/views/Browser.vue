<template>
  <div class="browser-container">
    <div class="browser-header">
      <h1>Redis 数据浏览器</h1>
    </div>

    <div v-if="!currentConnection" class="no-connection">
      <el-empty description="请先连接到Redis服务器">
        <el-button type="primary" @click="$router.push('/connections')">前往连接</el-button>
      </el-empty>
    </div>

    <div v-else class="browser-content">
      <div class="browser-sidebar">
        <div class="connection-info">
          <h3>当前连接</h3>
          <p>{{ currentConnection.name }}</p>
          <el-tag size="small" type="success">已连接</el-tag>
        </div>

        <div class="database-selector">
          <h3>数据库</h3>
          <el-select v-model="currentDb" placeholder="选择数据库">
            <el-option v-for="i in 16" :key="i-1" :label="`DB${i-1}`" :value="i-1"/>
          </el-select>
        </div>

        <div class="key-filter">
          <h3>键过滤器</h3>
          <el-input placeholder="输入模式匹配键名" v-model="keyPattern">
            <template #append>
              <el-button :icon="Search"/>
            </template>
          </el-input>
        </div>
      </div>

      <div class="browser-main">
        <el-empty description="此功能正在开发中"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {useConnectionStore} from "../stores/connection.ts";
import {Search} from "@element-plus/icons-vue";
// 当前选中的数据库
const currentDb = ref(0)

// 键名过滤模式
const keyPattern = ref('*')
const connectionStore = useConnectionStore()
const currentConnection = connectionStore.currentConnection
</script>

<style scoped>
.browser-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  color: var(--el-text-color-primary);
}

.browser-header {
  margin-bottom: 2rem;
}

.browser-header h1 {
  color: var(--el-color-danger);
  margin: 0;
}

.no-connection {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
}

.browser-content {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;
  min-height: 600px;
}

.browser-sidebar {
  background-color: var(--secondary-background);
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid var(--border-color);
}

.connection-info,
.database-selector,
.key-filter {
  margin-bottom: 2rem;
}

.connection-info h3,
.database-selector h3,
.key-filter h3 {
  font-size: 1rem;
  margin-top: 0;
  margin-bottom: 0.5rem;
  color: var(--el-color-danger);
}

.connection-info p {
  margin: 0.5rem 0;
}

.browser-main {
  background-color: var(--secondary-background);
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid var(--border-color);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>