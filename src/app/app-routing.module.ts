import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  {
    path: "home",
    loadChildren: () =>
      import("./home/home.module").then((m) => m.HomePageModule),
  },
  { path: "login", loadChildren: "./pages/login/login.module#LoginPageModule" },
  {
    path: "registro",
    loadChildren: "./pages/registro/registro.module#RegistroPageModule",
  },
  {
    path: "recovery-password",
    loadChildren:
      "./pages/recovery-password/recovery-password.module#RecoveryPasswordPageModule",
  },
  {
    path: "configuracion",
    loadChildren:
      "./pages/configuracion/configuracion.module#ConfiguracionPageModule",
  },
  { path: 'imagen', loadChildren: './pages/imagen/imagen.module#ImagenPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
