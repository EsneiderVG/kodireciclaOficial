import { NextResponse } from "next/server";
import { connectToDatabase } from '@/app/libs/mysql'
import { use } from "react";
import { log } from "console";
const bcrypt = require('bcrypt');

try {
    var conn = await connectToDatabase();    
} catch (error) {
    console.log("no se pudo conectar a la base de datos");
}


export async function GET() {
    const result = await conn.query('SELECT * FROM users');
    return NextResponse.json(result);
}

export async function POST(request) {


    try {
        const { first_name, last_name, cc, email, phone, shift, password, img_profile, user_type, created_at, updated_at } = await request.json();
        var hashPassword = await bcrypt.hash(password, 12);

        const userFound = await findByEmail(email);
        if(userFound.status == 400){
            // console.log(userFound.statusText);
            throw new Error(userFound.statusText)
        }

        // console.log(userFound);

        
        if(userFound.status == 200){
            throw new Error("el email no esta disponible, intentalo con otro")
        }
        
        if(userFound.status == 404){
            await conn.query("INSERT INTO users SET ?", {
                first_name: first_name,
                last_name: last_name,
                cc: cc,
                email: email,
                phone: phone,
                shift: shift,
                password: hashPassword,
                img_profile: img_profile,
                user_type: user_type,
                created_at: created_at,
                updated_at: updated_at
            })
            console.log("registrado");
        }

        return NextResponse.json({ message: "creado con exito" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 401})
    }


}

export async function findByEmail(email){
    try {
        email = email.trim();
        if(email.length > 0){

            const result = await conn.query('SELECT * FROM users WHERE email =?', [email]);
            if (result.length === 0) {
                return NextResponse.json({ error: "no existe el usuario" }, { status: 404, statusText: "no existe el usuario" })
            }else{
                return {result: result[0], status: 200};
            }
        }else{
            throw new Error("campos vacios, dijita tu correo")
        }
    } catch (error) {
        return NextResponse.json({ status: 400, statusText: error.message })
    }
}

export async function findByEmailLog(email){
    try {
        email = email.trim();
        if(email.length > 0){

            const result = await conn.query('SELECT * FROM users WHERE email =?', [email]);
            if (result.length === 0) {
                return NextResponse.json({ error: "no existe el usuario" }, { status: 404, statusText: "no existe el usuario" })
            }else{
                return result[0];
            }
        }else{
            throw new Error("campos vacios, dijita tu correo")
        }
    } catch (error) {
        return NextResponse.json({ status: 400, statusText: error.message })
    }
}


