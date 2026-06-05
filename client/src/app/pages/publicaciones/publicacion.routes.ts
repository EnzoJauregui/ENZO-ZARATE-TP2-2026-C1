import { Routes } from "@angular/router";

export const publicacionesRoutes: Routes = [
    {
        path: "",
        loadComponent : () => import ("./publicaciones").then((m) => m.Publicaciones)
    },
    {
        path: ":id",
        loadComponent: () => import("../publicacion/publicacion").then((m)=>m.Publicacion),
    },
]