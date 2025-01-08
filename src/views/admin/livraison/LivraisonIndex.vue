<template>
  <div>
    <h1>Gestion des Livraisons</h1>

    <!-- Section : Liste des livraisons -->
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Date</th>
          <th>ID Employé</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="livraison in livraisons" :key="livraison.IdLivraison">
          <td>{{ livraison.IdLivraison }}</td>
          <td>{{ livraison.Date_livraison }}</td>
          <td>{{ livraison.Idemployé || 'Non assigné' }}</td>
          <td>
            <button @click="selectLivraison(livraison)">Modifier</button>
            <button @click="deleteLivraison(livraison.IdLivraison)">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Section : Modifier les informations d'une livraison -->
    <div v-if="selectedLivraison" class="edit-form">
      <h2>Modifier la Livraison : {{ selectedLivraison.IdLivraison }}</h2>
      <form @submit.prevent="updateLivraison">
        <div>
          <label for="date">Date:</label>
          <input type="date" id="date" v-model="selectedLivraison.Date_livraison" required />
        </div>
        <div>
          <label for="employe">ID Employé:</label>
          <input type="number" id="employe" v-model.number="selectedLivraison.Idemployé" placeholder="Optionnel" />
        </div>
        <button type="submit">Enregistrer</button>
      </form>
    </div>

    <!-- Section : Ajouter une livraison -->
    <div class="form-add-livraison">
      <h2>Ajouter une Livraison</h2>
      <form @submit.prevent="addLivraison">
        <div>
          <label for="new-date">Date:</label>
          <input type="date" id="new-date" v-model="newLivraison.Date_livraison" required />
        </div>
        <div>
          <label for="new-employe">ID Employé:</label>
          <input type="number" id="new-employe" v-model.number="newLivraison.Idemployé" placeholder="Optionnel" />
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axiosInstance from '@/services/axios';

interface Livraison {
  IdLivraison: number;
  Date_livraison: string; // Format : YYYY-MM-DD
  Idemployé: number | null;
}

export default defineComponent({
  name: 'LivraisonIndex',
  data() {
    return {
      livraisons: [] as Livraison[],
      selectedLivraison: null as Livraison | null,
      newLivraison: {
        Date_livraison: "",
        Idemployé: null as number | null,
      },
    };
  },
  methods: {
    async fetchLivraisons() {
      try {
        const response = await axiosInstance.get('/api/livraisons');
        this.livraisons = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des livraisons:', error);
      }
    },

    selectLivraison(livraison: Livraison) {
      this.selectedLivraison = { ...livraison };
    },

    async updateLivraison() {
      if (!this.selectedLivraison) return;

      try {
        const { IdLivraison, Date_livraison, Idemployé } = this.selectedLivraison;
        const response = await axiosInstance.put(`/api/livraisons/${IdLivraison}`, {
          Date_livraison,
          Idemployé,
        });

        if (response.status === 200) {
          const index = this.livraisons.findIndex((l) => l.IdLivraison === IdLivraison);
          if (index !== -1) {
            this.livraisons[index] = { ...this.selectedLivraison };
          }
          alert('Livraison mise à jour avec succès !');
          this.selectedLivraison = null;
        }
      } catch (error) {
        console.error('Erreur lors de la mise à jour de la livraison:', error);
        alert("Une erreur s'est produite lors de la mise à jour.");
      }
    },

    async addLivraison() {
      try {
        const response = await axiosInstance.post('/api/livraisons', this.newLivraison);
        this.livraisons.push(response.data);
        this.newLivraison = {
          Date_livraison: "",
          Idemployé: null,
        };
        alert('Livraison ajoutée avec succès !');
      } catch (error) {
        console.error("Erreur lors de l'ajout de la livraison:", error);
        alert("Une erreur s'est produite. Veuillez réessayer.");
      }
    },

    async deleteLivraison(id: number) {
      if (!id) {
        console.error('ID non défini. Impossible de supprimer la livraison.');
        return;
      }

      const confirmation = confirm("Êtes-vous sûr de vouloir supprimer cette livraison ?");
      if (!confirmation) return;

      try {
        const response = await axiosInstance.delete(`/api/livraisons/${id}`);
        if (response.status === 204) {
          this.livraisons = this.livraisons.filter((l) => l.IdLivraison !== id);
          alert('Livraison supprimée avec succès.');
        }
      } catch (error) {
        console.error('Erreur lors de la suppression de la livraison:', error);
        alert('Une erreur s\'est produite lors de la suppression.');
      }
    }
  },

  mounted() {
    this.fetchLivraisons();
  },
});
</script>


<style>
/********* Styles généraux *********/
body {
  background-color: #f7f7f7;
  color: #333;
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
}

h1 {
  text-align: center;
  margin: 20px 0;
  font-size: 2rem;
  color: #007bff;
}

/********* Tableau *********/
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}

tbody tr:hover {
  background-color: #e6f7ff;
  cursor: pointer;
}

/********* Formulaire de modification *********/
.edit-form {
  margin-top: 20px;
  padding: 20px;
  background-color: #eef7ff;
  border-radius: 8px;
}

.edit-form h2 {
  text-align: center;
  margin-bottom: 20px;
}

.edit-form form div {
  margin-bottom: 10px;
}

.edit-form input,
.edit-form select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.edit-form button {
  padding: 8px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.edit-form button:hover {
  background-color: #0056b3;
}

/********* Formulaire d'ajout *********/
.form-add-livraison {
  margin-top: 20px;
  padding: 20px;
  background-color: #eef7ff;
  border-radius: 8px;
}

.form-add-livraison form div {
  margin-bottom: 10px;
}

.form-add-livraison input,
.form-add-livraison select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.form-add-livraison button {
  padding: 8px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.form-add-livraison button:hover {
  background-color: #0056b3;
}
</style>