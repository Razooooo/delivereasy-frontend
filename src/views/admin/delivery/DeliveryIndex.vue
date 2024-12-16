<template>
    <div>
        <h1>Gestion des Colis</h1>

        <!-- Section : Liste des colis -->
        <h2>Liste des colis</h2>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Poids</th>
                    <th>Description</th>
                    <th>Employé</th>
                    <th>Livraison</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="colis in colis" :key="colis.Idcolis">
                    <td>{{ colis.Idcolis }}</td>
                    <td>{{ colis.Poids }}</td>
                    <td>{{ colis.Description }}</td>
                    <td>{{ getEmployeeName(colis.Idemployé) }}</td>
                    <td>{{ getDeliveryName(colis.Idlivraison) }}</td>
                    <td>
                        <button @click="selectColis(colis)">Modifier</button>
                        <button @click="deleteColis(colis.Idcolis)">Supprimer</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Section : Modifier les informations d'un colis -->
        <div v-if="selectedColis" class="edit-form">
            <h2>Modifier le colis : {{ selectedColis.Description }}</h2>
            <form @submit.prevent="updateColis">
                <div>
                    <label for="poids">Poids:</label>
                    <input type="number" id="poids" v-model.number="selectedColis.Poids" required />
                </div>
                <div>
                    <label for="description">Description:</label>
                    <input type="text" id="description" v-model="selectedColis.Description" required />
                </div>
                <div>
                    <label for="idemploye">Employé:</label>
                    <select v-model.number="selectedColis.Idemployé">
                        <option v-for="emp in employes" :key="emp.Idemployé" :value="emp.Idemployé">
                            {{ emp.Nom }}
                        </option>
                    </select>
                </div>
                <div>
                    <label for="idlivraison">Livraison:</label>
                    <select v-model.number="selectedColis.Idlivraison">
                        <option v-for="liv in livraisons" :key="liv.Idlivraison" :value="liv.Idlivraison">
                            {{ liv.Description }}
                        </option>
                    </select>
                </div>
                <button type="submit">Enregistrer</button>
            </form>
        </div>

        <!-- Section : Ajouter un colis -->
        <div class="form-add-colis">
            <h2>Ajouter un Colis</h2>
            <form @submit.prevent="addColis">
                <div>
                    <label for="colis-poids">Poids:</label>
                    <input type="number" id="colis-poids" v-model.number="newColis.Poids" required />
                </div>
                <div>
                    <label for="colis-description">Description:</label>
                    <input type="text" id="colis-description" v-model="newColis.Description" required />
                </div>
                <div>
                    <label for="colis-idemploye">Employé:</label>
                    <select v-model.number="newColis.Idemployé">
                        <option v-for="emp in employes" :key="emp.Idemployé" :value="emp.Idemployé">
                            {{ emp.Nom }}
                        </option>
                    </select>
                </div>
                <div>
                    <label for="colis-idlivraison">Livraison:</label>
                    <select v-model.number="newColis.Idlivraison">
                        <option v-for="liv in livraisons" :key="liv.Idlivraison" :value="liv.Idlivraison">
                            {{ liv.Description }}
                        </option>
                    </select>
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
    Idcolis: number;
    Poids: number;
    Description: string;
    Idemployé: number;
    Idlivraison: number;
}

interface Employee {
    Idemployé: number;
    Nom: string;
}

interface Delivery {
    Idlivraison: number;
    Description: string;
}

export default defineComponent({
    name: 'DeliveryIndex',
    data() {
        return {
            colis: [] as Colis[],
            employes: [] as Employee[],
            livraisons: [] as Delivery[],
            selectedColis: null as Colis | null,
            newColis: {
                Poids: 0,
                Description: "",
                Idemployé: 0,
                Idlivraison: 0,
            } as Omit<Colis, 'Idcolis'>,
        };
    },
    methods: {
        async fetchColis() {
            try {
                const response = await axiosInstance.get('/api/colis');
                this.colis = response.data;
            } catch (error) {
                console.error('Erreur lors de la récupération des colis:', error);
            }
        },
        async fetchEmployes() {
            try {
                const response = await axiosInstance.get('/api/employes');
                this.employes = response.data;
            } catch (error) {
                console.error('Erreur lors de la récupération des employés:', error);
            }
        },
        async fetchLivraisons() {
            try {
                const response = await axiosInstance.get('/api/livraisons');
                this.livraisons = response.data;
            } catch (error) {
                console.error('Erreur lors de la récupération des livraisons:', error);
            }
        },
        getEmployeeName(id: number): string {
            const employee = this.employes.find((e) => e.Idemployé === id);
            return employee ? employee.Nom : 'Inconnu';
        },
        getDeliveryName(id: number): string {
            const delivery = this.livraisons.find((d) => d.Idlivraison === id);
            return delivery ? delivery.Description : 'Inconnue';
        },
        selectColis(colis: Colis) {
            this.selectedColis = { ...colis };
        },
        async updateColis() {
            if (!this.selectedColis) return;

            try {
                const { Idcolis, Poids, Description, Idemployé, Idlivraison } = this.selectedColis;
                const response = await axiosInstance.put(`/api/colis/${Idcolis}`, {
                    Poids,
                    Description,
                    Idemployé,
                    Idlivraison,
                });

                if (response.status === 200) {
                    const index = this.colis.findIndex((c) => c.Idcolis === Idcolis);
                    if (index !== -1) {
                        this.colis[index] = { ...this.selectedColis };
                    }
                    alert('Colis mis à jour avec succès !');
                    this.selectedColis = null;
                }
            } catch (error) {
                console.error('Erreur lors de la mise à jour du colis:', error);
                alert('Une erreur s\'est produite lors de la mise à jour.');
            }
        },
        async addColis() {
            try {
                const response = await axiosInstance.post('/api/colis', this.newColis);
                this.colis.push(response.data);
                this.newColis = {
                    Poids: 0,
                    Description: "",
                    Idemployé: 0,
                    Idlivraison: 0,
                };
                alert('Colis ajouté avec succès !');
            } catch (error) {
                console.error('Erreur lors de l\'ajout du colis:', error);
                alert('Une erreur s\'est produite. Veuillez réessayer.');
            }
        },
        async deleteColis(id: number) {
            const confirmation = confirm("Êtes-vous sûr de vouloir supprimer ce colis ?");
            if (!confirmation) return;

            try {
                const response = await axiosInstance.delete(`/api/colis/${id}`);
                if (response.status === 204) {
                    this.colis = this.colis.filter((c) => c.Idcolis !== id);
                    alert('Colis supprimé avec succès !');
                }
            } catch (error) {
                console.error('Erreur lors de la suppression du colis:', error);
                alert('Une erreur s\'est produite. Veuillez réessayer.');
            }
        },
    },
    async mounted() {
        await Promise.all([this.fetchColis(), this.fetchEmployes(), this.fetchLivraisons()]);
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

.form-add-colis h2 {
    text-align: center;
    margin-bottom: 20px;
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
