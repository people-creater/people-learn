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
          <el-form-item label="用户名" prop="username">
            <el-input v-model="registerForm.username" placeholder="请输入用户名" clearable></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="registerForm.password" placeholder="请输入密码" show-password clearable></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="rePassword">
            <el-input v-model="registerForm.rePassword" placeholder="请再次输入密码" show-password clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleRegister">注册</el-button>
            <el-button @click="isRegister = false">返回登录</el-button>
          </el-form-item>
        </el-form>

        <!-- 登录表单 -->
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" v-else>
          <el-form-item>
            <h1>登录</h1>
          </el-form-item>
          <el-form-item label="用户名" prop="username">
            <el-input v-model="loginForm.username" placeholder="请输入用户名" clearable></el-input>
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

<script>
export default {
  data() {
    // 确认密码验证规则
    const checkRePassword = (_rule, value, callback) => {
      if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }

    return {
      isRegister: false, // false为登录状态，true为注册状态
      loginForm: {
        username: '',
        password: ''
      },
      registerForm: {
        username: '',
        password: '',
        rePassword: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      registerRules: {
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
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          // 处理登录逻辑
          console.log('登录:', this.loginForm)
          // 这里可以调用登录API
        }
      })
    },
    handleRegister() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          // 处理注册逻辑
          console.log('注册:', this.registerForm)
          // 这里可以调用注册API
        }
      })
    }
  }
}
</script>


<style scoped>
.login-page {
  margin-top: 0;
  margin-left: 0;
  width:100vw;
  height: 100vh;
  background-color: #fff;
}

.bg {
  background: linear-gradient(to right, blue, #b75ff3);
  height: 100%;
  border-radius: 0 20px 20px 0;
}

.form {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

el-card {
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #409EFF;
}

el-form-item {
  margin-bottom: 20px;
}
</style>
