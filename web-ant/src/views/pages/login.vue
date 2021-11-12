<template>
  <div class="login">
    <div class="login_box">
      <h1>登录</h1>
      <el-form
        ref="LoginFormRef"
        :model="LoginForm"
        :rules="LoginRules"
        status-icon
        show-message
      >
        <el-form-item prop="username">
          <el-input
            placeholder="请输入用户名"
            v-model="LoginForm.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            type="password"
            v-model="LoginForm.password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loading"
            type="primary"
            class="login_button"
            @click="onLogin"
            >立即登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { ref, reactive, unref } from "vue";
import { ElMessage } from "element-plus";
import { login } from "../../lib/api/account";
import router from "../../router";
import cookies from "../../utils/cookies";
export default {
  setup() {
    const LoginForm = ref({
      username: "",
      password: "",
    });

    const LoginRules = reactive({
      username: [
        {
          required: true,
          trigger: "blur",
          validator: async (rule, value, callback) => {
            if (!value) {
              callback(new Error("请输入用户名"));
            }
            callback();
          },
        },
      ],
      password: [
        {
          required: true,
          trigger: "blur",
          validator: (rule, value, callback) => {
            if (!value) {
              callback(new Error("请输入密码"));
            }
            callback();
          },
        },
      ],
    });
    const LoginFormRef = ref();
    const loading = ref(false);

    const onLogin = () => {
      LoginFormRef.value.validate((valid) => {
        if (valid) {
          const form = unref(LoginFormRef);
          if (!form) {
            return;
          }
          login(LoginForm.value).then((result) => {
            loading.value = false;
            if (result.code === 0) {
              const expires = parseInt(result.data.expires_in) / 60 / 60 / 24;
              cookies.setCookies(
                "access_token",
                result.data.access_token,
                expires
              );
              ElMessage.success("登录成功");
              router.push({ path: "/home" });
            } else {
              ElMessage.error(result.msg);
            }
          });
        }
      });
    };

    return {
      onLogin,
      loading,
      LoginForm,
      LoginRules,
      LoginFormRef,
    };
  },
};
</script>

<style>
.login {
  background: #f3f5f7;
  background-image: url(../assets/image/peanut-pc-bg.png);
  background-repeat: no-repeat;
  background-position: center center;
  margin: 0 auto;
  padding: 0;
  color: #3c434a;
  font-size: 13px;
  line-height: 1.4;
  height: 100vh;
  width: 100vw;
}

.login_box {
  width: 320px;
  padding: 8% 0 0;
  margin: auto;
  right: calc(50% - 475px);
  padding: 20px 0 0 0;
  transform: translate(0%, -50%);
  top: 50%;
  position: fixed;
}

.login_box h1 {
  text-align: center;
  margin-bottom: 30px;
}

.login_box .login_button {
  width: 100%;
  margin: 20px 0;
}
</style>