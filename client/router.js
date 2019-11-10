import Vue from 'vue';
import Router from 'vue-router'

// Components
import Dashboard from './components/Dashboard.vue';
import NewProject from './components/NewProject.vue';
import EditProject from "./components/EditProject.vue";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'dashboard',
            component: Dashboard
        },
        {
            path: '/projects/new',
            name: 'new-project',
            component: NewProject
        },
        {
            path: '/projects/:id',
            name: 'edit-project',
            component: EditProject
        }
    ]
});