import { readFile } from "fs/promises";
import path from "path";
import { User } from "../types/User";

const usersPath = path.join(__dirname, "users.json");

export async function getUsers(): Promise<User[]> {
  const data = await readFile(usersPath, "utf-8");
  return JSON.parse(data) as User[];
}

export async function findUserByEmail(email: string): Promise<User | undefined> {
  const users = await getUsers();
  return users.find(u => u.email.toLowerCase() === email.toLowerCase());
}

export function toPublicUser(user: User) {
  const { nombre, apellido, edad, email } = user;
  return { nombre, apellido, edad, email };
}