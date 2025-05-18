<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Connection, UserFilled } from "@element-plus/icons-vue";

const route = useRoute();
const router = useRouter()

const handleSelect = (key: string) => {
  router.push(key)
}
</script>

<template>
  <div class="app-container">
    <!--    头部-->
    <header class="app-header">
      <div class="header-content">
        <div class="logo-container">
          <el-icon class="logo-icon">
            <Connection />
          </el-icon>
          <h1 class="logo-text" @click="router.push('/')">Redis Web UI</h1>
        </div>
        <el-menu :default-active="route.path" class="app-menu" mode="horizontal" @select="handleSelect"
          background-color="transparent" text-color="#f5f5f5" active-text-color="#e31c3d">
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="/connections">连接</el-menu-item>
          <el-menu-item index="/browser">浏览器</el-menu-item>
          <el-menu-item index="/workbench">工作台</el-menu-item>
          <el-menu-item index="/settings">设置</el-menu-item>
        </el-menu>
        <div class="user-avatar" @click="router.push('/profile')">

            <el-avatar src="https://qy-red-book.oss-cn-guangzhou.aliyuncs.com/i/2025/05/17/1.png"/>

        </div>
      </div>
    </header>

    <!--    main 内容区-->
    <main class="app-main">
      <router-view />
    </main>

    <!--    footer-->
    <footer class="app-footer">
      <p>Redis Web UI &copy; {{ new Date().getFullYear() }}</p>
    </footer>
  </div>
</template>

<style>
/* 全局样式 */
html,
body {
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
  width: 100%;
  background-color: var(--secondary-background);
  border-bottom: 1px solid var(--border-color);
  height: var(--header-height);
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
}

.header-content {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 2rem;
  box-sizing: border-box;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: fit-content;
}

.app-menu {
  border-bottom: none;
  flex: 1;
  margin: 0 2rem;
  overflow-x: auto;
  display: flex;
  justify-content: center;
  white-space: nowrap;
}

.app-menu::-webkit-scrollbar {
  display: none;
}

.app-menu {
  -ms-overflow-style: none;
  scrollbar-width: none;
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
  transition: all 0.1s;
}

.logo-text:hover {
  cursor: pointer;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--el-color-primary-light-3);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
}

.user-avatar:hover {
  background-color: var(--el-color-primary);
}

.avatar-icon {
  font-size: 20px;
  color: #fff;
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
