import {
  Component,
  OnInit,
  ɵCodegenComponentFactoryResolver,
} from "@angular/core";
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { Router } from "@angular/router";
import { MenuController, ToastController } from "@ionic/angular";

//librerias externas
import { Storage } from "@ionic/storage";
import { AuthService } from "../../api/auth/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  validations_form: FormGroup;

  validation_messages = {
    email: [
      { type: "required", message: "Email es requerido." },
      { type: "pattern", message: "ingrese un email valido" },
    ],
    password: [
      { type: "required", message: "Contraseña." },
      { type: "minlength", message: "necesita mas de 6 caracteres." },
    ],
  };
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastCtrl: ToastController,
    private menuCtrl: MenuController,
    private storage: Storage,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.menuCtrl.enable(false);
    this.validations_form = this.formBuilder.group({
      email: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(
            "^[ña-zA-Z0-9_.+-]+@[ña-zA-Z0-9-]+.[ña-zA-Z0-9-.]+$"
          ),
        ])
      ),
      password: new FormControl(
        "",
        Validators.compose([Validators.minLength(6), Validators.required])
      ),
    });
  }

  tryLogin(value) {
    console.log(value);
    this.authService.login(value).then(
      (res) => {
        if (res.response.sucess) {
          this.menuCtrl.enable(true);
          this.router.navigateByUrl("home", { replaceUrl: true });
          this.guardarUsuario(res.response.user, res.response.cuenta);
        } else {
          this.showToast("Error al inciar sesion confirme sus datos!!");
        }
      },
      (err) => {
        this.showToast("Error al inciar sesion confirme sus datos!!");
        console.log(err);
      }
    );
  }

  guardarUsuario(user, cuenta) {
    this.storage.set("user", user);
    this.storage.set("cuenta", cuenta);
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
