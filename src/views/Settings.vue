<script setup lang="ts">
import { ref } from 'vue'
import {ElMessage} from "element-plus";
import {Edit, InfoFilled, Setting} from "@element-plus/icons-vue";

// 主题设置
const themeMode = ref('dark')

// 语言设置
const language = ref('zh-CN')

// 自动保存设置
const autoSaveCommands = ref(true)

// 显示设置
const displaySettings = ref({
  showLineNumbers: true,
  fontSize: 14,
  tabSize: 2
})

// 保存设置
const saveSettings = () => {
  // 这里将来会实现实际的设置保存逻辑
  ElMessage({
    type: 'success',
    message: '设置已保存'
  })
}
</script>

<template>
  <div class="settings-container">
    <div class="settings-header">
      <h1>应用设置</h1>
    </div>
    
    <div class="settings-content">
      <el-card class="settings-card">
        <template #header>
          <div class="card-header">
            <el-icon><Setting /></el-icon>
            <span>基本设置</span>
          </div>
        </template>
        
        <el-form label-position="top">
          <el-form-item label="主题模式">
            <el-radio-group v-model="themeMode">
              <el-radio-button label="dark">深色模式</el-radio-button>
              <el-radio-button label="light">浅色模式</el-radio-button>
            </el-radio-group>
          </el-form-item>
          
          <el-form-item label="语言">
            <el-select v-model="language">
              <el-option label="简体中文" value="zh-CN" />
              <el-option label="English" value="en-US" />
            </el-select>
          </el-form-item>
        </el-form>
      </el-card>
      
      <el-card class="settings-card">
        <template #header>
          <div class="card-header">
            <el-icon><Edit /></el-icon>
            <span>工作台设置</span>
          </div>
        </template>
        
        <el-form label-position="top">
          <el-form-item label="自动保存命令历史">
            <el-switch v-model="autoSaveCommands" />
          </el-form-item>
          
          <el-form-item label="字体大小">
            <el-slider v-model="displaySettings.fontSize" :min="10" :max="20" :step="1" show-stops />
          </el-form-item>
          
          <el-form-item label="显示行号">
            <el-switch v-model="displaySettings.showLineNumbers" />
          </el-form-item>
          
          <el-form-item label="Tab 大小">
            <el-input-number v-model="displaySettings.tabSize" :min="2" :max="8" :step="2" />
          </el-form-item>
        </el-form>
      </el-card>
      
      <el-card class="settings-card">
        <template #header>
          <div class="card-header">
            <el-icon><InfoFilled /></el-icon>
            <span>关于</span>
          </div>
        </template>
        
        <div class="about-content">
          <h3>Redis Web UI</h3>
          <p>版本: 0.1.0</p>
          <p>一个现代化的Redis数据库管理工具</p>
        </div>
      </el-card>
      
      <div class="settings-actions">
        <el-button type="primary" @click="saveSettings">保存设置</el-button>
        <el-button>重置</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.settings-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  color: var(--el-text-color-primary);
}

.settings-header {
  margin-bottom: 2rem;
}

.settings-header h1 {
  color: var(--el-color-danger);
  margin: 0;
}

.settings-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.settings-card {
  border-radius: 8px;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.2rem;
  font-weight: bold;
}

.about-content {
  padding: 1rem 0;
}

.about-content h3 {
  margin-top: 0;
  color: var(--el-color-danger);
}

.settings-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
}
</style>