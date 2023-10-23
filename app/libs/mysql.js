import mysql from'serverless-mysql'
const bcrypt = require('bcrypt');

export const conn = mysql({
  config: {
    host: process.env.BD_HOST,
    user: process.env.BD_USER,
    password: process.env.BD_PASSWORD,
    database: process.env.BD_DATABASE
  }
})

export async function connectToDatabase() {
  try {
    var conexion = await conn.connect();
    // console.log(conexion + "holaaa");
    // console.log('Conexión a MySQL exitosa');
    return conn;

  } catch (error) {
    // console.error('Error al conectar a MySQL:');
    throw error; // Lanza una excepción para manejarla en otro lugar de tu aplicación
  }
}

export const createUser = async (credentials) => {
  const { username, password } = credentials;
  const query = `INSERT INTO users (username, password) VALUES (?, ?)`;
  var one = "";

  const hashedPassword = await bcrypt.hash(password, 12);

  const values = [username, hashedPassword];

  console.log(hashedPassword + "este");

  return new Promise((resolve, reject) => {
    conn.query(query, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve({ username });
      }
    });
  });
};

export const checkUser = async (credentials) => {

}