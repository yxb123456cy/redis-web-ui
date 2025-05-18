<script setup lang="ts">
import {ref} from 'vue'
import {Edit, Lock, Upload} from '@element-plus/icons-vue'
import {ElMessage} from 'element-plus'

// 用户信息
const userInfo = ref({
  username: 'admin',
  email: 'admin@example.com',
  avatar: 'https://qy-red-book.oss-cn-guangzhou.aliyuncs.com/i/2025/05/17/1.png',
  createdAt: '2024-01-01'
})

// 修改密码表单
const passwordForm = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// 修改密码对话框可见性
const passwordDialogVisible = ref(false)

// 修改密码
const handleChangePassword = () => {
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    ElMessage.error('两次输入的新密码不一致')
    return
  }
  // TODO: 实现密码修改逻辑
  ElMessage.success('密码修改成功')
  passwordDialogVisible.value = false
  passwordForm.value = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  }
}

// 头像上传
const handleAvatarSuccess = (response: any) => {
  userInfo.value.avatar = response.url
  ElMessage.success('头像上传成功')
}

const beforeAvatarUpload = (file: File) => {
  const isJPG = file.type === 'image/jpeg'
  const isPNG = file.type === 'image/png'
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isJPG && !isPNG) {
    ElMessage.error('头像只能是 JPG 或 PNG 格式!')
    return false
  }
  if (!isLt2M) {
    ElMessage.error('头像大小不能超过 2MB!')
    return false
  }
  return true
}
</script>

<template>
  <div class="profile-container">
    <div class="profile-header">
      <h1>个人中心</h1>
    </div>

    <div class="profile-content">
      <!-- 基本信息卡片 -->
      <el-card class="profile-card">
        <template #header>
          <div class="card-header">
            <el-icon>
              <Edit/>
            </el-icon>
            <span>基本信息</span>
          </div>
        </template>

        <div class="user-info">
          <div class="avatar-container">
            <el-upload
                class="avatar-uploader"
                action="/api/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
            >
              <img v-if="userInfo.avatar" :src="userInfo.avatar" class="avatar"/>
              <el-icon v-else class="avatar-uploader-icon">
                <Upload/>
              </el-icon>
            </el-upload>
          </div>

          <el-descriptions :column="1" border>
            <el-descriptions-item label="用户名">
              <span style="color: var(--primary-color-dark)">{{ userInfo.username }}</span>
            </el-descriptions-item>
            <el-descriptions-item label="邮箱">
              <span style="color: var(--primary-color-dark)">{{ userInfo.email }}</span></el-descriptions-item>
            <el-descriptions-item label="注册时间">
              <span style="color: var(--primary-color-dark)">{{ userInfo.createdAt }}</span></el-descriptions-item>
          </el-descriptions>
        </div>
      </el-card>

      <!-- 安全设置卡片 -->
      <el-card class="profile-card">
        <template #header>
          <div class="card-header">
            <el-icon>
              <Lock/>
            </el-icon>
            <span>安全设置</span>
          </div>
        </template>

        <el-button type="primary" @click="passwordDialogVisible = true">修改密码</el-button>
      </el-card>
    </div>

    <!-- 修改密码对话框 -->
    <el-dialog
        v-model="passwordDialogVisible"
        title="修改密码"
        width="400px"
    >
      <el-form :model="passwordForm" label-width="100px">
        <el-form-item label="当前密码">
          <el-input v-model="passwordForm.oldPassword" type="password" show-password/>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="passwordForm.newPassword" type="password" show-password/>
        </el-form-item>
        <el-form-item label="确认新密码">
          <el-input v-model="passwordForm.confirmPassword" type="password" show-password/>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="passwordDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleChangePassword">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.profile-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: var(--el-text-color-primary);
}

.profile-header {
  margin-bottom: 2rem;
}

.profile-header h1 {
  color: var(--el-color-danger);
  margin: 0;
}

.profile-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

.profile-card {
  transition: transform 0.3s ease;
}

.profile-card:hover {
  transform: translateY(-5px);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--primary-color-light);
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.avatar-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.avatar-uploader {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader:hover {
  border-color: var(--el-color-primary);
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  text-align: center;
  line-height: 120px;
}

.avatar {
  width: 120px;
  height: 120px;
  display: block;
  object-fit: cover;
}
</style>