<script setup>
import { User } from "@element-plus/icons-vue";

const handleLogin = () => {
  // 跳转到登录页面
  window.location.href = '/login'
}

</script>

<template>
  <el-affix :offset="0">
    <header class="page-header">
      <div class="header-content">
        <div class="login-section">
          <button class="login-button" @click="handleLogin">
            <el-icon><User /></el-icon>
          </button>
        </div>
      </div>
    </header>
  </el-affix>
</template>

<style scoped>
.page-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 0;
  z-index: 100;
}

.header-content {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100vw;
  padding-right: 2em;
  box-sizing: border-box;
}

.login-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #409eff;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-button:hover {
  background-color: #a45ce3;
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.login-button:active {
  transform: scale(0.95);
}
</style>
