import { User } from "../app/(core)/models/User";

export function validatePassAndEmail(correo, contraseña) {
    // Verificar si el correo no está vacío ni nulo
    if (!correo || correo.trim() === "") {
      throw new Error("El correo no puede estar vacío.");
    }
    
    // Verificar si la contraseña no está vacía ni nula
    if (!contraseña || contraseña.trim() === "") {
      throw new Error("La contraseña no puede estar vacía.");
    }
  
    // Si ambos pasan la validación, retornar true
    return true;
}

export function verificarValores(user) {
    for (const prop in user) {
      if (prop === "updated_at" || prop === "user_type") {
      } else {
        // valores en general 
        if (typeof user[prop] === "string" && user[prop].length <= 3) {
          throw new Error(`El valor de ${prop} debe ser mayor que 3 caracteres.`);
        } else if (typeof user[prop] === "number" && user[prop] <= 3) {
          throw new Error(`El valor de ${prop} debe ser mayor que 3.`);
        }

        if (prop == "cc") {
          if (typeof user[prop] === "string" && user[prop].length <= 9) {
            throw new Error(`El valor de ${prop} debe ser mayor que 9 caracteres.`);
          }
        }
        if (prop == "phone") {
          if (typeof user[prop] === "string" && user[prop].length <= 12) {
            throw new Error(`El valor de ${prop} debe ser mayor que 12 caracteres.`);
          }
        }

      }
    }
  }