import{ USER_LOGIN_SUCCESS, USER_LOGIN_START, USER_LOGIN_FAILED, LOGOUT, CHANGE_PASSWORD } from '../type'

const INITIAL_STATE={
    id:0,
    username:'',
    password:'',
    role:'',
    address:'',
    email:'',
    iduser:0,
    loading:false,
    islogin:false,
    errormes:'',
    errormesreg:'',
    errormesres:'',
    isreset:false,
    isverified:0,
    token:'',
    confirmpassword:''
}

export default (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case USER_LOGIN_START:
            return{...state,loading:true}
        case USER_LOGIN_SUCCESS:
            return{...state,loading:false,...action.payload,islogin:true}
        case USER_LOGIN_FAILED:
            return{...state,loading:false,errormes:action.payload}
        case 'USER_REGIS_FAILED':
            return{...state,loading:false,errormesreg:action.payload}
        case 'USER_RESET_FAILED':
            return{...state,loading:false,errormesres:action.payload}
        case 'USER_RESET_SUCCESS':
            return{...state, isreset:true}
        case 'AFTER_VERIFIED':
            return {...state,...action.payload}
        case 'ErrorClear':
            return state
        case LOGOUT: 
            return INITIAL_STATE
        default:
            return state
    }
}