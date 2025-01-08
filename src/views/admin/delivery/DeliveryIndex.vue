<template>
    <div>
      <h1>Gestion des Colis</h1>
  
      <!-- Section : Liste des colis -->
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Poids</th>
            <th>Description</th>
            <th>Statut</th>
            <th>ID Employé</th>
            <th>ID Livraison</th>
            <th>ID Adresse</th>
            <th>ID Client</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="colis in colisList" :key="colis.IdColis">
            <td>{{ colis.IdColis }}</td>
            <td>{{ colis.Poids }}</td>
            <td>{{ colis.Description }}</td>
            <td>{{ colis.Statut_colis }}</td>
            <td>{{ colis.Idemployé || 'Non assigné' }}</td>
            <td>{{ colis.IdLivraison }}</td>
            <td>{{ colis.IdAdresse }}</td>
            <td>{{ colis.IdClient }}</td>
            <td>
              <button @click="selectColis(colis)">Modifier</button>
              <button @click="deleteColis(colis.IdColis)">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Section : Modifier un colis -->
      <div v-if="selectedColis" class="edit-form">
        <h2>Modifier le Colis : {{ selectedColis.IdColis }}</h2>
        <form @submit.prevent="updateColis">
          <div>
            <label for="description">Description:</label>
            <input type="text" id="description" v-model="selectedColis.Description" required />
          </div>
          <div>
            <label for="statut">Statut:</label>
            <select id="statut" v-model="selectedColis.Statut_colis">
              <option value="en cours">En cours</option>
              <option value="terminée">Terminée</option>
              <option value="annulée">Annulée</option>
            </select>
          </div>
          <div>
            <label for="poids">Poids:</label>
            <input type="number" id="poids" v-model="selectedColis.Poids" required />
          </div>
          <div>
            <label for="employe">ID Employé:</label>
            <input type="number" id="employe" v-model.number="selectedColis.Idemployé" placeholder="Optionnel" />
          </div>
          <div>
            <label for="livraison">ID Livraison:</label>
            <input type="number" id="livraison" v-model.number="selectedColis.IdLivraison" />
          </div>
          <div>
            <label for="adresse">ID Adresse:</label>
            <input type="number" id="adresse" v-model.number="selectedColis.IdAdresse" />
          </div>
          <div>
            <label for="client">ID Client:</label>
            <input type="number" id="client" v-model.number="selectedColis.IdClient" />
          </div>
          <button type="submit">Enregistrer</button>
        </form>
      </div>
  
      <!-- Section : Ajouter un colis -->
      <div class="form-add-colis">
        <h2>Ajouter un Colis</h2>
        <form @submit.prevent="addColis">
          <div>
            <label for="new-description">Description:</label>
            <input type="text" id="new-description" v-model="newColis.Description" required />
          </div>
          <div>
            <label for="new-statut">Statut:</label>
            <select id="new-statut" v-model="newColis.Statut_colis">
              <option value="en cours">En cours</option>
              <option value="terminée">Terminée</option>
              <option value="annulée">Annulée</option>
            </select>
          </div>
          <div>
            <label for="new-poids">Poids:</label>
            <input type="number" id="new-poids" v-model="newColis.Poids" required />
          </div>
          <div>
            <label for="new-employe">ID Employé:</label>
            <input type="number" id="new-employe" v-model.number="newColis.Idemployé" placeholder="Optionnel" />
          </div>
          <div>
            <label for="new-livraison">ID Livraison:</label>
            <input type="number" id="new-livraison" v-model.number="newColis.IdLivraison" />
          </div>
          <div>
            <label for="new-adresse">ID Adresse:</label>
            <input type="number" id="new-adresse" v-model.number="newColis.IdAdresse" />
          </div>
          <div>
            <label for="new-client">ID Client:</label>
            <input type="number" id="new-client" v-model.number="newColis.IdClient" />
          </div>
          <button type="submit">Ajouter</button>
        </form>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import axiosInstance from '@/services/axios';
  
  interface Colis {
    IdColis: number;
    Poids: number;
    Description: string;
    Statut_colis: "en cours" | "terminée" | "annulée";
    Idemployé: number | null;
    IdLivraison: number;
    IdAdresse: number;
    IdClient: number;
  }
  
  export default defineComponent({
    name: 'DeliveryIndex',
    data() {
      return {
        colisList: [] as Colis[],
        selectedColis: null as Colis | null,
        newColis: {
          Poids: 0,
          Description: "",
          Statut_colis: "en cours",
          Idemployé: null as number | null,
          IdLivraison: 0,
          IdAdresse: 0,
          IdClient: 0,
        },
      };
    },
    methods: {
      async fetchColis() {
        try {
          const response = await axiosInstance.get('/api/colis');
          this.colisList = response.data;
        } catch (error) {
          console.error('Erreur lors de la récupération des colis:', error);
        }
      },
  
      selectColis(colis: Colis) {
        this.selectedColis = { ...colis };
      },
  
      async updateColis() {
        if (!this.selectedColis) return;
  
        try {
          const response = await axiosInstance.put(`/api/colis/${this.selectedColis.IdColis}`, this.selectedColis);
          if (response.status === 200) {
            const index = this.colisList.findIndex((c) => c.IdColis === this.selectedColis?.IdColis);
            if (index !== -1) {
              this.colisList[index] = { ...this.selectedColis };
            }
            alert('Colis mis à jour avec succès !');
            this.selectedColis = null;
          }
        } catch (error) {
          console.error('Erreur lors de la mise à jour du colis:', error);
          alert("Une erreur s'est produite lors de la mise à jour.");
        }
      },
  
      async addColis() {
        try {
          const response = await axiosInstance.post('/api/colis', this.newColis);
          this.colisList.push(response.data);
          this.newColis = {
            Poids: 0,
            Description: "",
            Statut_colis: "en cours",
            Idemployé: null,
            IdLivraison: 0,
            IdAdresse: 0,
            IdClient: 0,
          };
          alert('Colis ajouté avec succès !');
        } catch (error) {
          console.error("Erreur lors de l'ajout du colis:", error);
          alert("Une erreur s'est produite. Veuillez réessayer.");
        }
      },
  
      async deleteColis(id: number) {
        const confirmation = confirm("Êtes-vous sûr de vouloir supprimer ce colis ?");
        if (!confirmation) return;
  
        try {
          const response = await axiosInstance.delete(`/api/colis/${id}`);
          if (response.status === 204) {
            this.colisList = this.colisList.filter((c) => c.IdColis !== id);
            alert('Colis supprimé avec succès.');
          }
        } catch (error) {
          console.error('Erreur lors de la suppression du colis:', error);
          alert('Une erreur s\'est produite lors de la suppression.');
        }
      },
    },
  
    mounted() {
      this.fetchColis();
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
  .form-add-colis {
    margin-top: 20px;
    padding: 20px;
    background-color: #eef7ff;
    border-radius: 8px;
  }
  
  .form-add-colis form div {
    margin-bottom: 10px;
  }
  
  .form-add-colis input,
  .form-add-colis select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  
  .form-add-colis button {
    padding: 8px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .form-add-colis button:hover {
    background-color: #0056b3;
  }
  </style>
  