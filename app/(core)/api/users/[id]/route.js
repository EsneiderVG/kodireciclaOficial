import { NextResponse } from "next/server";
import { connectToDatabase } from '@/app/libs/mysql'

try {
    var conn = await connectToDatabase();    
} catch (error) {
    console.log("no se pudo conectar a la base de datos");
}


export async function GET(request, { params }) {
    console.log(params);
    // console.log(params.email)
    try {
        const result = await conn.query('SELECT * FROM users WHERE id =?', [params.id]);
        if (result.length === 0) {
            return NextResponse.json({ message: "no existe el usuario" }, { status: 404 })
        }
        return NextResponse.json({result});
        return NextResponse.json({ message: "" });
    } catch (error) {
        return NextResponse.json({ message: "algo paso con el servidor o el url" }, { status: 500 })
    }
}

