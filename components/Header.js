import { useState } from 'react';
import LoginButton from './login-btn';
import Button from './Button';
import Example from '@/components/DropMenue';
export const Header = ({
	allProducts,
	setAllProducts,
	total,
	countProducts,
	setCountProducts,
	setTotal,
}) => {
	const [active, setActive] = useState(false);

	const onDeleteProduct = product => {
		const results = allProducts.filter(
			item => item.id !== product.id
		);

		setTotal(total - product.price * product.quantity);
		setCountProducts(countProducts - product.quantity);
		setAllProducts(results);
	};

	const onCleanCart = () => {
		setAllProducts([]);
		setTotal(0);
		setCountProducts(0);
	};

	return (
		<header className='flex justify-between bg-rose-300 shadow-md py- px-4 h-20 sm:px-10 font-[sans-serif]  mb-2 fixed top-0 left-0 right-0 z-20'>
			<div className='flex  flex-wrap items-center '>
                <div className='flex text-center  '>
                    <a className="items-center text-4xl font-serif text-white p-2 hover:text-black hover:rounded-full hover:bg-neutral-100" href="http://localhost:3000/loveMe" >I LOVE ME BEAUTY SALON</a><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-100 self-center"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
				</div >
					
			</div>
			<div className='flex justify-start'>
				<p className=" text-white text-3xl  hover:text-black  font-serif  self-center" href="#" aria-current="page">Productos:</p>
				<Example></Example>
                <LoginButton></LoginButton>

				<div className='relative'>
					<div
						className='flex cursor-pointer text-white hover:rounded-full hover:text-black '
						onClick={() => setActive(!active)}
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth='1.5'
							stroke='currentColor'
							className='w-30 h-10 text-black hover:w-42 hover:h-12'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
							/>
						</svg>
						
							<div className='absolute top-6 left-3  bg-black text-white rounded-full px-1'>
								<span className='text-xl '>{countProducts}</span>
							</div>
						
						
					</div>

					<div
						className={`absolute bg-white  top-16 right-5 rounded-xl ${
							active ? '' : 'hidden'
						}`}
					>
						{allProducts.length ? (
							<>
								<div className='  px-4 border-solid border-2 border-black rounded-lg'>
									{allProducts.map(product => (
										<div className='flex items-center justify-between p-30 border-b-4 self-center' key={product.id}>
											<div className='flex justify-between '>
												<span className='font-normal text-xl px-2 self-center'>
													{product.quantity}
												</span>
												<p className='text-sm px-2 self-center'>
													{product.nameProduct}
												</p>
												<span className='text-xl ml-2.5 font-bold px-2 self-center'>
													${product.price}
												</span>
											</div>
                                            <svg className="h-5 w-5 text-black self-center cursor-pointer hover:scale-125" onClick={() => onDeleteProduct(product)} width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="18" y1="6" x2="6" y2="18" />  <line x1="6" y1="6" x2="18" y2="18" /></svg>
											 <svg
												xmlns='http://www.w3.org/2000/svg'
												fill='none'
												viewBox='0 0 24 24'
												strokeWidth='1.5'
												stroke='current'
												className='w-30 h-10 text-black cursor-pointer'
												
											>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													d='M6 18L18 6M6 6l12 12'
												/>
											</svg>
										</div>
									))}
								</div>

								<div className='flex justify-center text-xl items-center px-20 '>
									<h3>Total:</h3>
									<span className='text-xl font-black pb-1'>${total}</span>
								</div>
                                <Button className='' onClick={onCleanCart}>
									Comprar
								</Button>
                                
								<Button  onClick={onCleanCart}>
									Vaciar Carrito
								</Button>
							</>
						) : (
							<p className='px-20 text-center text-xl bg-rose-200 rounded-lg'>El carrito está vacío</p>
						)}
					</div>
				</div>
			</div>	
			
		</header>
	);
};