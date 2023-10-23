import { config } from "@/config-env";

export enum HttpMethod {
  POST = "POST",
  PUT = "PUT"
}

export const BASE_URL = config.API_URL
export const PAPELERYSMAIN = `${BASE_URL}/api/papelerysmain`
export const PAPELERYS = `${BASE_URL}/api/papelerys`
export const STATUS = `${BASE_URL}/api/status`
export const USERS = `${BASE_URL}/api/users`
export const LOGIN = `${BASE_URL}/api/login` 