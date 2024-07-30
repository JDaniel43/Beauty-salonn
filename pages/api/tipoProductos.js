import { poolPromise } from '../../libs/db';

export default async function handler(req, res){
    const pool = await poolPromise;
    if (req.method === 'GET') {
        try {
            
            const result = await pool.request().query('select * from Tipo_Producto'); // Ajusta la consulta según tu tabla
            res.status(200).json(result.recordset);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener las categorías' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
