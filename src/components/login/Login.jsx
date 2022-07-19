import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './login.css'
import axios from 'axios'

async function postData({email, password}) {
    const formData = new FormData();
    formData.append("email", email)
    formData.append("password", password)
    
  
    const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/login`, {email, password})
    // window.location.reload()
    return result.data
  }

export const Login = ({show, setShow, set}) => {
    const history = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    
    async function addNewCar () {
        try{
            const result = await postData({ email, password})
        // setShow(false)
        if(result){
            console.log(result)
            // <Navigate to="/dashboard" replace={true} />
            set(true)
            localStorage.setItem('token', result.token);
            localStorage.setItem('user', JSON.stringify(result.user));
            history('/dashboard')
        }else{
            setError(true)
        }
        }catch(error){
            setError(true)
        }
        
    }


    return (
        <>
      { show && (<div className="body">
            <div className="addcar-form">
            <h2>LOGIN</h2>
                {error && (<h4 style={{color:'red'}}>Invalid Login Credentials</h4>)}
                <input className="input" placeholder="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                <input className="input" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                
                <input className="input submit" type='submit' onClick={addNewCar} />
            </div>
        </div>) }
        </>
        
    )
}
