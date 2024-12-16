<template>
    <div class="notfound-container">
        <img alt="Vue logo" src="@/assets/logo.png" class="notfound-logo">
        <h1>404</h1>
        <p>Allô Bassem ??</p>
        <router-link to="/" class="home-button">Retour à l'accueil</router-link>
    </div>
</template>

<script>
export default {
    name: 'Notfound'
}
</script>

<style scoped>

.notfound-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: radial-gradient(circle, #1a1f38, #0d1126);
    color: #e0e4ff;
    font-family: 'Roboto', sans-serif;
    text-align: center;
}


.notfound-logo {
    height: 80px;
    margin-bottom: 20px;
    filter: drop-shadow(0px 0px 10px #7df9ff); 
}


h1 {
    font-size: 8em;
    color: #72f0ff;
    text-shadow: 0px 0px 20px #72f0ff, 0px 0px 60px rgba(100, 120, 255, 0.5);
    margin: 0;
    animation: pulse 1.5s infinite;
}


@keyframes pulse {
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
}


p {
    font-size: 1.5em;
    color: #c3c6ff;
    margin: 20px 0;
    text-shadow: 0px 0px 5px #3c4099;
}


.home-button {
    padding: 12px 20px;
    font-size: 1.2em;
    color: #fff;
    background: linear-gradient(135deg, #6b6fff, #3c4099); /* Dégradé lumineux */
    border: none;
    border-radius: 8px;
    text-decoration: none;
    cursor: pointer;
    transition: background 0.3s ease, transform 0.2s ease;
    box-shadow: 0px 0px 15px #6b6fff;
}

.home-button:hover {
    background: linear-gradient(135deg, #72f0ff, #3c4099);
    box-shadow: 0px 0px 20px #72f0ff;
    transform: translateY(-2px);
}

.home-button:active {
    background: linear-gradient(135deg, #6b6fff, #3c4099);
    transform: translateY(0);
}
</style>
