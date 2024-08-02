import { poolPromise } from '../../libs/db';
import sql from 'mssql';

export default async function handler(req, res) {
  const pool = await poolPromise;

  switch (req.method) {
    case 'GET':
      try {
        const category = req.query.category || '';
        let query = 'SELECT TOP 6 * FROM Producto';
        console.log(category)
        if (category) {
          query += ' WHERE categoria_id = @category';
        }

        const request = pool.request();
        if (category) {
          request.input('category', sql.Int, parseInt(category));
        }

        const result = await request.query(query);
        res.status(200).json(result.recordset);
      } catch (err) {
        console.error('SQL error', err);
        res.status(500).send(err.message);
      }
      break;

    case 'POST':
      const { nombre, description, precio, stock, categoria_id, imageUrl, cantidad } = req.body;
      try {
        const result = await pool.request()
          .input('nombre', sql.NVarChar, nombre)
          .input('description', sql.NVarChar, description)
          .input('precio', sql.Decimal, precio)
          .input('stock', sql.Int, stock)
          .input('categoria_id', sql.Int, categoria_id)
          .input('imageUrl', sql.NVarChar, imageUrl)
          .input('cantidad', sql.Int, cantidad)
          .query`
            INSERT INTO Producto (nombre, description, precio, stock, categoria_id, imageUrl, cantidad)
            VALUES (@nombre, @description, @precio, @stock, @categoria_id, @imageUrl, @cantidad)
          `;
        res.status(201).json({ message: 'Data inserted successfully', result });
      } catch (err) {
        console.error('SQL error', err);
        res.status(500).json({ error: 'Server error' });
      }
      break;

    case 'PUT':
      const { producto_id, nombre: updateNombre, description: updatedescription, precio: updatePrecio, stock: updateStock, categoria_id: updateCategoriaId, imageUrl: updateImageUrl } = req.body;
      try {
        const result = await pool.request()
          .input('producto_id', sql.Int, producto_id)
          .input('nombre', sql.NVarChar, updateNombre)
          .input('description', sql.NVarChar, updatedescription)
          .input('precio', sql.Decimal, updatePrecio)
          .input('stock', sql.Int, updateStock)
          .input('categoria_id', sql.Int, updateCategoriaId)
          .input('imageUrl', sql.NVarChar, updateImageUrl)
          .query`
            UPDATE Producto
            SET nombre = @nombre, description = @description, precio = @precio, stock = @stock, categoria_id = @categoria_id, imageUrl = @imageUrl
            WHERE producto_id = @producto_id
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
        const result = await pool.request()
          .input('producto_id', sql.Int, deleteId)
          .query`
            DELETE FROM Producto
            WHERE producto_id = @producto_id
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

