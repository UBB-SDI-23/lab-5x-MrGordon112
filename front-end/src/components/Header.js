import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {useState,useEffect} from 'react'
import AuthContext from '../context/AuthContext'
const Header = ()  => {
    let {user, logoutUser}=useContext(AuthContext)




	return (
	<div className="header-app">
		<ul>
           <li>
                <Link to={'/'}>
			        Cars
		        </Link>
		   </li>
            <li>
                <Link to={'/mechanics'}>
			        Mechanics
		        </Link>
		    </li>
            <li>
                <Link to={'/repaireds'}>
			        Repairs
		        </Link>
		    </li>
            <li>
                <Link to={'/carTypes'}>
			        CarTypes
		        </Link>
		    </li>
		    <li>
	            <Link to={'/chatApp'}>
			        ChatPage
		        </Link>
		    </li>
		{user?(
		<div>
		    <li>
		        <Link onClick={logoutUser}>
			        Logout
		        </Link>
		    </li>
		</div>):(
		<div>
		    <li>
		        <Link to={'/login'}>
			        Login
		        </Link>
		    </li>
		    <li>
		        <Link to={'/sign_up'}>
			        Sign Up
		        </Link>
		    </li>
		</div>)}

    </ul>
    <br/>
</div>)
};

export default Header
