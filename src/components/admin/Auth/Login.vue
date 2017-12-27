<template>
  <v-container class="custom-layout">
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h2>Login</h2>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onLogin">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="email"
                label="Email"
                id="email"
                v-model="login.email"
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="password"
                label="Password"
                id="password"
                v-model="login.password"
                type="password"
                ></v-text-field>
            </v-flex>
          </v-layout>
           <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn class="error" :disabled="!formIsValid" type="submit">Login</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      login: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    formIsValid () {
      return this.login.email !== '' || this.login.password !== ''
    }
  },
  methods: {
    onLogin () {
      const login = {
        ...this.login
      }
      this.$store.dispatch('userLogin', login)
      this.$router.push('/admin')
    }
  }
}
</script>

<style>

</style>
