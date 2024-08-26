import React, { useContext,  useState} from 'react'
import styles from "./Cart.module.css"
import { initFlowbite } from 'flowbite';
import { cartContext } from '../Context/CartContext'
import toast from 'react-hot-toast'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import cart from "../../assets/shopping-cart.png"
export default function Cart() {
    const {products ,  totalCartPrice , updateCount , deleteCartItem , clearCart , numberOfCartItems} = useContext(cartContext)
    async function handelDeleteItem(id){
        const resFlage = await deleteCartItem(id)
        
        
        if(resFlage){
            toast.error("Can't delete product")
        }else{
            toast.success("Delete Product Successfully")
        }
    }
return (
    <>
    <Helmet>
                    <title>Cart</title>
    </Helmet>
    {numberOfCartItems==0?<>
    <div className='  py-28'> 
        <div className='flex justify-center items-center'>
            <div className='text-center'>
                <p className='text-2xl font-bold mb-6'>Your Shopping Cart Looks Empty .</p>
                <Link to={"/Products"} className='btn p-2 text-2xl'>Check Our Products</Link>
            </div>
        
        <img src={cart} alt="cart" className='w-[300px]' />
        </div>
    </div>
    </>:<>
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 relative">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className='text-cyan-400 text-lg'>
                <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                Product
                </th>
                <th scope="col" className="px-6 py-3">
                Qty
                </th>
                <th scope="col" className="px-6 py-3">
                Price
                </th>
                <th scope="col" className="px-6 py-3">
                Total Price
                </th>
                <th scope="col" className="px-6 py-3">
                Action
                </th>
            </tr>
            </thead>
            <tbody>
                {products?.map((product)=><tr key={product.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="p-4">
                    <img src={product?.product?.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product?.product.title} />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product?.product.title}
                    </td>
                    <td className="px-6 py-4">
                    <div className="flex items-center">
                        {product.count === 1 ? <div onClick={()=>handelDeleteItem(product.product._id)} className=' cursor-pointer inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'><i className="fa-solid fa-trash-can text-cyan-400 text-xs"></i></div>   :
                        <button onClick={()=>updateCount(product.product._id , product.count-1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                        <span className="sr-only">Quantity button</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                        </svg>
                        </button>}
                        
                        <div>
                        <input onChange={(e)=>updateCount(product.product._id , e.target.value)} type="number" id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500" placeholder={product?.count} required />
                        </div>
                        <button onClick={()=>updateCount(product.product._id , product.count+1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                        <span className="sr-only">Quantity button</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                        </svg>
                        </button>
                    </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product?.price}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product?.price * product?.count}
                    </td>
                    <td className="px-6 py-4">
                    <button onClick={()=>handelDeleteItem(product.product._id)} className="font-medium text-cyan-400  hover:underline">Remove</button>
                    </td>
                </tr> )}
                
            </tbody>
        </table>
        <div className=' mt-5 mb-3 mr-3'><button onClick={()=>clearCart()} className='btn p-2 ml-auto block'>Clear Cart</button></div>
        </div>
        <div className='w-1/3 mt-14 relative pb-20'>
            <h2 className='text-3xl font-bold text-cyan-400 mb-4'>Cart Total</h2>
            <div className='flex items-center justify-between text-lg mb-2 pb-2 border-b-2'><span>SubTotal</span><span>{totalCartPrice} EGP</span></div>
            <div className='flex items-center justify-between text-lg mb-2 pb-2 border-b-2'><span>Shipping Fee</span><span>Free</span></div>
            <div className='flex items-center justify-between text-lg pb-2 font-bold'><span>Total</span><span></span>{totalCartPrice} EGP</div>
            <div className='ml-auto block mt-5 absolute  right-0 bottom-4'>
            <div className='flex items-center justify-between'>
            
            {/* <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown"  className="text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800" type="button">Checkout <svg classnName="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="{2}" d="m1 1 4 4 4-4" />
                </svg>
            </button>

            <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                <li>
                    <Link to={"/Payment"} state={{method:"Online Payment"}} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Online Payment</Link>
                </li>
                <li>
                    <Link to={"/Payment"} state={{method:"Cash On Delivery"}} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Cash Payment</Link>
                </li>
                </ul>
            </div> */}
            <Link to={"/Payment"} state={{method:"Online Payment"}} className="btn w-5/12 text-center  text-sm px-4 py-2 ">Online Payment</Link>
            <Link to={"/Payment"} state={{method:"Cash On Delivery"}} className="btn w-5/12  text-center text-sm px-4 py-2">Cash Payment</Link>
            </div>

            </div>
        </div>
    </>}
    </>
)
}
