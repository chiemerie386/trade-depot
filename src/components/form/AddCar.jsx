import React, {useState} from 'react'
import './addcar.css'
import axios from 'axios'
import Autocomplete from "react-google-autocomplete";

async function postData({image, name, radius, address, price, coord}) {
    let token = localStorage.getItem('token')
    const formData = new FormData();
    formData.append("image", image)
    formData.append("name", name)
    formData.append("address", address)
    formData.append("price", price)
    formData.append("radius", radius)
    formData.append("long", coord.lng)
    formData.append("lat", coord.lat)
  
    const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/product/addproduct`, formData, { headers: {'Content-Type': 'multipart/form-data', authorization: `Bearer ${token}`}})
    console.log(result)
    window.location.reload()
    return result.data
  }

export const AddCar = ({show, setShow}) => {
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [price, setPrice] = useState('')
    const [radius, setRadius] = useState('')
    const [file, setFile] = useState()
    const [coord, setCoord] = useState()

    async function addNewCar () {
        // let details= {name,company,price,year}
        const result = await postData({image: file, name, radius, address,price, coord})
        setShow(false)
        console.log(result)
    }

    const fileSelected = event => {
        const file = event.target.files[0]
        setFile(file)
    }

    async function getCoordinate (address) {

        try{
            setAddress(address)
            const result = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
                params:{
                    address,
                    key:'AIzaSyBECBHU9SXsCdXosa_zBCkBa1Tdx8nztCE'
                }
            })
            let coordinate = result.data.results[0].geometry.location
            setCoord(coordinate)
            // console.log(result.data.results[0].geometry.location)
        }catch(error){
            console.log(error)
        }
    }


    return (
        <>
      { show && (<div className="body">
            <div className="addcar-form">
                <input className="input" placeholder="Name" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                <input className="input" placeholder="Radius" value={radius} onChange={(e)=>{setRadius(e.target.value)}}/>
                <Autocomplete className="input" placeholder="Address" apiKey={"AIzaSyBECBHU9SXsCdXosa_zBCkBa1Tdx8nztCE"} onPlaceSelected={(place) => getCoordinate(place.formatted_address)} />
                <input className="input" placeholder="Price" value={price} onChange={(e)=>{setPrice(e.target.value)}}/>
                
                <input className="input" onChange={fileSelected} type="file" accept="image/*" placeholder="image" />
                <input className="input submit" type='submit' onClick={addNewCar} />
            </div>
        </div>) }
        </>
        
    )
}
