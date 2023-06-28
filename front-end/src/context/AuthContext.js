import {createContext, useState, useEffect} from 'react'
import jwt_decode from 'jwt-decode'
import {useNavigate} from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({children}) => {

    let [user,setUser]=useState(() => localStorage.getItem('authTokens')? jwt_decode(localStorage.getItem('authTokens')): null)
    let[authTokens,setAutTokens]=useState( () => localStorage.getItem('authTokens')? JSON.parse(localStorage.getItem('authTokens')): null)
    let[loading,setLoading]= useState(true)
    let history=useNavigate()


    let loginUser = async (e )=> {

        console.log('form submited')
        e.preventDefault()
        let response=await fetch('/first_app/token/',{
        method:'POST',
        headers:{
        'Content-Type':'application/json'
         },
            body:JSON.stringify({'username':e.target.username.value,'password':e.target.password.value})
             })
             let data=await response.json()
             if(response.status===200)
             {
             setAutTokens(data)
             setUser(jwt_decode(data.access))
             localStorage.setItem('authTokens',JSON.stringify(data))
             history('/')
             }
             else{
             alert('Something went wrong!')}
}
    let logoutUser=() => {
        setAutTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        history('/')
    }

    let updateToken  = async () =>{
    console.log('update token call')
    let response=await fetch('/first_app/token/refresh/',{
        method:'POST',
        headers:{
        'Content-Type':'application/json'
         },
            body:JSON.stringify({'refresh':authTokens.refresh})
             })
             let data=await response.json()

             if(response.status===200){
             setAutTokens(data)
             setUser(jwt_decode(data.access))
             localStorage.setItem('authTokens',JSON.stringify(data))

             }else
             {
                logoutUser()
             }
    }

    let contextData= {
        user:user,
        loginUser:loginUser,
        logoutUser:logoutUser
        }
    useEffect(()=>{
        let interval = setInterval(()=>{
        if(authTokens){
        updateToken()
        }
        },2000000)
        return () => clearInterval(interval)

    },[authTokens,loading])

return (
    <AuthContext.Provider value ={contextData}>
        {children}
     </AuthContext.Provider>

)
}