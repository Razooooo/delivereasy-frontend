<template>
    <div>
        <h1>Mes Livraisons</h1>
        <table>
            <thead>
                <tr>
                    <th>Numéro de Suivi</th>
                    <th>Nom du Destinataire</th>
                    <th>Adresse</th>
                    <th>Statut</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="delivery in deliveries" :key="delivery.trackingNumber">
                    <td>{{ delivery.trackingNumber }}</td>
                    <td>{{ delivery.recipientName }}</td>
                    <td>{{ delivery.address }}</td>
                    <td>{{ delivery.status }}</td>
                </tr>
                <tr v-if="deliveries.length === 0">
                    <td colspan="4">Aucune livraison assignée.</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'Liste',
    data() {
        return {
            // Exemple de livraisons assignées au livreur
            deliveries: [
                { trackingNumber: '123456789', recipientName: 'John Doe', address: '3 rue du jambon', status: 'En cours' },
                { trackingNumber: '987654321', recipientName: 'Jane Smith', address: '5 ru de la saucisse', status: 'Livré' },
                { trackingNumber: '555555555', recipientName: 'Bob Johnson', address: '10 impasse momo', status: 'En attente' },
            ],
        };
    },
};
</script>

<style scoped>
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
</style>
