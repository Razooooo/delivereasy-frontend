<template>
    <div>
        <h1>Gestion des Livreurs</h1>

        <!-- Section : Liste des livreurs -->
        <h2>Liste des livreurs</h2>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Email</th>
                    <th>Actions</th> <!-- Ajout de la colonne Actions -->
                </tr>
            </thead>
            <tbody>
                <tr v-for="driver in drivers" :key="driver.Idemployé" @click="selectDriver(driver)">
                    <td>{{ driver.Idemployé }}</td>
                    <td>{{ driver.Nom }}</td>
                    <td>{{ driver.Prénom }}</td>
                    <td>{{ driver.Email }}</td>
                    <td>
                        <button @click.stop="deleteDriver(driver.Idemployé)">Supprimer</button> <!-- Bouton pour supprimer -->
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Section : Modifier les informations des livreurs -->
        <div v-if="selectedDriver" class="edit-form">
            <h2>Modifier le livreur : {{ selectedDriver.Nom }} {{ selectedDriver.Prénom }}</h2>
            <form @submit.prevent="updateDriver">
                <div>
                    <label for="nom">Nom:</label>
                    <input
                        type="text"
                        id="nom"
                        v-model="selectedDriver.Nom"
                        required
                    />
                </div>
                <div>
                    <label for="prenom">Prénom:</label>
                    <input
                        type="text"
                        id="prenom"
                        v-model="selectedDriver.Prénom"
                        required
                    />
                </div>
                <div>
                    <label for="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        v-model="selectedDriver.Email"
                        required
                    />
                </div>
                <button type="submit">Enregistrer</button>
            </form>
        </div>

        <!-- Section : Ajouter un livreur -->
        <div class="form-add-driver">
            <h2>Ajouter un Livreur</h2>
            <form @submit.prevent="addDriver">
                <div>
                    <label for="driver-nom">Nom:</label>
                    <input type="text" id="driver-nom" v-model="newDriver.Nom" required />
                </div>
                <div>
                    <label for="driver-prenom">Prénom:</label>
                    <input type="text" id="driver-prenom" v-model="newDriver.Prénom" required />
                </div>
                <div>
                    <label for="driver-email">Email:</label>
                    <input type="email" id="driver-email" v-model="newDriver.Email" required />
                </div>
                <div>
                    <label for="driver-password">Mot de passe:</label>
                    <input type="password" id="driver-password" v-model="newDriver.Mot_de_passe" required />
                </div>
                <button type="submit">Ajouter</button>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axiosInstance from '@/services/axios';

interface Driver {
    Idemployé: number;
    Nom: string;
    Prénom: string;
    Email: string;
    Statut: boolean;
}

export default defineComponent({
    name: 'LivreurIndex',
    data() {
        return {
            drivers: [] as Driver[],
            selectedDriver: null as Driver | null,
            newDriver: {
                Nom: "",
                Prénom: "",
                Email: "",
                Mot_de_passe: "",
                Statut: false,
            },
        };
    },
    methods: {
        async fetchDrivers() {
            try {
                const response = await axiosInstance.get('/api/employes/statut-faux');
                this.drivers = response.data;
            } catch (error) {
                console.error('Erreur lors de la récupération des livreurs:', error);
            }
        },
        selectDriver(driver: Driver) {
            this.selectedDriver = { ...driver };
        },
        async updateDriver() {
            if (!this.selectedDriver) return;

            try {
                const { Idemployé, Nom, Prénom, Email, Statut } = this.selectedDriver;
                const response = await axiosInstance.put(`/api/employes/${Idemployé}`, {
                    Nom,
                    Prénom,
                    Email,
                    Statut,
                });

                if (response.status === 200) {
                    const index = this.drivers.findIndex((d) => d.Idemployé === Idemployé);
                    if (index !== -1) {
                        this.drivers[index] = { ...this.selectedDriver };
                    }
                    alert('Livreur mis à jour avec succès !');
                    this.selectedDriver = null;
                }
            } catch (error) {
                console.error('Erreur lors de la mise à jour du livreur:', error);
                alert('Une erreur s\'est produite lors de la mise à jour.');
            }
        },
        async addDriver() {
            try {
                const response = await axiosInstance.post('/api/employes', this.newDriver);

                this.drivers.push(response.data);
                this.newDriver = {
                    Nom: "",
                    Prénom: "",
                    Email: "",
                    Mot_de_passe: "",
                    Statut: false,
                };

                alert('Livreur ajouté avec succès !');
            } catch (error) {
                console.error('Erreur lors de l\'ajout du livreur:', error);
                alert('Une erreur s\'est produite. Veuillez réessayer.');
            }
        },
        async deleteDriver(id: number) {
            const confirmation = confirm("Êtes-vous sûr de vouloir supprimer ce livreur ?");
            if (!confirmation) return;

            try {
                const response = await axiosInstance.delete(`/api/employes/${id}`);
                if (response.status === 204) {
                    this.drivers = this.drivers.filter(driver => driver.Idemployé !== id);
                    alert('Livreur supprimé avec succès.');
                }
            } catch (error) {
                console.error('Erreur lors de la suppression du livreur:', error);
                alert('Une erreur s\'est produite lors de la suppression.');
            }
        },
    },
    mounted() {
        this.fetchDrivers();
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

th, td {
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

.edit-form input {
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
.form-add-driver {
    margin-top: 20px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #eef7ff;
}

.form-add-driver form div {
    margin-bottom: 10px;
}

.form-add-driver input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 5px;
}

.form-add-driver button {
    padding: 8px 15px;
    background-color: #007bff;
    color: white;
    border: none;
}   

</style>