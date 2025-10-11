<template>
    <el-row class="login-page">
      <el-col :span="12" class="bg"></el-col>
      <el-col :span="6" :offset="3" class="form">
        <el-card>
          <!-- 注册表单 -->
          <el-form ref="registerForm" :model="registerForm" :rules="registerRules" v-if="isRegister">
            <el-form-item>
              <h1>注册</h1>
            </el-form-item>
            <el-form-item label="账户" prop="username">
              <el-input v-model="registerForm.username" placeholder="请输入账户" clearable></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="registerForm.password" placeholder="请输入密码" show-password clearable></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="rePassword">
              <el-input v-model="registerForm.rePassword" placeholder="请再次输入密码" show-password clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleRegister">注册</el-button>
              <el-button @click="returnToLogin">返回登录</el-button>
            </el-form-item>
          </el-form>

          <!-- 登录表单 -->
          <el-form ref="loginForm" :model="loginForm" :rules="loginRules" v-else>
            <el-form-item>
              <h1>登录</h1>
            </el-form-item>
            <el-form-item label="账户" prop="username">
              <el-input v-model="loginForm.username" placeholder="请输入账户" clearable></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="loginForm.password" placeholder="请输入密码" show-password clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleLogin">登录</el-button>
              <el-button @click="isRegister = true">去注册</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

// 使用路由
const router = useRouter()

// 表单数据
const isRegister = ref(false)

const loginForm = reactive({
  username: '',
  password: ''
})

const registerForm = reactive({
  username: '',
  password: '',
  rePassword: ''
})

// 表单验证规则
const checkRePassword = (_rule, value, callback) => {
  if (value !== registerForm.password) {
    callback(new Error('两次输入密码不一致'))
  } else {
    callback()
  }
}

const loginRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
}

const registerRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ],
  rePassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    { validator: checkRePassword, trigger: 'blur' }
  ]
}

// 表单引用
const loginFormRef = ref(null)
const registerFormRef = ref(null)

// 处理登录
const handleLogin = () => {
  router.push('/')
}

// 处理注册
const handleRegister = () => {
  router.push('/')
}

// 返回登录页面的函数
const returnToLogin = () => {
  isRegister.value = false
  // 重置注册表单
  registerForm.username = ''
  registerForm.password = ''
  registerForm.rePassword = ''
}
</script>

<style scoped>.login-page {
  margin-top: 0;
  margin-left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #f5f7fa;
  display: flex;
  align-items: center;
}

.bg {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  height: 100%;
  border-radius: 0 20px 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.bg::before {
  content: "";
  position: absolute;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%);
  transform: rotate(30deg);
}

.bg::after {
  content: "";
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  top: -100px;
  right: -100px;
}

.form {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.login-card {
  width: 100%;
  padding: 40px 30px;
  border-radius: 15px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  border: none;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.8);
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #409EFF;
  font-size: 28px;
  font-weight: bold;
}

:deep(el-form-item) {
  margin-bottom: 25px;
}

:deep(.el-form-item__label) {
  font-weight: 500;
  color: #333;
}

:deep(.el-input__inner) {
  border-radius: 8px;
  border: 1px solid #dcdfe6;
  padding: 15px;
  transition: all 0.3s;
}

:deep(.el-input__inner:focus) {
  border-color: #409EFF;
  box-shadow: 0 0 0 3px rgba(64, 158, 255, 0.1);
}

.submit-btn {
  width: 100%;
  border-radius: 8px;
  padding: 15px;
  font-size: 16px;
  margin-bottom: 15px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
}

:deep(el-button) {
  transition: all 0.3s ease;
}

:deep(el-button:hover) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}
</style>

<!--<style scoped>-->
<!--.login-page {-->
<!--  margin-top: 0;-->
<!--  margin-left: 0;-->
<!--  width:100vw;-->
<!--  height: 100vh;-->
<!--  background-color: #fff;-->
<!--}-->

<!--.bg {-->
<!--  background: linear-gradient(to right, blue, #b75ff3);-->
<!--  height: 100%;-->
<!--  border-radius: 0 20px 20px 0;-->
<!--}-->

<!--.form {-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  justify-content: center;-->
<!--  height: 100%;-->
<!--}-->

<!--.form :deep(el-card) {-->
<!--  width: 100%;-->
<!--  padding: 20px;-->
<!--  border-radius: 10px;-->
<!--  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);-->
<!--}-->

<!--h1 {-->
<!--  text-align: center;-->
<!--  margin-bottom: 30px;-->
<!--  color: #409EFF;-->
<!--}-->

<!--el-form-item {-->
<!--  margin-bottom: 20px;-->
<!--}-->
<!--</style>-->
