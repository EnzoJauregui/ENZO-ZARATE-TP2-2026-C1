import { Routes } from "@angular/router";


export const dashboardRoutes: Routes = [
    {
        path: "usuarios",
        loadComponent: () => import("./usuarios/usuarios").then( (m) => m.Usuarios ),
    },
    {
        path:"estadisticas",
        loadComponent: () => import("./estadisticas/estadisticas").then( (m) => m.Estadisticas),
    },
    {
        path:"",
        redirectTo:"estadisticas",
        pathMatch: "full"
    }
];