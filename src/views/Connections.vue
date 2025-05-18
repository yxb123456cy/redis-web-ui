<script setup lang="ts">
import {ref, onMounted} from 'vue'
import {useConnectionStore, type RedisConnection} from '../stores/connection'
import {Plus} from "@element-plus/icons-vue";
import {ElMessage, ElMessageBox} from "element-plus";

const connectionStore = useConnectionStore()
const connections = connectionStore.connections
const currentConnection = connectionStore.currentConnection


onMounted(() => {
  console.log(currentConnection);
})
// 表单数据
const connectionForm = ref({
  name: '',
  host: 'localhost',
  port: 6379,
  username: '',
  password: '',
  db: 0
})

// 表单验证规则
const rules = {
  name: [{required: true, message: '请输入连接名称', trigger: 'blur'}],
  host: [{required: true, message: '请输入主机地址', trigger: 'blur'}],
  port: [{required: true, message: '请输入端口号', trigger: 'blur'}]
}

// 表单引用
const formRef = ref()

// 对话框可见性
const dialogVisible = ref(false)

//断开Redis连接;

const stopRedisConnect = (connection: RedisConnection) => {
  // 这里将来会实现实际的连接逻辑
  connectionStore.setCurrentConnection('null')
  connectionStore.updateConnectionStatus(connection.id, false)
  ElMessage({
    type: 'success',
    message: `已断开 ${connection.name}的连接`
  })
}
// 添加新连接
const addConnection = async () => {
  if (!formRef.value) return

  await formRef.value.validate((valid: boolean) => {
    if (valid) {
      connectionStore.addConnection(connectionForm.value)
      dialogVisible.value = false
      resetForm()
    }
  })
}

// 重置表单
const resetForm = () => {
  connectionForm.value = {
    name: '',
    host: 'localhost',
    port: 6379,
    username: '',
    password: '',
    db: 0
  }
}

// 删除连接
const removeConnection = (id: string) => {
  ElMessageBox.confirm('确定要删除此连接吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    connectionStore.removeConnection(id)
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
  }).catch(() => {
  })
}

// 连接到Redis
const connectToRedis = (connection: RedisConnection) => {
  // 这里将来会实现实际的连接逻辑
  connectionStore.setCurrentConnection(connection.id)
  connectionStore.updateConnectionStatus(connection.id, true)
  ElMessage({
    type: 'success',
    message: `已连接到 ${connection.name}`
  })
}
</script>

<template>
  <div class="connections-container">
    <div class="connections-header">
      <h1>Redis 连接管理</h1>
      <el-button type="primary" @click="dialogVisible = true">
        <el-icon>
          <Plus/>
        </el-icon>
        添加连接
      </el-button>
    </div>

    <div class="connections-list">
      <el-empty v-if="connections.length === 0" description="暂无连接"/>

      <el-card v-for="conn in connections" :key="conn.id" class="connection-card">
        <div class="connection-header">
          <div class="connection-title">
            <el-tag :type="conn.isConnected ? 'success' : 'info'" size="small">
              {{ conn.isConnected ? '已连接' : '未连接' }}
            </el-tag>
            <h3>{{ conn.name }}</h3>
          </div>
          <div class="connection-actions">
            <el-button
                v-if="!conn.isConnected"
                type="success"
                size="small"
                @click="connectToRedis(conn)"
            >
              <!--         todo     后续需要修改为当前用户一次性只能连接一台Redis实例-->
              连接
            </el-button>
            <el-button
                v-else
                type="warning"
                size="small"
                @click="stopRedisConnect(conn)"
            >
              断开
            </el-button>
            <el-button
                type="danger"
                size="small"
                @click="removeConnection(conn.id)"
                :disabled="conn.isConnected"
            >
              删除
            </el-button>
          </div>
        </div>

        <div class="connection-details">
          <p><strong>主机:</strong> {{ conn.host }}</p>
          <p><strong>端口:</strong> {{ conn.port }}</p>
          <p v-if="conn.db !== undefined"><strong>数据库:</strong> {{ conn.db }}</p>
        </div>
      </el-card>
    </div>


    <!-- 添加连接对话框 -->
    <el-dialog
        style="padding: 15px"
        v-model="dialogVisible"
        title="添加Redis连接"
        width="500px"
    >
      <el-form
          ref="formRef"
          :model="connectionForm"
          :rules="rules"
          label-width="100px"
      >
        <el-form-item label="连接名称" prop="name">
          <el-input v-model="connectionForm.name" placeholder="例如: 本地Redis"/>
        </el-form-item>

        <el-form-item label="主机" prop="host">
          <el-input v-model="connectionForm.host" placeholder="例如: localhost 或 192.168.1.100"/>
        </el-form-item>

        <el-form-item label="端口" prop="port">
          <el-input-number v-model="connectionForm.port" :min="1" :max="65535"/>
        </el-form-item>

        <el-form-item label="用户名" prop="username">
          <el-input v-model="connectionForm.username" placeholder="可选"/>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="connectionForm.password" type="password" placeholder="可选" show-password/>
        </el-form-item>

        <el-form-item label="数据库" prop="db">
          <el-input-number v-model="connectionForm.db" :min="0" :max="15"/>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="dialogVisible = false" style="width: 100px">取消</el-button>
        <el-button type="warning">test Connection(测试连接)</el-button>
        <el-button type="primary" @click="addConnection" style="width: 100px">添加</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.connections-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: var(--el-text-color-primary);
}

.connections-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.connections-header h1 {
  color: var(--el-color-danger);
  margin: 0;
}

.connections-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.connection-card {
  border-radius: 8px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.connection-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.connection-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.connection-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary-color);
}

.connection-title h3 {
  margin: 0;
}

.connection-actions {
  display: flex;
  gap: 0.5rem;
}

.connection-details {
  font-weight: bolder;
  font-size: larger;
  color: var(--el-text-color-secondary);
}

.connection-details p {
  margin: 0.5rem 0;
}
</style>