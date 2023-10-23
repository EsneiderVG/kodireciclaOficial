import { NextResponse } from "next/server";
import { connectToDatabase } from '@/app/libs/mysql'

try {
    var conn = await connectToDatabase();    
} catch (error) {
    console.log("no se pudo conectar a la base de datos");
}


export async function GET() {
    const result = await conn.query('SELECT * FROM litter_bins ORDER BY id DESC');
    return NextResponse.json(result);
}

export async function POST(request) {
    try {
        // console.log(request);
        const { id_litter_bin_main, a_content, b_content, c_content, user_id, created_at, updated_at } = await request.json();
        // console.log(id_litter_bin_main,
        //     a_content,
        //     b_content,
        //     c_content,
        //     user_id,
        //     created_at,
        //     updated_at);

            
        const result = await conn.query("INSERT INTO litter_bins SET ?", {
            id_litter_bin_main,
            a_content,
            b_content,
            c_content,
            user_id,
            created_at,
            updated_at
        })
        if (result) {
            return NextResponse.json({ message: "se agrego correctamente" }, { status: 200 })
        }
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 })
    }


}