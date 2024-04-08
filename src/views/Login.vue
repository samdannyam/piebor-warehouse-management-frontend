<template>
  <v-container
    fluid
    class="align-center d-flex justify-center bg-main"
    style="
      height: 100vh;
      overflow: hidden;
      background-size: 200% 200%;
      animation: moveGradient 1s linear infinite;
    "
  >
    <v-row class="d-flex justify-center">
      <v-col cols="12" sm="10" md="6" lg="4" xl="3">
        <v-card class="rounded-xl py-12 px-4 px-md-10 bg-second" elevation="0">
          <v-form @submit.prevent="userLogin">
            <v-card elevation="0" color="transparent">
              <v-card-text class="py-0">
                <v-text-field
                  id="email"
                  v-model="login.email"
                  outlined
                  color="primary"
                  label="И-мэйл"
                  required
                  :rules="emailRules"
                  class="rounded-xl"
                />
                <v-text-field
                  v-model="login.password"
                  outlined
                  color="primary"
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show ? 'text' : 'password'"
                  name="input-10-1"
                  label="Нууц үг"
                  required
                  :rules="passRules"
                  class="rounded-xl"
                  @click:append="show = !show"
                />
                <!-- <div class="d-flex justify-end">
                        <v-btn text small class="mt-n4">Forgot password?</v-btn>
                      </div> -->
              </v-card-text>

              <v-card-actions class="pa-4 pb-0">
                <v-btn
                  type="submit"
                  block
                  color="primary"
                  elevation="0"
                  class="rounded-xl py-6"
                  dark
                >
                  Нэвтрэх
                </v-btn>
              </v-card-actions>
            </v-card>
            <v-snackbar v-model="successLogin" dark>
              Successfully logged in
              <v-icon color="success"> mdi-emoticon-kiss </v-icon>
              <template #action="{ attrs }">
                <v-btn
                  dark
                  icon
                  text
                  v-bind="attrs"
                  @click="successLogin = false"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </template>
            </v-snackbar>
            <v-snackbar v-model="errorLogin" color="error">
              Нууц үг эсвэл и-мейл буруу байна {{ this.status }}
              {{ this.login }}
              <v-icon color="white"> mdi-exclamation </v-icon>
              <template #action="{ attrs }">
                <v-btn
                  dark
                  icon
                  text
                  v-bind="attrs"
                  @click="errorLogin = false"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </template>
            </v-snackbar>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: "login",
  data() {
    return {
      show: false,
      valid: true,
      login: {},
      successSignUp: false,
      successLogin: false,
      errorSignUp: false,
      errorLogin: false,
      passwordMatch: false,
      status: 0,
      emailRules: [
        (v) => !!v || "И-мэйл шаардлагатай",
        (v) => /.+@.+/.test(v) || "И-мэйл биш байна.",
      ],
      passRules: [(v) => !!v || "Шаардлагатай!"],
      telRules: [
        (v) => !!v || "Утасны дугаар шаардлагатай!",
        (v) => /^\d{8}$/.test(v) || "Утасны дугаар биш байна.",
      ],
    };
  },
  methods: {
    async userLogin() {
      try {
        const response = await this.axios.post("/auth/login", this.login);
        this.status = response.status;
        if (response.status === 200) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user_Id", response.data.user_id);
          console.log(localStorage.getItem("user_Id"));
          // const responseInit = await this.axios.post("/auth/init", {
          //   userId: localStorage.getItem("user_Id"),
          // });
          // if (responseInit.status === 200) {
          //   localStorage.setItem("init", JSON.stringify(responseInit.data));
          // }
          this.$router.push("/");
          this.successLogin = true;
        } else {
          this.errorLogin = true;
        }
      } catch (err) {
        console.error("Error during login:", err);
        this.errorLogin = true;
      }
    },
    validate() {
      if (this.$refs.form.validate()) {
        if (this.register.password === this.register.repeatPassword) {
          this.userSignUp();
        } else {
          this.passwordMatch = true;
        }
      } else {
        this.errorSignUp = true;
      }
    },
  },
};
</script>

<style scoped>
@keyframes moveGradient {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 100% 100%;
  }
}
</style>
