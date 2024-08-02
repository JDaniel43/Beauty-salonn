import { useState, useEffect } from 'react';
import axios from 'axios';

const DropTipoProductos = ({ onChange }) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/tipoProductos');
                setCategories(response.data);
            } catch (error) {
                console.error('Error al obtener las categorías:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleChange = (event) => {
        setSelectedCategory(event.target.value);
        onChange(event); // Pasa el evento hacia arriba
    };

    return (
        <div>
            <label className="mr-3 font-semibold font-[Poppins]">Categoría:</label>
            <select
                value={selectedCategory}
                onChange={handleChange}
                className="w-64 px-4 border-2 border-gray-300 rounded-lg focus:outline-none"
            >
                 <option value="">Seleccione una categoría</option> 
                {categories.map(category => (
                    <option key={category.categoria_id} value={category.categoria_id}>
                        {category.nombre}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default DropTipoProductos;