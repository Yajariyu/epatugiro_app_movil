import { MenuController, ToastController } from "@ionic/angular";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

//librerias externas
import { Storage } from "@ionic/storage";
import { AuthService } from "../../api/auth/auth.service";

@Component({
  selector: "app-configuracion",
  templateUrl: "./configuracion.page.html",
  styleUrls: ["./configuracion.page.scss"],
})
export class ConfiguracionPage implements OnInit {
  private user;
  public transferencias: any = [];
  private skip = -5;

  constructor(
    private Storage: Storage,
    private router: Router,
    private menuCtrl: MenuController,
    private toastCtrl: ToastController,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.Storage.get("user").then((data) => {
      this.user = data;
      console.log(this.user);
      this.cargarTransferencias();
    });
  }

  cargarTransferencias() {
    return new Promise((resolve, reject) => {
      this.skip += 5;
      this.auth.getTransferencias(this.user.id, this.skip).then((res) => {
        res.forEach((item) => {
          this.transferencias.push(item);
        });
        console.log(this.transferencias);
        resolve(true);
      });
    });
  }

  async loadData(event) {
    await this.cargarTransferencias();
    event.target.complete();
  }

  async showToast(msg: any) {
    const toast = await this.toastCtrl.create({
      header: msg,
      position: "bottom",
      duration: 3000,
    });
    toast.present();
  }
}
