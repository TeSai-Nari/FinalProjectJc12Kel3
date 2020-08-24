import Axios from 'axios'
import { USER_LOGIN_START, USER_LOGIN_FAILED, USER_LOGIN_SUCCESS, LOGOUT } from '../type'
import { API_URL } from '../../supports/Apiurl'

export const LoginUser=({username,password})=>{
    return(dispatch)=> {
        dispatch({type:USER_LOGIN_START})
        if(username===''||password===''){
            dispatch({type:USER_LOGIN_FAILED,payload:'username dan password belum diisi'})
        }else{
            Axios.get(`${API_URL}/users/login`,{
                params:{
                    username:username,
                    password:password
                }
            }).then((res)=>{
                if(res.data.status){
                    localStorage.setItem('token',res.data.token)
                    localStorage.setItem('iduser',res.data.id)
                    dispatch({type:USER_LOGIN_SUCCESS, payload:res.data})
                }else{
                    dispatch({type:USER_LOGIN_FAILED,payload:'username atau password tidak terdaftar'})
                }
            }).catch((err)=>{
                console.log(err)
                dispatch({type:USER_LOGIN_FAILED, payload:err.message})
            })
        }
    }
}

export const errormessageclear=()=>{
    return{
        type:'ErrorClear'
    }
}

export const afterVerified=(data)=>{
    return{
        type:'AFTER_VERIFIED',
        payload:data
    }
}

export const KeepLogin=(data)=>{
    return{
        type:USER_LOGIN_SUCCESS,
        payload:data
    }
}

export const Logout=()=>{
    localStorage.removeItem('iduser')
    return {
        type:LOGOUT
    }
}

export const resetPass=({username,password,email,confirmpassword})=>{
    return (dispatch)=>{
        dispatch({type:USER_LOGIN_START})
        console.log(username,password)
        if(!username || !password || !confirmpassword || !email){
            if(!username && password && confirmpassword) {
                dispatch({type:'USER_RESET_FAILED',payload:'username not filled'})
            }else if(!password && username && confirmpassword) {
                dispatch({type:'USER_RESET_FAILED',payload:'new password not filled'})
            }else if(!confirmpassword && username && password) {
                dispatch({type:'USER_RESET_FAILED',payload:'confirm new password not filled'})
            }else{
                dispatch({type:'USER_RESET_FAILED',payload:'fill all data'})
            }
        }else{
            if(password !== confirmpassword) {
                dispatch({type:'USER_RESET_FAILED',payload:'password not match'})
            }else{
                Axios.post(`${API_URL}/users/resetpassword`,{
                        username:username,
                        password:password,
                        email
                })
                .then((res)=>{
                    if(res.data.status){
                        dispatch({type:'USER_RESET_SUCCESS'})
                    }else{
                        dispatch({type: 'USER_REGIS_FAILED',payload:res.data.message})
                    }
                }).catch((err)=>{
                    console.log(err)
                    dispatch({type:'USER_REGIS_FAILED',payload:err.message})
                })
            }
        }
    }
}

