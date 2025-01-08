<template>
    <div class="list-container">
      <h1>Liste des Livraisons</h1>
  
      <!-- Vérification si des livraisons existent -->
      <div v-if="livraisons && livraisons.length">
        <ul class="livraisons-list">
          <li v-for="livraison in livraisons" :key="livraison.id" class="livraison-item">
            <h2>Livraison ID: {{ livraison.id }}</h2>
            <p>Date: {{ livraison.date }}</p>
  
            <!-- Liste des colis pour chaque livraison -->
            <ul class="colis-list">
              <li v-for="colis in livraison.colis" :key="colis.id" class="colis-item">
                Colis ID: {{ colis.id }} - {{ colis.description }}
              </li>
            </ul>
          </li>
        </ul>
      </div>
  
      <!-- Message en cas d'absence de livraisons -->
      <div v-else>
        <p>Aucune livraison trouvée pour cet utilisateur.</p>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import axiosInstance from '@/services/axios';
  
  export default defineComponent({
    name: 'Liste',
    data() {
      return {
        livraisons: [] as Array<{
          id: number;
          date: string;
          colis: Array<{ id: number; description: string }>;
        }>,
        errorMessage: '',
      };
    },
    async mounted() {
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.id) {
      this.errorMessage = "L'utilisateur n'est pas correctement connecté.";
      return;
    }

    // Appel à l'API pour récupérer les livraisons
    const response = await axiosInstance.get(`/api/livraisons/${user.id}`);
    console.log('Données reçues de l\'API:', response.data);

    this.livraisons = response.data || [];
  } catch (error) {
    console.error('Erreur lors du chargement des livraisons:', error);
    this.errorMessage = "Une erreur est survenue lors du chargement des livraisons.";
  }
},
  });
  </script>
  
  <style scoped>
  .list-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background: #1f2235;
    color: #e0e4ff;
    border-radius: 12px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }
  
  h1 {
    font-size: 24px;
    margin-bottom: 20px;
    text-align: center;
    color: #72f0ff;
  }
  
  .livraisons-list {
    list-style-type: none;
    padding: 0;
  }
  
  .livraison-item {
    margin-bottom: 20px;
    padding: 15px;
    background: #2b2f45;
    border-radius: 8px;
    box-shadow: 0 0 5px rgba(90, 95, 160, 0.7);
  }
  
  .livraison-item h2 {
    margin: 0;
    color: #7df9ff;
  }
  
  .colis-list {
    list-style-type: none;
    padding: 0;
    margin-top: 10px;
  }
  
  .colis-item {
    padding: 8px;
    background: #3c4099;
    margin-bottom: 5px;
    border-radius: 4px;
    color: #ffffff;
  }
  </style>
  