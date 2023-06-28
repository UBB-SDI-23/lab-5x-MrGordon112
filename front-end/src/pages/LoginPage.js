import React, {useContext, useState} from 'react'
import AuthContext from  '../context/AuthContext'

const LoginPage=()=>{
    let {loginUser}=useContext(AuthContext)
    return (
    <div>
        <form onSubmit={loginUser} >
                <input type="text" name="username" class="action_username" placeholder="enter username" />
                <input type="password" class="action_password" name="password" placeholder="enter password" />
                <input type="submit" class="action_submit" />
        </form>
    </div>
    )
}

export default LoginPage