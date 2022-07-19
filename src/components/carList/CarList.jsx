import React,{useState, useEffect} from 'react'
import { Car } from '../car/Car'
import './carlist.css'
import axios from 'axios'

export const CarList = ({show, setOpen, setId}) => {
    let token = localStorage.getItem('token')
    const [data, setData] = useState([ ])
    useEffect(()=>{
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_BASE_URL}/product/allproducts`,
            headers: {
                authorization: `Bearer ${token}`,
              },
          }).then((val)=>{
              setData(val.data.products)
              console.log(val.data)
            })
    },[])

    return (
        <>
        {show && (<div className="car-list">
        {
            data && (data.map((val,index)=>{
                let image = `${process.env.REACT_APP_BASE_URL}/product/car/images/${val.image}`
                {/* let image = "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" */}
                return(
                    <Car key={index} setOpen={setOpen} setId={setId} id={val._id} name={val.name.toUpperCase()} price={val.price.toUpperCase()} image={image}/>
                )
            }))
        }   
        </div>)}
        </>
    )
}
