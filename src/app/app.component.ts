import { Component } from "@angular/core";

import { MenuController, Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Router } from "@angular/router";

//importar librerias externas
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  navigate: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private router: Router,
    private menuCtrl: MenuController
  ) {
    this.sideMenu();
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.storage.get("user").then((resp) => {
        if (resp) {
          this.menuCtrl.enable(true);
          this.router.navigateByUrl("home", { replaceUrl: true });
        }
      });
    });
  }

  sideMenu() {
    this.navigate = [
      {
        title: "Home",
        url: "/home",
        icon: "home",
      },
      {
        title: "Historial de transacciones",
        url: "/configuracion",
        icon: "clipboard",
      },
    ];
  }

  cerrarSesion() {
    this.storage.set("user", undefined).then(async () => {
      await this.storage.set("cuentas", undefined);
      this.menuCtrl.enable(false);
      this.router.navigateByUrl("login", { skipLocationChange: true });
    });
  }
}
