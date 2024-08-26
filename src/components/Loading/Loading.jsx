import React from 'react'
import styles from "./Loading.module.css"
import { Hearts, MutatingDots } from 'react-loader-spinner'
export default function Loading() {
return (
    <>
    <div className='h-screen flex justify-center items-center bg-white'>
    <Hearts
        height="80"
        width="80"
        color="#ff0800 "
        ariaLabel="hearts-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        />
    </div>
    </>
)
}
