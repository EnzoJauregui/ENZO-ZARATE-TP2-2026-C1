import { Routes } from '@angular/router';

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
        path: "dashboard",
        loadChildren: () => import("./pages/dashboard/dashboard.routes").then( (m) => m.dashboardRoutes),
    },
    {
        path:"",
        redirectTo:"auth",
        pathMatch: "full"
    }
    
];
