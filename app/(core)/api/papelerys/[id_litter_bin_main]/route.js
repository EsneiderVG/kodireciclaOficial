import { NextResponse } from "next/server";
import { connectToDatabase } from '@/app/libs/mysql'

try {
    var conn = await connectToDatabase();    
} catch (error) {
    console.log("no se pudo conectar a la base de datos");
}


export async function GET(request, { params }) {
    // console.log(params);
    try {
        const result = await conn.query('SELECT * FROM litter_bins WHERE id_litter_bin_main =?', [params.id_litter_bin_main]);
        if (result.length === 0) {
            return NextResponse.json({ message: "no existe el usuario" }, { status: 404 })
        }
        return NextResponse.json({ result });
        return NextResponse.json({ message: "" });
    } catch (error) {
        return NextResponse.json({ message: "algo paso con el servidor o el url" }, { status: 500 })
    }
}





export async function PUT(request, { params }) {

    try {
        const data = await request.json();
        const result = await conn.query('UPDATE litter_bins SET a_content = ?, b_content = ?, c_content = ?, user_id = ?, updated_at = ? WHERE id = ?', [data.a_content, data.b_content, data.c_content, data.user_id, data.updated_at, params.id]);

        if (result.affectedRows === 0) {
            return NextResponse.json({
                message: "Producto no encontrado"
            },
                { status: 404 }
            )
        };

        const uddatedPapeleryMain = await conn.query("SELECT * FROM litter_bins WHERE id = ?", [params.id]
        );
        return NextResponse.json(uddatedPapeleryMain[0])
    } catch (error) {
        return NextResponse.json(
            {
                message: error.message,
            },
            {
                status: 500
            }
        );
    }

}