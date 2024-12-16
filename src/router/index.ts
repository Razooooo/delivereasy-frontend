import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

// Importation des composants
import Home from '@/views/public/Home.vue';
import Liste from '@/views/public/Liste.vue';
import NotFound from '@/views/public/NotFound.vue';
import PublicLayout from '@/views/public/Layout.vue';

// Importation des composants administratifs
import AdminLayout from '@/views/admin/Layout.vue';
import Dashboard from '@/views/admin/Dashboard.vue';
import DeliveryIndex from '@/views/admin/delivery/DeliveryIndex.vue';
import LivreurIndex from '@/views/admin/livreur/LivreurIndex.vue';
import LivraisonIndex from '@/views/admin/livraison/LivraisonIndex.vue';


// Importation de l'authentification
import Login from '@/views/auth/Login.vue';

const routes: Array<RouteRecordRaw> = [
  // Route par défaut qui redirige vers le login si l'utilisateur n'est pas connecté
  {
    path: '/',
    redirect: '/login', // Redirige vers la page de login si l'utilisateur n'est pas connecté
  },

  // Route pour le login
  {
    path: '/login',
    name: 'login',
    component: Login,
  },

  // Routes publiques (Page d'accueil)
  {
    path: '/public',
    name: 'public',
    component: PublicLayout,
    children: [
      { path: '', name: 'home', component: Home }, // Page d'accueil
      { path: 'liste', name: 'liste', component: Liste },
    ],
  },

  // Routes administratives
  {
    path: '/admin',
    name: 'admin',
    component: AdminLayout,
    children: [
      { path: 'dashboard', name: 'dashboard', component: Dashboard },
      { path: 'delivery', name: 'delivery', component: DeliveryIndex }, // Page principale pour DeliveryIndex
      { path: 'livreur', name: 'livreur', component: LivreurIndex }, // Vue principale pour LivreurIndex
      { path: 'livraison', name: 'livraison', component: LivraisonIndex },
      //{ path: 'livreur/add', name: 'livreur-add', component: LivreurAdd }, // Vue d'ajout directe
      //{ path: 'livreur/edit/:id', name: 'livreur-edit', component: LivreurEdit }, // Vue de modification directe
    ],
  },

  // Route pour la page 404
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: NotFound,
  },
];

// Création du router
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Middleware pour vérifier l'accès basé sur le statut
router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}'); // Récupérer le statut de l'utilisateur depuis le stockage local

  if (to.matched.some(record => record.name === 'admin')) {
    // Vérifier si la route requiert un accès administrateur
    if (user.statut) {
      next();
    } else {
      next('/public'); // Rediriger vers la route publique si l'utilisateur n'est pas administrateur
    }
  } else if (to.matched.some(record => record.name === 'public')) {
    next();
  } else {
    next(); // Continuer si la route ne requiert pas de vérification
  }
});

export default router;
