<template>
  <div class="nav-container">
    <img alt="Vue logo" src="../assets/logo.png" class="logo">
    <nav>
      <router-link to="/admin/dashboard">Accueil</router-link> |
      <router-link to="public/liste">Livraison</router-link> |
      <router-link to="/">Admin</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'PublicNav'
}
</script>

<style>
.nav-container {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a1f38, #2c3358);
  padding: 15px;
  box-shadow: 0px 0px 20px rgba(100, 120, 255, 0.5); 
  border-radius: 8px;
}

.logo {
  position: absolute;
  right: 30px;
  height: 80px; 
  filter: drop-shadow(0px 0px 10px #7df9ff); 
  
}

nav {
  display: flex;
  gap: 20px;
}

a {
  color: #72f0ff;
  text-decoration: none;
  font-size: 1.1em;
  font-weight: bold;
  position: relative;
  transition: color 0.3s;
}

a::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #72f0ff;
  transform: scaleX(0);
  transition: transform 0.3s;
}

a:hover {
  color: #afffff;
  text-shadow: 0px 0px 6px #72f0ff;
}

a:hover::after {
  transform: scaleX(1);
}
</style>
