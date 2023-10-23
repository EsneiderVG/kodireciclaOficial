import { NextResponse } from "next/server";
import { connectToDatabase } from '@/app/libs/mysql'

try {
    var conn = await connectToDatabase();    
} catch (error) {
    console.log("no se pudo conectar a la base de datos");
}


try {
    var conn = await connectToDatabase();
} catch (error) {
    console.log("no se pudo conectar a la base de datos");
}

export async function GET(request, { params }) {
    console.log(params);
    // console.log(params.email)
    try {
        const result = await conn.query('SELECT * FROM litter_bins_main WHERE cod_litter_bins =?', [params.id]);
        if (result.length === 0) {
            return NextResponse.json({ message: "no existe la papelera" }, { status: 404 })
        }
        return NextResponse.json(result);
        return NextResponse.json({ message: "" });
    } catch (error) {
        return NextResponse.json({ message: "algo paso con el servidor o el url" }, { status: 500 })
    }
}


export async function PUT(request, { params }) {

    try {
        const data = await request.json();
        const result = await conn.query('UPDATE litter_bins_main SET a_status = ?, b_status = ?, c_status = ?, user_id = ? WHERE id = ?', [data.a_status, data.b_status, data.c_status, data.user_id, params.id]);

        if (result.affectedRows === 0) {
            return NextResponse.json({
                message: "Producto no encontrado"
            },
                { status: 404 }
            )
        };

        const uddatedPapeleryMain = await conn.query("SELECT * FROM litter_bins_main WHERE id = ?", [params.id]
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