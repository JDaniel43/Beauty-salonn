import { data } from "@/public/data";
import Button from "./Button";
export const ProductList = ({
	allProducts,
	setAllProducts,
	countProducts,
	setCountProducts,
	total,
	setTotal,
}) => {
	const onAddProduct = product => {
		if (allProducts.find(item => item.id === product.id)) {
			const products = allProducts.map(item =>
				item.id === product.id
					? { ...item, quantity: item.quantity + 1 }
					: item
			);
			setTotal(total + product.price * product.quantity);
			setCountProducts(countProducts + product.quantity);
			return setAllProducts([...products]);
        
        }

        setTotal(total + product.price * product.quantity);
		setCountProducts(countProducts + product.quantity);
		setAllProducts([...allProducts, product]);
	};

    return (
		<div className='grid grid-cols-3 gap-10 mx-4 mb-4 mt-32'>
			{data.map(product => (
				<div className=' shadow-pink-300 hover:shadow-sm bg-gray-300' key={product.id}>
					<figure>
						<img className="rounded-lg shadow-red-300 hover:scale-105" src={product.img} alt={product.nameProduct} />
					</figure>
					<div className='flex p-5 leading-4 flex-col gap-10'>
						<h2>{product.nameProduct}</h2>
						<p className='price'>${product.price}</p>
						<Button onClick={() => onAddProduct(product)}>
							Añadir al carrito
						</Button>
					</div>
				</div>
			))}
		</div>
	);
};