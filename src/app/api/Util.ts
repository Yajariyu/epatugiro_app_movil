export const SERVER = "https://www.epa-tugiros.com";
//export const SERVER = "http://127.0.0.1:8000";
export const API_ENDPOINT = SERVER + "/api";

/**
 * LOGIN Y CUENTA
 */
export const AUTH = API_ENDPOINT + "/auth/";
export const REGISTRO = AUTH + "registrar";
export const LOGIN = AUTH + "login";
export const RECUPERAR_CUENTA = SERVER + "/password/email";

/**
 * Bancos
 */
export const BANCOS = API_ENDPOINT + "/bancos";

/**
 * transferencias
 */
export const TRANSFERENCIA = "/transferencia";
