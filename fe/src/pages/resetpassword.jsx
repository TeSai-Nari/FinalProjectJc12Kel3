import React, { useState, useEffect } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput, MDBAlert } from 'mdbreact'
import { Redirect } from 'react-router-dom'
import Axios from 'axios'
import { API_URL } from '../supports/Apiurl'
import { connect } from 'react-redux'
import { resetPass, errormessageclear } from '../redux/actions'
import querystring from 'query-string'

const ResetPassword = (props) =>{

    const [data, setdata] = useState({
        username:"",
        password:"",
        confirmpassword:"",
        email:""
    })

    const dataOnChange = (e) => {
        e.preventDefault()
        setdata({...data,[e.target.name]:e.target.value})
    }

    useEffect(()=>{
        console.log(props.location.search)
        var obj = querystring.parse(props.location.search)
        console.log(obj.token)
        Axios.get(`${API_URL}/users/forgotpasswordverified`,{
            headers:{
                'Authorization':`Bearer ${obj.token}`
            }
        }).then((res)=>{
            console.log(res.data)
            setdata({email:res.data})
        }).catch((err)=>{
            console.log(err)
        })
    },[])

    const onResetSend = (e) => {
        e.preventDefault()
        var obj={
            username:data.username,
            email:data.email,
            password:data.password,
            confirmpassword:data.confirmpassword
        }
        console.log(data.username)
        props.resetPass(obj)
        console.log(obj)
    }

    if(props.Auth.isreset){
        return <Redirect to='/login' />
    }
    
    return(
        <div>
            <MDBContainer className='justify-content-center d-flex align-items-center' style={{height:'97vh'}}>
            <MDBRow>
                <MDBCol>
                    <form onSubmit={onResetSend}>
                        <p className="h5 text-center mb-4">Reset Password</p>
                        <div className="grey-text">
                            <MDBInput label="Your username" icon="user" group type="text" name='username' outline value={data.username} onChange={dataOnChange} validate error='dsadas'/>
                            <MDBInput label="Your new password" icon="lock" group type="password" outline value={data.password} onChange={dataOnChange} validate error='dsadas'/>
                            <MDBInput label="Confirm new password" icon="exclamation-triangle" group type="password" outline value={data.confirmpassword} onChange={dataOnChange} validate error='dsadas'/>
                            {
                                props.Auth.errormesres === ''?
                                null
                                :
                                <p style={{color:"red", lineHeight:0}}>
                                    {props.Auth.errormesres} <span style={{cursor:'pointer'}} onClick={()=>{props.errormessageclear()}} className='float-right font-weight-bold'>x</span>
                                </p>
                            }
                        </div>
                        <div className="text-center">
                            <MDBBtn color="primary" type="submit">Submit</MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
            </MDBContainer>
        </div>
    )
}

const MapStatetoProps=(state)=>{
    return {
        Auth:state.Auth
    }
  }
  
export default connect(MapStatetoProps,{resetPass,errormessageclear})(ResetPassword)