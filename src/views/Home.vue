<script setup lang="ts">
import {ref} from 'vue'
import {Connection, Edit} from "@element-plus/icons-vue";


// data

const title = ref<string>("一个现代化的Redis数据库管理工具")
</script>

<template>
  <div class="home-container">
    <div class="welcome-section">
      <h1>欢迎使用 Redis Web UI</h1>
      <p>{{ title }}</p>
      <div class="action-buttons">
        <el-button type="primary" size="large" @click="$router.push('/connections')">连接到Redis</el-button>
        <el-button size="large" @click="$router.push('/settings')">设置</el-button>
      </div>
    </div>

    <div class="features-section">
      <h2>主要功能</h2>
      <div class="feature-cards">
        <el-card class="feature-card">
          <template #header>
            <div class="card-header">
              <el-icon>
                <Connection/>
              </el-icon>
              <span>连接管理</span>
            </div>
          </template>
          <div class="card-content">
            管理多个Redis连接，支持密码认证和SSL连接
          </div>
        </el-card>

        <el-card class="feature-card">
          <template #header>
            <div class="card-header">
              <el-icon>
                <Search/>
              </el-icon>
              <span>数据浏览</span>
            </div>
          </template>
          <div class="card-content">
            浏览和搜索Redis数据，支持多种数据类型的可视化
          </div>
        </el-card>

        <el-card class="feature-card">
          <template #header>
            <div class="card-header">
              <el-icon>
                <Edit/>
              </el-icon>
              <span>工作台</span>
            </div>
          </template>
          <div class="card-content">
            执行Redis命令，查看执行历史和结果
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: var(--el-text-color-primary);
}

.welcome-section {
  text-align: center;
  margin-bottom: 4rem;
  padding: 3rem 0;
}

.welcome-section h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--el-color-danger);
}

.welcome-section p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: var(--el-text-color-secondary);
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.features-section {
  margin-bottom: 3rem;
}

.features-section h2 {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.8rem;
  color: var(--el-color-danger);
}

.feature-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature-card {
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.2rem;
  font-weight: bolder;
  color: var(--primary-color-light);
}

.card-content {
  padding: 1rem 0;
  color: var(--primary-color-dark);
}
</style>