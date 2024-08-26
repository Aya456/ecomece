import React from 'react'
import style from "./NotFound.module.css"
import Error from "../../assets/error.svg"
export default function NotFound() {
    return (
        <>
        <img src={Error} alt="error" className='w-full' />
        </>
    )
}
