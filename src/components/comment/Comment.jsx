import React, {useEffect, useState} from 'react'
import './comment.css'
import axios from 'axios'



export const Comment =  ({id,open, setOpen}) => {
    let userDetails = localStorage.getItem('user')
    let token = localStorage.getItem('token')
    const [data, setData] = useState()
    const [comment, setComment] = useState()
    const [reply, setReply] = useState()
    const [user, setUser] = useState(JSON.parse(userDetails))
    useEffect(()=>{
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_BASE_URL}/product/singleproduct`,
            headers: {
                authorization: `Bearer ${token}`,
              },
            params:{
                productId: id
            }
          }).then((val)=>{
              setData(val.data.products)
              console.log(val.data.products, 'kl')
            }).catch((err)=>{
                console.log('lk')
            })
    },[id])

    async function addReply ( commentId ) {
        axios({
            method: 'post',
            url: `${process.env.REACT_APP_BASE_URL}/comment/addreply`,
            headers: {
                authorization: `Bearer ${token}`,
              },
            data:{
                commentId,
                name:user.name,
                text:reply
            }
            
          }).then((val)=>{
              setData(val.data.products)
              setReply('')
              window.location.reload()
            //   console.log(val.data.products, 'kl')
            }).catch((err)=>{
                console.log('lk')
            })
    }

    async function addComment (text) {
        axios({
            method: 'post',
            url: `${process.env.REACT_APP_BASE_URL}/comment/addproduct`,
            headers: {
                authorization: `Bearer ${token}`,
              },
            data:{
                productId:data._id,
                user:user._id,
                text:comment
            }
            
          }).then((val)=>{
              setData(val.data.products)
              setComment('')
              window.location.reload()
            //   console.log(val.data.products, 'kl')
            }).catch((err)=>{
                console.log('lk')
            })
    }

  
    const details = data
    const detail = {
        name: 'MAC BOOK PRO',
        price: '#20,000',
        comments: [
            {
                text: "its worth the Price",
                createdAt: '56778',
                user:{
                    name:'chiemerie ify',
                    createdAt: '56778'
                },
                reply: [
                    {
                        name:'chiemerie ify',
                        text: 'yeah1'
                    },
                    
                 ]
            },
            {
                text: "its worth the Price",
                createdAt: '56778',
                user:{
                    name:'chiemerie ify',
                    
                },
                reply: [
                    {
                        name:'chiemerie ify',
                        text: 'yeah1'
                    },
                    {
                        name:'chiemerie ify',
                        text: 'yeah2'
                    },
                    {
                        name:'chiemerie ify',
                        text: 'yeah3'
                    }
                 ]
            }
        ]
    }
    return (
        <>
        {open && (
        <div>

            <div className="co-body">
            
            {

               data && (<div className="co-addcarg-form">
               <div className="co-delete-button" onClick={()=>{
                   setOpen(false)
                   console.log('holk')
                   }}>
            x
                {/* <AiOutlineComment/> */}
            </div>
        
                    <h2>{details.name} - {details.price}</h2>
                    <div className="wide-body">
                    
                        <div>
                        <img className="co-car-image" src={`${process.env.REACT_APP_BASE_URL}/product/car/images/${data.image}`}/>
                        </div>
                        <div>
                            <h4 style={{marginLeft:'20px', marginBottom:'0px'}}>COMMENTS</h4>
                            {details.comments.reverse().map((data)=>{  
                                return (
                                    <div  className="comment-card">
                                        <div className="comment-text">{data.text} <div className="reply-name"><i> - {data.user.name.split(' ')[0]}  </i> </div> </div>
                                        <div style={{marginLeft: '50px'}}>
                                        
                                        {
                                            data.reply.reverse().map((reply)=>{
                                                return (
                                                    <div className="reply-text">{reply.text}  <div className="reply-name"><i> - {reply.name.split(' ')[0]} </i> </div> </div>
                                                )
                                            })
                                        }

                                        
                                        <div>
                                            <input className="reply-input" onChange={(e)=>setReply(e.target.value)}  type="text" />
                                            <button className="reply-button" onClick={()=>addReply(data._id)}>Reply</button>
                                        </div>
                                        </div>
                                    </div>
                            )
                                
                            })
                            
                            }
                        </div>
                        
                    </div>
                    <div className="comment-tab">
                        <input className="comment-input" placeholder="comment" onChange={(e)=>setComment(e.target.value)} type="text" />
                        <button className="reply-button" onClick={()=> addComment('lk')}>Comment</button>
                    </div>
                </div>)
            
            }
            
            </div>
            
        </div>
        )}
        </>
   )
}
