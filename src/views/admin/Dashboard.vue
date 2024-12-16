<template>
    <div class="dashboard-container">
        <div class="welcome-message">
            <h1>Bienvenue, Administrateur!</h1>
        </div>
        <div class="dashboard-content">
            <h2>Dashboard works!</h2>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Dashboard',
}
</script>

<style scoped>
.dashboard-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f5f5f5;
    text-align: center;
}

.welcome-message {
    font-size: 2rem;
    font-weight: bold;
    color: #4CAF50;
    opacity: 0;
    animation: fadeIn 3s forwards;
}

.dashboard-content h2 {
    margin-top: 20px;
    font-size: 1.5rem;
    color: #333;
}

/* Animation de l'apparition du message de bienvenue */
@keyframes fadeIn {
    0% {
        opacity: 0;
        transform: translateY(-20px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
