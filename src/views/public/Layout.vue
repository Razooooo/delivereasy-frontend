<template>
    <div class="public">
      <PublicNav />
      <div class="content">
        <RouterView />
      </div>
    </div>
  </template>
  
  <script>
  import PublicNav from '@/components/PublicNav.vue'
  export default {
    name: 'PublicLayout',
    components: {
      PublicNav
    }
  }
  </script>
  
  <style>
  .public {
    background: radial-gradient(circle, #1a1f38, #0d1126);
    color: #e0e4ff; 
    min-height: 100vh;
    font-family: 'Roboto', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }
  
  .content {
    width: 80%;
    background: rgba(25, 30, 50, 0.9);
    padding: 30px;
    border-radius: 12px;
    margin-top: 20px;
    box-shadow: 0px 0px 15px 3px rgba(100, 120, 255, 0.4); 
    transition: all 0.3s ease;
  }
  
  .content:hover {
    box-shadow: 0px 0px 25px 6px rgba(100, 120, 255, 0.7); 
  }
  </style>
  