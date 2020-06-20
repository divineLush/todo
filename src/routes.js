import AppHome from './pages/AppHome.vue'
import AppEditNote from './pages/AppEditNote.vue'

export const routes = [
    { path: '', component: AppHome },
    { path: '/edit/:id', component: AppEditNote }
]