import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router'; // Asegúrate de tener esta importación

const PricingContent = ({ setProducts }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter(); // Inicializa el hook de enrutador

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/tipoProductos');
        setCategories(response.data);
      } catch (err) {
        setError(err.message || 'Error fetching categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = async (categoryId) => {
    try {
      const response = await axios.get(`/api/productos?category=${categoryId}`);
    //   setProducts(response.data); // Actualiza el estado de productos
      
      console.log(response.data);// O redirige a una página de productos filtrados si tienes una
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-64 bg-white p-6 shadow-xl">
      {categories.length > 0 ? (
        <div>
          <h3 className="font-semibold">Categories</h3>
          <ul>
            {categories.map(category => (
              <li key={category.categoria_id} className="mb-2">
                <button
                  onClick={() => handleCategoryClick(category.categoria_id)}
                  className="block text-sm hover:underline"
                >
                  {category.nombre}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>No categories available</div>
      )}
    </div>
  );
};

export default PricingContent;


