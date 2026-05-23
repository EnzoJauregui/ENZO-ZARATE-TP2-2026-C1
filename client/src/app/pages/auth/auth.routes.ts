import { Routes } from "@angular/router";


export const authRoutes: Routes = [
    {
        path: "",
        children: [
            {
                path: "login",
                loadComponent : () => import ("./login/login").then((m) => m.Login)
            },
            {
                path: "registro",
                loadComponent: () => import("./registro/registro").then((m)=>m.Registro),
            },
            {
                path:"",
                redirectTo:"login",
                pathMatch: "full"
            }
        ],
    }
]