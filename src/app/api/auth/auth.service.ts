import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import * as Util from "../Util";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  headers;

  constructor(public http: HttpClient) {
    this.headers = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
      Accept: "application/json, text/plain",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, Content-Type, X-Auth-Token, Accept, Authorization, X-Request-With, Access-Control-Request-Method, Access-Control-Request-Headers",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods":
        "GET, POST, DELETE, PUT, OPTIONS, TRACE, PATCH, CONNECT",
    });
  }

  /**
   * Toda la informacion de la cuenta del usuario
   * @param data
   */
  registro(data) {
    return this.http
      .post(Util.REGISTRO, data, this.headers)
      .pipe(map((res: any) => res))
      .toPromise();
  }

  login(data) {
    return this.http
      .post(Util.LOGIN, data, this.headers)
      .pipe(map((res: any) => res))
      .toPromise();
  }

  recuperarCuenta(email) {
    return this.http
      .post(Util.RECUPERAR_CUENTA, email, this.headers)
      .pipe(map((res: any) => res))
      .toPromise();
  }

  getBancos() {
    return this.http
      .get(Util.BANCOS, this.headers)
      .pipe(map((res: any) => res))
      .toPromise();
  }

  crearTransferencia(data) {
    return this.http
      .post(Util.API_ENDPOINT + Util.TRANSFERENCIA, data, this.headers)
      .pipe(map((res: any) => res))
      .toPromise();
  }

  getTransferencias(cuenta_id, skip) {
    return this.http
      .get(
        Util.API_ENDPOINT + Util.TRANSFERENCIA + "/" + cuenta_id + "/" + skip,
        this.headers
      )
      .pipe(map((res: any) => res))
      .toPromise();
  }
}
