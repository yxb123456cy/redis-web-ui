<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {Connection} from "@element-plus/icons-vue";

const router = useRouter()
const activeIndex = ref('/')

const handleSelect = (key: string) => {
  router.push(key)
}
</script>

<template>
  <div class="app-container">
    <header class="app-header">
      <div class="header-content">
        <div class="logo-container">
          <el-icon class="logo-icon"><Connection /></el-icon>
          <h1 class="logo-text">Redis Web UI</h1>
        </div>
        <el-menu
          :default-active="activeIndex"
          class="app-menu"
          mode="horizontal"
          @select="handleSelect"
          background-color="transparent"
          text-color="#f5f5f5"
          active-text-color="#e31c3d"
        >
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="/connections">连接</el-menu-item>
          <el-menu-item index="/browser">浏览器</el-menu-item>
          <el-menu-item index="/workbench">工作台</el-menu-item>
          <el-menu-item index="/settings">设置</el-menu-item>
        </el-menu>
      </div>
    </header>
    
    <main class="app-main">
      <router-view />
    </main>
    
    <footer class="app-footer">
      <p>Redis Web UI &copy; {{ new Date().getFullYear() }}</p>
    </footer>
  </div>
</template>

<style>
/* 全局样式 */
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}

#app {
  height: 100%;
}
</style>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--background-color);
}

.app-header {
  background-color: var(--secondary-background);
  border-bottom: 1px solid var(--border-color);
  height: var(--header-height);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 1rem;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo-icon {
  font-size: 1.8rem;
  color: var(--primary-color);
}

.logo-text {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--text-color);
  margin: 0;
}

.app-menu {
  border-bottom: none;
}

.app-main {
  flex: 1;
  padding: 1rem 0;
}

.app-footer {
  background-color: var(--secondary-background);
  border-top: 1px solid var(--border-color);
  padding: 1rem 0;
  text-align: center;
  color: var(--text-color-secondary);
}
</style>
