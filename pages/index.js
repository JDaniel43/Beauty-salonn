import {useState } from "react"
import { ProductList } from "@/components/ProductList"
import { Header } from "@/components/Header"
import Footer from "@/components/Footer";
export default function LoveMe(){
    const [allProducts, setAllProducts] = useState([]);
	const [total, setTotal] = useState(0);
	const [countProducts, setCountProducts] = useState(0);

return(
    <>
    <Header
            allProducts={allProducts}
            setAllProducts={setAllProducts}
            total={total}
            setTotal={setTotal}
            countProducts={countProducts}
            setCountProducts={setCountProducts}></Header>
    <ProductList
                allProducts={allProducts}
				setAllProducts={setAllProducts}
				total={total}
				setTotal={setTotal}
				countProducts={countProducts}
				setCountProducts={setCountProducts}></ProductList>
    <Footer></Footer>          
    </>
   
    
)
}