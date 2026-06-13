import { Routes } from "@angular/router";


export const dashboardRoutes: Routes = [
    {
        path: "",
        loadComponent: () => import("./dashboard").then((m) => m.Dashboard),
        children: [
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
                redirectTo:"usuarios",
                pathMatch: "full"
            }
        ]
    }
];