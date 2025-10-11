<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg" id="bgContainer">
      <!-- 添加可交互的球元素 -->
      <div class="interactive-ball" v-for="ball in balls" :key="ball.id"
           :style="{
             left: ball.x + 'px',
             top: ball.y + 'px',
             width: ball.size + 'px',
             height: ball.size + 'px',
             backgroundColor: ball.color,
             transition: ball.isMoving ? 'all 0.3s ease' : 'all 0.5s ease'
           }"
           @mouseenter="moveBall(ball)">
      </div>
    </el-col>
    <el-col :span="6" :offset="3" class="form">
      <el-card class="login-card">
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
import { ref, reactive, onMounted } from 'vue'
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

// 球元素数据
const balls = ref([])

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

// 初始化球元素
const initBalls = () => {
  const bgContainer = document.getElementById('bgContainer')
  if (!bgContainer) return

  const ballCount = 36
  const colors = [
    'rgba(255, 255, 255, 0.7)',
    'rgba(102, 126, 234, 0.7)',
    'rgba(118, 75, 162, 0.7)',
    'rgba(78, 205, 196, 0.7)'
  ]

  balls.value = []

  // 计算中心点位置
  const centerX = bgContainer.clientWidth / 2
  const centerY = bgContainer.clientHeight / 2
  const radius = 25 // 半径20px

  for (let i = 0; i < ballCount; i++) {
    const size = Math.random() * 10 + 20

    // 在中心点半径20px的圆圈边缘上随机分布
    const angle = Math.random() * Math.PI * 2
    const x = centerX + Math.cos(angle) * radius - size / 2
    const y = centerY + Math.sin(angle) * radius - size / 2

    balls.value.push({
      id: i,
      x: x,
      y: y,
      size: size,
      color: colors[Math.floor(Math.random() * colors.length)],
      originalX: x,
      originalY: y,
      isMoving: false
    })
  }
}

// 移动球元素
const moveBall = (ball) => {
  const bgContainer = document.getElementById('bgContainer')
  if (!bgContainer) return

  // 标记球正在移动
  ball.isMoving = true

  // 计算移动方向（远离鼠标）
  const centerX = bgContainer.clientWidth / 2
  const centerY = bgContainer.clientHeight / 2

  // 确定移动方向（向远离中心的方向移动）
  const moveDistance = Math.random() * (500 - 50) + 50
  let newX = ball.originalX
  let newY = ball.originalY

  // 根据球的位置决定移动方向
  if (ball.originalX < centerX) {
    newX = Math.max(0, ball.originalX - moveDistance)
  } else {
    newX = Math.min(bgContainer.clientWidth - ball.size, ball.originalX + moveDistance)
  }

  if (ball.originalY < centerY) {
    newY = Math.max(0, ball.originalY - moveDistance)
  } else {
    newY = Math.min(bgContainer.clientHeight - ball.size, ball.originalY + moveDistance)
  }

  // 更新球的位置
  ball.x = newX
  ball.y = newY

  // 一段时间后回到原位
  setTimeout(() => {
    ball.x = ball.originalX
    ball.y = ball.originalY
    ball.isMoving = false
  }, 200)
}

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

// 组件挂载后初始化球元素
onMounted(() => {
  // 等待DOM渲染完成后再初始化
  setTimeout(() => {
    initBalls()
  }, 100)

  // 窗口大小改变时重新初始化
  window.addEventListener('resize', initBalls)
})
</script>



<style scoped>
.login-page {
  margin-top: 0;
  margin-left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #667eea, #764ba2); /* 柔化渐变 */
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
}

.bg {
  height: 100%;
  border-radius: 0 20px 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

/* 可交互球元素样式 */
.interactive-ball {
  position: absolute;
  border-radius: 50%;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  z-index: 10;
}

.interactive-ball:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.form {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  position: relative;
  z-index: 20; /* 确保表单在最上层 */
}

.login-card {
  width: 100%;
  padding: 40px 30px;
  border-radius: 15px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  border: none;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.8);
  position: relative;
  z-index: 30; /* 确保卡片在最上层 */
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
