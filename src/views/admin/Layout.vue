<template>
    <div class="admin">
        <AdminHeader />
        <div class="ad_contain">
            <div class="ad_side">
                <AdminNav />
            </div>
            <div class="ad_display">
                <RouterView />
            </div>
        </div>
    </div>
</template>

<script>
import AdminHeader from '@/components/AdminHeader.vue'
import AdminNav from '@/components/AdminNav.vue'

export default {
    name: 'AdminLayout',
    components: {
        AdminHeader,
        AdminNav
    }
}
</script>

<style>
.admin {
    position: relative;
    background: linear-gradient(135deg, #1b1e2f, #2c2f48);
    color: #e0e4ff;
    min-height: 100vh;
    padding-top: 50px;
    padding-right: 100px; 
    font-family: 'Roboto', sans-serif;
}

.admin-logo {
    position: absolute;
    top: 20px;
    right: 20px;
    height: 80px;
    filter: drop-shadow(0px 0px 10px #7df9ff);
    z-index: 10; 
}


.ad_side {
    width: 20%;
    height: 100vh;
    background-color: rgba(20, 24, 50, 0.9); 
    border-right: 2px solid rgba(90, 95, 160, 0.5); 
    padding: 20px;
    box-shadow: 0px 0px 20px 2px #3c4099;
}

.ad_display {
    width: 80%;
    padding: 20px;
    text-align: left;
    background: rgba(30, 35, 60, 0.85); 
    color: #c3c6ff;
    transition: all 0.3s ease;
    border-radius: 10px;
}

.ad_display:hover {
    box-shadow: 0px 0px 20px 4px #6b6fff; 
}

.ad_contain {
    display: flex;
    justify-content: flex-start;
    height: 100%;
    gap: 10px;
}
</style>