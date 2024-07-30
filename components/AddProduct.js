import React, { useState } from "react";
import DropTipoProductos from "./DropTipoProductos";
import axios from 'axios';

const AddProduct = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState(''); // Estado para el dropdown

    const handleCategoryChange = (event) => {
        setSelectedCategoryId(event.target.value);
    };

    const handleAddProduct = async () => {
        const productData = {
            "nombre": document.querySelector('input[name="name"]').value,
            "description": document.querySelector('input[name="description"]').value,
            "precio": parseFloat(document.querySelector('input[name="price"]').value),
            "stock": parseInt(document.querySelector('input[name="stock"]').value),
            "categoria_id": selectedCategoryId,
            "imageUrl": document.querySelector('input[name="imageUrl"]').value || null,
            "cantidad": 1
        };
    
        try {
            console.log('Product Data:', productData);
            const response = await axios.post('http://localhost:3000/api/productos', productData);
            setProducts(response.data);
            console.log('Response Data:', response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    
        setIsOpen(false); // Cerrar el modal después de añadir el producto
    };
    

    return (
        <>
            <button
                className="bg-black text-white text-3xl px-4 py-2 font-serif rounded-full hover:bg-white hover:text-black"
                onClick={() => setIsOpen(true)}
            >
                Add product
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
                    <div className="bg-white p-5 rounded flex flex-col justify-center items-center gap-5">
                        <button
                            className="items-center text-4xl font-serif text-black p-2 hover:text-black hover:rounded-full hover:bg-neutral-100"
                            onClick={() => setIsOpen(false)}
                        >
                            NAILS STORE
                        </button>
                        <div>
                            <label className="mr-3 font-semibold font-[Poppins]">Name:</label>
                            <input
                                type="text"
                                name="name"
                                className="w-64 px-4 border-2 border-gray-300 rounded-lg focus:outline-none"
                            />
                        </div>
                        <div>
                            <DropTipoProductos onChange={handleCategoryChange} />
                        </div>
                        <div>
                            <label className="mr-3 font-semibold font-[Poppins]">Descripcion:</label>
                            <input
                                type="text"
                                name="description"
                                className="w-64 px-4 border-2 border-gray-300 rounded-lg focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="mr-3 font-semibold font-[Poppins]">Precio:</label>
                            <input
                                type="number"
                                name="price"
                                className="w-64 px-4 border-2 border-gray-300 rounded-lg focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="mr-3 font-semibold font-[Poppins]">Stock:</label>
                            <input
                                type="number"
                                name="stock"
                                className="w-64 px-4 border-2 border-gray-300 rounded-lg focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="mr-3 font-semibold font-[Poppins]">Image URL:</label>
                            <input
                                type="text"
                                name="imageUrl"
                                className="w-64 px-4 border-2 border-gray-300 rounded-lg focus:outline-none"
                            />
                        </div>
                        <div className="">
                            <button
                                className="bg-red-500 text-white text-3xl px-4 py-2 mx-6 font-serif rounded-full hover:bg-red hover:text-black"
                                onClick={() => setIsOpen(false)}
                            >
                                Cerrar
                            </button>
                            <button
                                className="bg-green-500 text-white text-3xl px-4 py-2 font-serif rounded-full hover:bg-green hover:text-black"
                                onClick={handleAddProduct}
                            >
                                Add Product
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddProduct;


// import React, { useState } from "react";
// import DropTipoProductos from "./DropTipoProductos";



   
// const AddProduct = () => {
//     const [isOpen, setIsOpen]= useState(false);
//     return (
   
//     <>
//       <button className="bg-black text-white text-3xl px-4 py-2  font-serif rounded-full hover:bg-white hover:text-black" onClick={() => setIsOpen(true)}>Add product</button>

//       {
//         isOpen && ( 
//             <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
                
//                    <div className="bg-white p-5 rounded flex flex-col justify-center items-center gap-5">
//                    <button
// 						className="items-center text-4xl font-serif text-black p-2 hover:text-black hover:rounded-full hover:bg-neutral-100"onClick={()=>setIsOpen(false)}>
// 						NAILS STORE
//                     </button>
//                        <div>
//                            <label className="mr-3 font-semibold font-[Poppins]">Name:</label>
//                            <input type="text" className="w-64 px-4 border-2 border-gray-300 rounded-lg focus_outline-none"></input>
                           
//                        </div>
//                        <div>
                          
//                            <DropTipoProductos onChange={handleCategoryChange}></DropTipoProductos>
                           
//                        </div>
//                        <div>
//                            <label className="mr-3 font-semibold font-[Poppins]">Descripcion:</label>
//                            <input type="text" className="w-64 px-4 border-2 border-gray-300 rounded-lg focus_outline-none"></input>
                           
//                        </div>
//                        <div>
//                            <label className="mr-3 font-semibold font-[Poppins]">Precio:</label>
//                            <input type="float" className="w-64 px-4 border-2 border-gray-300 rounded-lg focus_outline-none"></input>
                           
//                        </div>
//                        <div>
//                            <label className="mr-3 font-semibold font-[Poppins]">Stock:</label>
//                            <input type="int" className="w-64 px-4 border-2 border-gray-300 rounded-lg focus_outline-none"></input>
                           
//                        </div>
//                         <div className="">
//                             <button className="bg-red-500 text-white text-3xl px-4 py-2 mx-6  font-serif rounded-full hover:bg-red hover:text-black" onClick={()=>setIsOpen(false)}>Cerrar</button>
//                             <button className="bg-green-500 text-white text-3xl px-4 py-2  font-serif rounded-full hover:bg-green hover:text-black">Add Product</button>
//                         </div>
//                    </div>
//                </div>

//         )
//       }
               

//     </>           
//     );
//   };

//   export default AddProduct;





// export default function AddProduct(){
//     return(
//         <>
//         <button className="bg-rose-300 hover:bg-black text-2xl w-full text-white font-bold py-1 px-4 rounded-full mb-1">HOLA</button>
//         <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
//             <div className="bg-white p-5 rounded flex flex-col justify-center items-center gap-5">
//                 <div>
//                     <label className="mr-3 font-semibold font-[Poppins]">Name:</label>
//                     <input type="text" className="w-64 px-4 border-2 border-gray-300 rounded-lg focus_outline-none"></input>
//                 </div>

//             </div>
//         </div>    
//         </>
//     );
// }
