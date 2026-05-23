import { Routes } from '@angular/router';
import { authRoutes } from './pages/auth/auth.routes';

export const routes: Routes = [
    {
        path: "auth",
        children: authRoutes,
    },
    {
        path:"mi-perfil",
        loadComponent : () => import("./pages/mi-perfil/mi-perfil").then((m) => m.MiPerfil),
    },
    {
        path: "publicaciones",
        loadComponent : () => import("./pages/publicaciones/publicaciones").then((m) => m.Publicaciones),
    },
    {
        path:"",
        redirectTo:"auth",
        pathMatch: "full"
    }
    
];
