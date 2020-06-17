import AppHome from './components/AppHome.vue'
import AppEditNote from './components/AppEditNote.vue'

export const routes = [
    { path: '', component: AppHome },
    { path: '/edit/:id', component: AppEditNote }
]