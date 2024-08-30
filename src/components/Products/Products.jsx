
import styles from "./Products.module.css"
import axios from 'axios'
import { useQuery } from 'react-query'
import Loading from '../Loading/Loading'
import { Helmet } from "react-helmet"
import { Link } from "react-router-dom"
import { cartContext } from "../Context/CartContext"
import { useContext, useState } from "react"
import toast from "react-hot-toast"
import IconWishlist from "../IconWishlist/IconWishlist"
export default function Products() {
    const [Products, setProducts] = useState(null) 
    const {addProduct} = useContext(cartContext)
    
    async function handelAddProduct(id){
        const resFlag = await addProduct(id)
        if(resFlag){
            toast.success("Add Product Successfully" , {
                duration:2000
            })
        }else{
            toast.error("Add Product Error", {
                duration:2000
            })
        }
    }
    function getProducts() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    }
    const {data , isLoading , isError , error } = useQuery({
        queryKey:"allProduct",
        queryFn:getProducts,
        staleTime:60000 * 3
    })
    if(isLoading){
        return <Loading/>
    }
    if(isError){
        return <>
        <h2>{error}</h2>
        </>
    }
    
    
return (
    <>
        <Helmet>
                    <title>Products</title>
        </Helmet>
   <div className="mb-6">
  <label htmlFor="large-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Search by product Name</label>
  <input  onInput={(e)=>{
                    console.log(e.target.value);
                    if(e.target.value !== ""){
                    setProducts(data.data.data.filter((x)=>x.title.toLowerCase().includes(e.target.value.toLowerCase())))
                    console.log(Products);
                    }else{
                        setProducts(null)
                    }
                    
                    
                }} type="text" id="large-input" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

</div>


        <div className='grid md:grid-cols-3 lg:grid-cols-5 gap-y-5 gap-x-2'>

        { Products==null ? data.data.data.map((proudct)=>
            <div key={proudct._id} className='product p-2 group overflow-hidden border rounded-lg group:'>
                <div className=' relative'>
                    <img src={proudct.imageCover} alt={proudct.title} className='w-full ' />
                    <IconWishlist   id={proudct._id} data={data}/>
                </div>
                <Link to={`/ProductDetails/${proudct._id}`}>
                <h6 className='text-cyan-400 mt-2'>{proudct.category.name}</h6>
                <p>{proudct.title.split(" ").slice(0,2).join(" ")}</p>
                </Link>
                <div className='flex items-center justify-between'>
                    <p className='mt-2'><span>EGP</span> {proudct.price} </p>
                    <p className="">{proudct.ratingsAverage} <i className='fa-solid fa-star text-yellow-300'></i></p>
                </div>
                <div onClick={()=>handelAddProduct(proudct._id)} className="  btn rounded-lg p-2 text-center w-36 mx-auto translate-y-[200%] group-hover:translate-y-0 transition-all duration-500 cursor-pointer">Add to Cart</div>
            </div>
            
        ):Products.map((proudct)=>
            <div key={proudct._id} className='product p-2 group overflow-hidden border rounded-lg group:'>
                <div className=' relative'>
                    <img src={proudct.imageCover} alt={proudct.title} className='w-full ' />
                    <IconWishlist   id={proudct._id} />
                </div>
                <Link to={`/ProductDetails/${proudct._id}`}>
                <h6 className='text-cyan-400 mt-2'>{proudct.category.name}</h6>
                <p>{proudct.title.split(" ").slice(0,2).join(" ")}</p>
                </Link>
                <div className='flex items-center justify-between'>
                    <p className='mt-2'><span>EGP</span> {proudct.price} </p>
                    <p className="">{proudct.ratingsAverage} <i className='fa-solid fa-star text-yellow-300'></i></p>
                </div>
                <div onClick={()=>handelAddProduct(proudct._id)} className="  btn rounded-lg p-2 text-center w-36 mx-auto translate-y-[200%] group-hover:translate-y-0 transition-all duration-500 cursor-pointer">Add to Cart</div>
            </div>
            
        )}
    </div>
    </>
)
}
