export interface User {
  nombre: string;
  apellido: string;
  edad: number;
  email: string;
  password: string;
}

export interface PublicUser {
  nombre: string;
  apellido: string;
  edad: number;
  email: string;
}

export interface JwtPayload {
  email: string;
}