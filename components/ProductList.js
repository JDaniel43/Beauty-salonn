// import { data } from "@/public/data";
import { useEffect, useState } from 'react';
import Button from "./Button";
import axios from "axios";

export const ProductList = ({
	allProducts,
	setAllProducts,
	countProducts,
	setCountProducts,
	total,
	setTotal,
}) => {
	const [products, setProducts] = useState([]);

	const fetchProducts = async () => {
		try {
			const response = await axios.get('http://localhost:3000/api/productos');
			setProducts(response.data);
			console.log(response.data);
		} catch (error) {
			console.error('Error fetching products:', error);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	 	const onAddProduct = product => {
			if (allProducts.find(item => item.producto_id === product.producto_id)) {
 			const products = allProducts.map(item =>
 				item.producto_id === product.producto_id
 					? { ...item, cantidad: item.cantidad + 1 }
 					: item
 			);
 			setTotal(total + product.precio * product.cantidad);
 			setCountProducts(countProducts + product.cantidad);
 			return setAllProducts([...products]);
        
         }

         setTotal(total + product.precio * product.cantidad);
 		setCountProducts(countProducts + product.cantidad);
 		setAllProducts([...allProducts, product]);
 	};

	return (
		<div className='grid grid-cols-3 gap-10 mx-4 mb-4 mt-32'>
			{products.map(product => (
				<div className='shadow-pink-300 hover:shadow-sm bg-gray-300' key={product.producto_id}>
					<figure>
						<img
							className='rounded-lg shadow-red-300 hover:scale-105'
							src={product.imageUrl}
							alt={product.nombre}
						/>
					</figure>
					<div className='flex p-5 leading-4 flex-col gap-10'>
						<h2>{product.nombre}</h2>
						<p className='price'>${product.precio}</p>
						<Button onClick={() => onAddProduct(product)}>
							Añadir al carrito
						</Button>
					</div>
				</div>
			))}
		</div>
	);
};



// export const ProductList = ({
// 	allProducts,
// 	setAllProducts,
// 	countProducts,
// 	setCountProducts,
// 	total,
// 	setTotal,
// }) => {
// 	const onAddProduct = product => {
// 		if (allProducts.find(item => item.id === product.id)) {
// 			const products = allProducts.map(item =>
// 				item.id === product.id
// 					? { ...item, cantidad: item.cantidad + 1 }
// 					: item
// 			);
// 			setTotal(total + product.price * product.cantidad);
// 			setCountProducts(countProducts + product.cantidad);
// 			return setAllProducts([...products]);
        
//         }

//         setTotal(total + product.price * product.cantidad);
// 		setCountProducts(countProducts + product.cantidad);
// 		setAllProducts([...allProducts, product]);
// 	};

//     return (
// 		<div className='grid grid-cols-3 gap-10 mx-4 mb-4 mt-32'>
// 			{data.map(product => (
// 				<div className=' shadow-pink-300 hover:shadow-sm bg-gray-300' key={product.id}>
// 					<figure>
// 						<img className="rounded-lg shadow-red-300 hover:scale-105" src={product.img} alt={product.nameProduct} />
// 					</figure>
// 					<div className='flex p-5 leading-4 flex-col gap-10'>
// 						<h2>{product.nameProduct}</h2>
// 						<p className='price'>${product.price}</p>
// 						<Button onClick={() => onAddProduct(product)}>
// 							Añadir al carrito
// 						</Button>
// 					</div>
// 				</div>
// 			))}
// 		</div>
// 	);
// };