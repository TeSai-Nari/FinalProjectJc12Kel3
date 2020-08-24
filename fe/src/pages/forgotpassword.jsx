import React, { useState } from 'react'
import Axios from 'axios'
import { API_URL } from '../supports/Apiurl'
import { connect } from 'react-redux'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput } from 'mdbreact'
import Swal from 'sweetalert2'

const ForgotPass =(props)=>{

  const [emailaddress,setemail]=useState({
    username:'',
    email:''
  })

  const forgotPassOnChange=(e)=>{
    e.preventDefault()
    setemail({...emailaddress,[e.target.name]:e.target.value})
  }

  const sendForgotPass=(e)=>{
    e.preventDefault()
    Axios.post(`${API_URL}/users/forgotpassword`,emailaddress)
    .then((res)=>{
      if(res.data.status){
        Swal.fire({
          icon: 'success',
          title: 'Sending Request to Admin',
          text: 'Your recovery e-mail has been sent, check your e-mail!'
        })
      }
      setemail('')
    }).catch((err)=>{
      console.log(err)
    })
  }

  return(
    <MDBContainer className='justify-content-center d-flex align-items-center' style={{height:'97vh'}}>
      <MDBRow>
        <MDBCol>
          <form onSubmit={sendForgotPass}>
            <p className="h3 text-center mb-4">Forgot Password Form :</p>
            <div className="grey-text">
              <MDBInput label="Your username" icon="user" group type="text" name='username'
          value={emailaddress.username}
          onChange={forgotPassOnChange}/>
              <MDBInput label="Your email" icon="envelope" group type="email" name="email" value={emailaddress.email}
          onChange={forgotPassOnChange}/>
            </div>
            <div className="text-center">
              <MDBBtn outline color="secondary" onClick={sendForgotPass}>
                Send
                <MDBIcon far icon="paper-plane" className="ml-1" />
              </MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}

const MapStatetoProps=(state)=>{
  return state.Auth
}

export default connect(MapStatetoProps) (ForgotPass)