import { Router } from "@angular/router";
import { Component } from "@angular/core";
import {
  AlertController,
  ToastController,
  LoadingController,
} from "@ionic/angular";

//importar librerias externas
import { AuthService } from "../api/auth/auth.service";
import { Storage } from "@ionic/storage";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  private user: any;
  public transferencias: any = [];
  private skip = -5;
  public bancos_emisores: any = [];
  public bancos_receptores: any = [];
  public cuenta: any = {
    dinero: null,
    cedula: null,
    numero_cuenta: null,
    tipo_cuenta: null,
    banco_id: null,
    bolivares: null,
    numero_cuenta_receptor: null,
    tipo_documento: null,
    cedula_emisor: null,
  };
  public tasa_cambio;
  public image;
  public loading: any;

  constructor(
    public alertController: AlertController,
    public auth: AuthService,
    public storage: Storage,
    public toastCtrl: ToastController,
    private router: Router,
    public camera: Camera,
    private loadingCtrl: LoadingController
  ) {}

  ionViewWillEnter() {
    this.storage.get("user").then((data) => {
      this.user = data;
      console.log(this.user);
      this.cargarBancos();
    });
  }

  cargarBancos() {
    this.auth.getBancos().then((res) => {
      console.log(res);
      this.tasa_cambio = res.response.tasa_cambio;
      this.bancos_emisores = res.response.emisores;
      this.bancos_receptores = res.response.receptores;
      console.log(this.bancos_emisores);
    });
  }

  async realizarTransferencia() {
    await this.mostrarProgressBar("cargando");

    if (
      this.cuenta.dinero == null ||
      this.cuenta.banco_emisor == null ||
      this.cuenta.bolivares == null ||
      this.cuenta.nombre_emisor == null ||
      this.cuenta.tipo_documento == null ||
      this.cuenta.cedula_emisor == null ||
      this.cuenta.banco_receptor == null ||
      this.cuenta.tipo_cuenta == null ||
      this.cuenta.nombre_receptor == null ||
      this.cuenta.numero_cuenta_receptor == null ||
      this.image == null
    ) {
      alert("Debe rellenar todos los campos");
      this.loading.dismiss();
    } else {
      this.auth
        .crearTransferencia({
          user_id: this.user.id,
          dinero: this.cuenta.dinero,
          banco_emisor: this.cuenta.banco_emisor,
          bolivares: this.cuenta.bolivares,
          nombre_emisor: this.cuenta.nombre_emisor,
          tipo_documento: this.cuenta.tipo_documento,
          cedula_emisor: this.cuenta.cedula_emisor,
          banco_receptor: this.cuenta.banco_receptor,
          tipo_cuenta: this.cuenta.tipo_cuenta,
          nombre_receptor: this.cuenta.nombre_receptor,
          numero_cuenta_receptor: this.cuenta.numero_cuenta_receptor,
          tasa_cambio: this.tasa_cambio,
          factura: this.image,
        })
        .then(
          (res) => {
            if (res.response.sucess) {
              console.log(res.response.sucess);
              this.transferenciaExitosa(res.response.message);
              this.resetInputs();
              this.router.navigateByUrl("configuracion");
            }
            this.loading.dismiss();
          },
          (error) => {
            alert("ha ocurrido un error");
            this.loading.dismiss();
          }
        );
    }
  }

  resetInputs() {
    this.cuenta.dinero = null;
    this.cuenta.banco_emisor = null;
    this.cuenta.bolivares = null;
    this.cuenta.nombre_emisor = null;
    this.cuenta.tipo_documento = null;
    this.cuenta.cedula_emisor = null;
    this.cuenta.banco_receptor = null;
    this.cuenta.tipo_cuenta = null;
    this.cuenta.nombre_receptor = null;
    this.cuenta.numero_cuenta_receptor = null;
    this.image = this.image;
  }

  calcularBs() {
    this.cuenta.bolivares = (this.cuenta.dinero / this.tasa_cambio).toFixed(2);
  }

  abrirCamara() {
    this.camera
      .getPicture({
        quality: 10,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.CAMERA,
        mediaType: this.camera.MediaType.PICTURE,
        encodingType: this.camera.EncodingType.PNG,
        correctOrientation: true,
        targetWidth: 400,
        targetHeight: 400,
      })
      .then(
        (_imagePath) => {
          this.image = "data:image/png;base64," + _imagePath;
          /*let imagePath = _imagePath;
      alert(_imagePath);*/
        },
        (error) => {
          alert(JSON.stringify(error));
        }
      );
  }

  async mostrarProgressBar(message: string): Promise<void> {
    this.loading = await this.loadingCtrl.create({
      message: message,
    });
    this.loading.present();
  }

  async showToast(msg: any) {
    const toast = await this.toastCtrl.create({
      header: msg,
      position: "bottom",
      duration: 3000,
    });
    toast.present();
  }

  async transferenciaExitosa(msg: any) {
    const toast = await this.toastCtrl.create({
      header: msg,
      position: "bottom",
      buttons: [
        {
          text: "Aceptar",
          role: "cancel",
          handler: () => {},
        },
      ],
    });
    toast.present();
  }
}

