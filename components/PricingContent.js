// components/PricingContent.js
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { CategoryContext } from '../context/CategoryContext';

const PricingContent = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setCategoryId } = useContext(CategoryContext);

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

  const handleCategoryClick = (categoryId) => {
    setCategoryId(categoryId);
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



