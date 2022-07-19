import React, {useState} from 'react'
import './car.css'
import { AiOutlineComment } from "react-icons/ai";
import axios from 'axios'

export const Car = (props) => {
    
    function setcommentAction (){
        props.setId(props.id)
        props.setOpen(true)
    }

    return (
        <div className="car-card">
           <img className="car-image" src={props.image}/>
            <div className="car-description">
                <div className="car-name">{props.name}</div>
                <div className="car-price">{props.price}</div>
                
            </div>
            
            <div className="delete-button" onClick={()=>{setcommentAction()}}>
                <AiOutlineComment/>
            </div>
        </div>
    )
}
