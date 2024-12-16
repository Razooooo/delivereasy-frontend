<template>
  <div class="login-container">
    <img alt="Vue logo" src="@/assets/logo.png" class="login-logo" />
    <h1>Connexion</h1>

    <form @submit.prevent="login">
      <div class="formGroup">
        <label for="user_login">Login</label>
        <input type="text" id="user_login" v-model="user.login" />
      </div>
      <div class="formGroup">
        <label for="user_password">Password</label>
        <input type="password" id="user_password" v-model="user.password" />
      </div>
      <div class="formGroup">
        <button type="submit" class="button">Connexion</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios, { AxiosError } from 'axios';
import axiosInstance from '@/services/axios';

export default defineComponent({
  name: 'Login',
  data() {
    return {
      user: {
        login: '',
        password: ''
      }
    };
  },
  methods: {
    async login() {
      try {
        const response = await axiosInstance.post('/api/auth/login', {
          login: this.user.login,
          password: this.user.password,
        });

        alert(`Connexion réussie : ${response.data.message}`);

        // Stocker les informations de l'utilisateur dans le stockage local
        localStorage.setItem('user', JSON.stringify({ login: this.user.login, statut: response.data.statut }));

        if (response.data.statut) {
          this.$router.push({ name: 'admin' });
        } else {
          this.$router.push({ name: 'public' });
        }

      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<{ message: string }>;

          if (axiosError.response) {
            alert(`Erreur : ${axiosError.response.data.message}`);
          } else if (axiosError.request) {
            alert('Erreur : Le serveur ne répond pas.');
          } else {
            console.error('Erreur Axios : ', axiosError.message);
            alert('Erreur inconnue lors de la connexion.');
          }
        } else {
          console.error('Erreur : ', error);
          alert('Erreur inconnue lors de la connexion.');
        }
      }
    },
  },
});
</script>

<style scoped>
/* Le style reste inchangé */
.login-container {
  width: 100%;
  max-width: 400px;
  margin: 50px auto;
  padding: 30px;
  background: radial-gradient(circle, rgba(20, 24, 50, 0.9), rgba(10, 15, 30, 0.95));
  box-shadow: 0px 0px 15px rgba(90, 95, 160, 0.7);
  border-radius: 12px;
  text-align: center;
  color: #e0e4ff;
  font-family: 'Roboto', sans-serif;
  position: relative;
}

.login-logo {
  height: 70px;
  margin-bottom: 20px;
  filter: drop-shadow(0px 0px 10px #7df9ff);
}

h1 {
  font-size: 24px;
  color: #72f0ff;
  margin-bottom: 20px;
  font-weight: 600;
  text-shadow: 0px 0px 5px #72f0ff;
}

.formGroup {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  color: #c3c6ff;
}

label {
  text-align: left;
  margin-bottom: 5px;
  font-size: 14px;
  color: #8fa3ff;
  font-weight: 500;
}

input[type="text"],
input[type="password"] {
  padding: 12px;
  font-size: 16px;
  color: #ffffff;
  background-color: #1f2235;
  border: 1px solid #3c4099;
  border-radius: 8px;
  transition: all 0.3s ease;
  box-shadow: inset 0px 0px 5px #3c4099;
}

input[type="text"]:focus,
input[type="password"]:focus {
  border-color: #72f0ff;
  outline: none;
  box-shadow: 0px 0px 8px #72f0ff;
}

.button {
  padding: 12px;
  font-size: 16px;
  color: #fff;
  background: linear-gradient(135deg, #6b6fff, #3c4099);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
  box-shadow: 0px 0px 10px #6b6fff;
}

.button:hover {
  background: linear-gradient(135deg, #72f0ff, #3c4099);
  box-shadow: 0px 0px 15px #72f0ff;
  transform: translateY(-2px);
}

.button:active {
  background: linear-gradient(135deg, #6b6fff, #3c4099);
  transform: translateY(0);
}
</style>
