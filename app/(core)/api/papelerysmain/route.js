import { NextResponse } from "next/server";
import { connectToDatabase } from '@/app/libs/mysql'

try {
    var conn = await connectToDatabase();    
} catch (error) {
    console.log("no se pudo conectar a la base de datos");
}


export async function GET() {
    try {
        const result = await conn.query('SELECT * FROM litter_bins_main ORDER BY id DESC');
        if(result){
            return NextResponse.json(result);
        }
    } catch (error) {
        // console.log(error.message);
        return NextResponse.json(error);
    }
    
}

export async function POST(request){
    const {cod_litter_bins, created_at, updated_at} = await request.json();
    console.log(cod_litter_bins)
    await conn.query("INSERT INTO litter_bins_main SET ?", {
        cod_litter_bins: cod_litter_bins,
        created_at: created_at,
        updated_at: updated_at
    })

    return NextResponse.json({message: "creado con exito"},{status:200})
}

