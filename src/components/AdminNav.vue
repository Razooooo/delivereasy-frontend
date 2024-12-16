<template>
    <div>
      <img alt="Vue logo" src="../assets/logo.png" class="admin-logo">
      <ul class="nav-list">
        <!-- Dashboard -->
        <li>
          <router-link to="/admin/dashboard">Dashboard</router-link>
        </li>
  
        <!-- Livreurs -->
        <li>
          <router-link to="/admin/livreur">Livreurs</router-link>
        </li>
  
        <!-- Livraisons -->
        <li>
          <router-link to="/admin/delivery">Colis</router-link>
        </li>
        <li>
          <router-link to="/admin/livraison">Livraison</router-link>
        </li>
      </ul>
    </div>
  </template>
  

<script>
export default {
    name: 'AdminNav',
};
</script>

<style>
.nav-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

li {
    margin: 15px 0;
}

a {
    text-decoration: none;
    color: #72f0ff;
    font-weight: bold;
    font-size: 1.2em;
    position: relative;
    transition: color 0.3s;
}

a::before {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #72f0ff;
    transform: scaleX(0);
    transition: transform 0.3s;
}

.admin-logo {
    position: absolute;
    top: 20px;
    right: 30px;
    height: 80px;
    filter: drop-shadow(0px 0px 10px #7df9ff);
}

a:hover {
    color: #afffff;
}

a:hover::before {
    transform: scaleX(1);
}

a:hover {
    text-shadow: 0px 0px 5px #72f0ff, 0px 0px 10px #72f0ff;
}
</style>
