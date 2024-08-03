// import { data } from "@/public/data";
import { useEffect, useState,useContext } from 'react';
import Button from "./Button";
import axios from "axios";
import DropTipoProductos from "./DropTipoProductos";
import { CategoryContext } from '../context/CategoryContext';
import { useSession } from 'next-auth/react'; // Usa useSession directamente

export const ProductList = ({
  allProducts,
  setAllProducts,
  countProducts,
  setCountProducts,
  total,
  setTotal,
}) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(''); // Estado para la categoría seleccionada
  const { categoryId } = useContext(CategoryContext);
  const { data: session } = useSession(); // Obtén la sesión directamente desde useSession
  const isSpecificUser = session?.user?.email === 'jd.rdgzmata@gmail.com';
  const [formData, setFormData] = useState({
    producto_id: '',
    name: '',
    description: '',
    price: '',
    stock: '',
    imageUrl: '',
    category: '',
  });

  const fetchProducts = async () => {
    try {
      // Modifica la URL para incluir el parámetro de categoría
      const response = await axios.get(`http://localhost:3000/api/productos?category=${categoryId}`);
      console.log(response.data);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [categoryId]); // Agrega selectedCategoryId como dependencia

  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        producto_id: selectedProduct.producto_id || '',
        name: selectedProduct.nombre || '',
        description: selectedProduct.description || '',
        price: selectedProduct.precio || '',
        stock: selectedProduct.stock || '',
        imageUrl: selectedProduct.imageUrl || '',
        category: selectedProduct.category || '',
      });
    }
  }, [selectedProduct]);

  const onAddProduct = (product) => {
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

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsOpen(false);
  };

  const openModalEdit = (product) => {
    setSelectedProduct(product);
    setIsOpenModal(true);
  };

  const closeModalEdit = () => {
    setSelectedProduct(null);
    setIsOpenModal(false);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategoryId(event.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? URL.createObjectURL(files[0]) : value,
    }));
  };

  const handleAddProduct = async () => {
    const producto_id = selectedProduct.producto_id;
    const nombre = document.querySelector('input[name="name"]').value;
    const description = document.querySelector('input[name="description"]').value;
    const precio = parseFloat(document.querySelector('input[name="price"]').value);
    const stock = parseInt(document.querySelector('input[name="stock"]').value);
    const categoria_id = selectedCategoryId;
    const imageUrl = document.querySelector('input[name="imageUrl"]').value;

    if (nombre === '' || description === '' || precio === '' || stock === '' || categoria_id === '') {
      alert('Todos los campos son Obligatorios');
      return;
    }

    const productData = {
      producto_id: producto_id,
      nombre: nombre,
      description: description,
      precio: precio,
      stock: stock,
      categoria_id: categoria_id,
      imageUrl: imageUrl,
      cantidad: 1
    };

    if (nombre !== '' && description !== '' && precio !== '' && stock !== '' && categoria_id !== '') {
      try {
        console.log('Product Data:', productData);
        const response = await axios.put('http://localhost:3000/api/productos', productData);
        setProducts(response.data);
        console.log('Response Data:', response.data);
      } catch (error) {
        console.error('Error updating product:', error);
      }
      window.location.reload();
    }
  };

  return (
    <>
    <div className='  '>
      <img className='object-cover w-screen pt-32 px-32 pb-6' src='https://res.cloudinary.com/dceub7xcn/image/upload/v1722661403/gefckafpeay4bwgdcdh4.jpg'></img>
      
    </div>
      <div className='grid grid-cols-3 gap-10 mx-4 mb-16 px-32'>
        
        {products.map(product => (
          <div className='shadow-pink-300 hover:shadow-sm bg-gray-300 pt-4' key={product.producto_id}>
            <figure className='grid justify-items-center'>
              <img
                className='rounded-lg shadow-red-300 hover:scale-105 w-60 h-60'
                src={product.imageUrl}
                alt={product.nombre}
              />
            </figure>
            <div className='flex p-5 leading-4 flex-col gap-10'>
              <h2 className='text-4xl font-semibold text-center'>{product.nombre}</h2>
              <p className='price text-5xl text-center'>${product.precio}</p>

              {isSpecificUser && (
                <Button onClick={() => openModalEdit(product)}>
                  Editar producto
                </Button>)
              }
              <Button onClick={() => openModal(product)}>
                Ver descripcion
              </Button>
              <Button onClick={() => onAddProduct(product)}>
                Añadir al carrito
              </Button>
            </div>
          </div>
        ))}
      </div>

      {isOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center mt-16 pt- rounded-lg">
          <div className="bg-white p-5 rounded-lg flex flex-col justify-center items-center gap-5">
            <div className='shadow-pink-300 hover:shadow-sm bg-gray-300 pt-4' key={selectedProduct.producto_id}>
              <figure>
                <h6 className='text-4xl font-semibold text-center'>{selectedProduct.nombre}</h6>
                <img
                  className='mt-4 rounded-lg shadow-red-300 hover:scale-105 object-scale-down h-48 w-96 rounded-sm'
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.nombre}
                />
              </figure>
              <div className='p-5 leading-4 flex-col gap-10 text-center'>
                <h2 className='text-2xl font-medium'>{selectedProduct.description}</h2>
                <label className='text-2xl font-medium'>Stock:</label>
                <h2 className='text-xl font-medium'>{selectedProduct.stock}</h2>
                <p className='price text-3xl font-medium'>${selectedProduct.precio}</p>
              </div>
            </div>
            <div className="">
              <Button className="" onClick={() => onAddProduct(selectedProduct)}>
                Añadir al carrito
              </Button>
              <button className="bg-red-500 hover:bg-black text-2xl w-full text-white font-bold py-1 px-4 rounded-full mt-4" onClick={closeModal}>
                cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {isOpenModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-white p-5 rounded flex flex-col justify-center items-center gap-5">
            <button
              className="items-center text-4xl font-serif text-black p-2 hover:text-black hover:rounded-full hover:bg-neutral-100"
              onClick={closeModalEdit}
            >
              Editar Producto
            </button>
            <div>
              <label className="mr-3 font-semibold font-[Poppins]">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-64 px-4 border-2 border-gray-300 rounded-lg focus:outline-none"
              />
            </div>
            <div>
              <DropTipoProductos
                selectedCategory={selectedCategoryId}
                onChange={handleCategoryChange}
              />
            </div>
            <div>
              <label className="mr-3 font-semibold font-[Poppins]">Descripcion:</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-64 px-4 border-2 border-gray-300 rounded-lg focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="mr-3 font-semibold font-[Poppins]">Precio:</label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-64 px-4 border-2 border-gray-300 rounded-lg focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="mr-3 font-semibold font-[Poppins]">Stock:</label>
              <input
                type="text"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                className="w-64 px-4 border-2 border-gray-300 rounded-lg focus:outline-none"
                required
              />
              <p className='text-red-500'>si quieres eliminar el producto de la pagina pon 0 en stock</p>
            </div>
            <div>
              <label className="mr-3 font-semibold font-[Poppins]">Image URL:</label>
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                className="w-64 px-4 border-2 border-gray-300 rounded-lg focus:outline-none"
                required
              />
            </div>
            <div className="">
              <button
                className="bg-red-500 text-white text-3xl px-4 py-2 mx-6 font-serif rounded-full hover:bg-red hover:text-black"
                onClick={() => closeModalEdit(false)}
              >
                Cerrar
              </button>
              <button
                className="bg-green-500 text-white text-3xl px-4 py-2 font-serif rounded-full hover:bg-green hover:text-black"
                onClick={handleAddProduct}
              >
                Editar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
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