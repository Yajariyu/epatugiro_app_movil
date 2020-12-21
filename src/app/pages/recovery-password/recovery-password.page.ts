import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";
import { AuthService } from "./../../api/auth/auth.service";

@Component({
  selector: "app-recovery-password",
  templateUrl: "./recovery-password.page.html",
  styleUrls: ["./recovery-password.page.scss"],
})
export class RecoveryPasswordPage implements OnInit {
  validations_form: FormGroup;

  validation_messages = {
    email: [
      { type: "required", message: "Email is required." },
      { type: "pattern", message: "Please enter a valid email." },
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
      email: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),
        ])
      ),
    });
  }

  tryRemember(value) {
    console.log(value);
    this.authService.recuperarCuenta(value).then(
      (res) => {
        //Reset email sent sucessfully
        this.showToast(
          "Se ha enviado la informacion a su email:" + value.email + "."
        );
      },
      (err) => {
        //Reset email sent error
        this.showToast(
          "Se ha enviado la informacion a su email:" + value.email + "."
        );
        console.log(err);
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
