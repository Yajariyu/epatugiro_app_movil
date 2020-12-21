import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";
import { AuthService } from "../../api/auth/auth.service";

@Component({
  selector: "app-registro",
  templateUrl: "./registro.page.html",
  styleUrls: ["./registro.page.scss"],
})
export class RegistroPage implements OnInit {
  validations_form: FormGroup;
  validation_messages = {
    nombre: [
      { type: "required", message: "Nombre es requerido." },
      { type: "pattern", message: "El nombre no es valido." },
    ],
    apellido: [
      { type: "required", message: "Apellido es requerido." },
      { type: "pattern", message: "El apellido no es valido." },
    ],
    numero_telefono: [
      { type: "required", message: "Numero de telefono es requerido." },
      { type: "pattern", message: "Numero de telefono no es valido." },
    ],
    email: [
      { type: "required", message: "Email es requerido." },
      { type: "pattern", message: "Email invalido." },
    ],
    password: [
      { type: "required", message: "Contraseña requerida." },
      { type: "minlength", message: "requiere minimo 6 caracteres." },
    ],
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastCtrl: ToastController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      nombre: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("[ña-zA-Z ]*"),
        ])
      ),
      apellido: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("[ña-zA-Z ]*"),
        ])
      ),
      numero_telefono: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9 ]*$"),
        ])
      ),
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

  tryRegister(value) {
    this.authService.registro(value).then(
      (res) => {
        console.log(res);

        if (res.response.sucess) {
          this.showToast("Su cuenta ha sido creada!!!");
          this.router.navigate(["/login"]);
        } else {
          this.showToast("Su email o informaion ya esta en uso!!!");
        }
      },
      (err) => {
        console.log(err);
        if (err.code === "auth/email-already-in-use") {
          this.showToast(value.email + " Este email ya esta en uso.");
        } else {
          this.showToast("Ocurrio algun error. Por favor intentalo de nuevo");
        }
      }
    );
  }

  async showToast(msg) {
    const toast = await this.toastCtrl.create({
      header: msg,
      position: "bottom",
      duration: 3000,
    });
    toast.present();
  }
}
