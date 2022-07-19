import React, {useState} from 'react'
import './signup.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import Autocomplete from "react-google-autocomplete";

async function postData({name,email, phone, address, password, coord}) {
    console.log('going')
    const result = await axios({ method:'post', url:`${process.env.REACT_APP_BASE_URL}/auth/register`, data:{ name, email, phoneNumber:phone, lat:coord.lat, long:coord.lng, address, password}})
    // window.location.reload()
    console.log(result)
    return result.data
  }

export const Signup = ({show, setShow}) => {
    console.log(process.env.REACT_APP_GOOGLE_API_KEY, 'key' , process.env.REACT_APP_BASE_URL, 'LOP', process.env.REACT_APP_HELLO)
    const [apiKey, setAPiKey] = useState(process.env.REACT_APP_GOOGLE_API_KEY)
    const history = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [coord, setCoord] = useState()

    async function addNewCar () {
        try{
            const result = await postData({ name, email, phone, coord, address, password})
            console.log(result)
            setSuccess(true)
        }catch(error){
            setError(true)
        }
    }

    async function getCoordinate (address) {
        
        try{
            setAddress(address)
            const result = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
                params:{
                    address,
                    key: 'AIzaSyBECBHU9SXsCdXosa_zBCkBa1Tdx8nztCE'
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
                <h2>SIGN UP</h2>
                {error && (<h4 style={{color:'red'}}>Incorrect sign up details</h4>)}
                {success && (<h4 style={{color:'green'}}>Registration successful you can now login <u style={{cursor:'pointer'}} onClick={()=>history('/login')}>here</u></h4>)}
                <input className="input" placeholder="Full name" value={name} onChange={(e)=>{setName(e.target.value); setError(false)}}/>
                <input className="input" placeholder="Email" email value={email} onChange={(e)=>{setEmail(e.target.value); setError(false)}}/>
                <input className="input" placeholder="Phone number" value={phone} onChange={(e)=>{setPhone(e.target.value); setError(false)}}/>
                {/* <input className="input" placeholder="Address" value={address} onChange={(e)=>{setAddress(e.target.value); setError(false)}}/> */}
                <Autocomplete className="input" placeholder="Address" apiKey={'AIzaSyBECBHU9SXsCdXosa_zBCkBa1Tdx8nztCE'} onPlaceSelected={(place) => getCoordinate(place.formatted_address)} />
                <input className="input" type="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value); setError(false)}}/>
                
                <input className="input submit" type='submit' onClick={addNewCar} />
            </div>
        </div>) }
        </>
        
    )
}
