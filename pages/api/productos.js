import { poolPromise } from '../../libs/db';

export default async function handler(req, res) {
  
  const pool = await poolPromise;

    switch (req.method) {
      case 'GET':
        try {
          const result = await pool.request().query('select top 6  * from Producto');
          res.status(200).json(result.recordset);
        } catch (err) {
          res.status(500).send(err.message);
        }
        break;

        case 'POST':
      const { nombre, description, precio, stock, categoria_id,  imageUrl,cantidad } = req.body;
      try {
        const result = await pool.request().query`
          INSERT INTO Producto (nombre, description, precio, stock, categoria_id, imageUrl,cantidad)
          VALUES (${nombre}, ${description}, ${precio}, ${stock}, ${categoria_id}, ${imageUrl},${cantidad})
        `;
        res.status(201).json({ message: 'Data inserted successfully', result });
      } catch (err) {
        console.error('SQL error', err);
        res.status(500).json({ error: 'Server error' });
      }
      break;

      case 'PUT':
      const { producto_id:id, nombre: updateNombre, description: updatedescription, precio: updatePrecio, stock: updateStock, categoria_id: updateCategoriaId,  imageUrl: updateImageUrl } = req.body;
      try {
        const result = await pool.request().query`
          UPDATE Producto
          SET nombre = ${updateNombre},  description = ${updatedescription}, precio = ${updatePrecio}, stock = ${updateStock}, categoria_id = ${updateCategoriaId}, imageUrl = ${updateImageUrl}
          WHERE producto_id = ${id}
        `;
        res.status(200).json({ message: 'Data updated successfully', result });
      } catch (err) {
        console.error('SQL error', err);
        res.status(500).json({ error: 'Server error' });
      }
      break;

      case 'DELETE':
      const { id: deleteId } = req.body;
      try {
        const result = await pool.request().query`
          DELETE FROM Producto
          WHERE id = ${deleteId}
        `;
        res.status(200).json({ message: 'Data deleted successfully', result });
      } catch (err) {
        console.error('SQL error', err);
        res.status(500).json({ error: 'Server error' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
    
  }
    
}




// const pool = await poolPromise;
//     const result = await pool.request().query('select * from Producto');
//     res.status(200).json(result.recordset);
//   } catch (err) {
//     res.status(500).send(err.message);
//   }

