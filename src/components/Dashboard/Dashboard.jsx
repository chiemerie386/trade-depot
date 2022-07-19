// import React from 'react'
import React,{useState, useEffect} from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from '../Header/Header';
import { CarList } from '../carList/CarList';
import { AddCar } from '../form/AddCar';
import { Comment } from '../comment/Comment';

export const Dashboard = () => {
    const [visible, setVisible] = useState(false)
    const [open, setOpen] = useState(false)
    const [id, setId] = useState('')
    return (
        <div>
        <Header/>
      <CarList setOpen={setOpen} setId={setId} show={!visible}/>
      <AddCar show={visible} setShow={setVisible}/>
      <Comment open={open} setOpen={setOpen} setId={setId} id={id} />
      <button className="add-car" onClick={()=>setVisible(!visible)}> Add Product</button>
        </div>
    )
}
