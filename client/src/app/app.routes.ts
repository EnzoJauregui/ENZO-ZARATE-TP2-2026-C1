import { Routes } from '@angular/router';
import { authRoutes } from './pages/auth/auth.routes';

export const routes: Routes = [
    {
        path: "auth",
        loadChildren : () => import("./pages/auth/auth.routes").then((m) => m.authRoutes),
    },
    {
        path:"mi-perfil",
        loadComponent : () => import("./pages/mi-perfil/mi-perfil").then((m) => m.MiPerfil),
    },
    {
        path: "publicaciones",
        loadChildren : () => import("./pages/publicaciones/publicacion.routes").then((m) => m.publicacionesRoutes),
    },
    {
        path:"",
        redirectTo:"auth",
        pathMatch: "full"
    }
    
];
