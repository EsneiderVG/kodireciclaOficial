import { NextResponse } from "next/server";
import { connectToDatabase } from '@/app/libs/mysql'

try {
    var conn = await connectToDatabase();    
} catch (error) {
    console.log("no se pudo conectar a la base de datos");
}



export async function GET() {
    try {
        const result = await conn.query('SELECT * FROM type_status');
        if(result){
            return NextResponse.json(result);
        }
    } catch (error) {
        // console.log(error.message);
        return NextResponse.json(error);
    }
    
}