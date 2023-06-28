import React,{useContext, useState} from 'react'
import AuthContext from  '../context/AuthContext'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'


const SignUpPage=()=>{
    let history=useNavigate()
    const [errorMessage, setErrorMessage] = useState("");
    let {name, }= useContext(AuthContext)
     const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: ''
    });


 const signUp=async()=> {
        let response= axios.post('/first_app/register/',formData)
        .then((response)=>{
            if(response.status!=200){
                throw new Error('not added')
            }


        }
        ).catch((e)=>{setErrorMessage('not added')});


    }

    return (
        <div >
            <h1>Sign Up</h1>
            <form onSubmit={signUp}>

                    <label>Username should be unique </label>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Username*'
                        name='last_name'
                        class="action_username"
                        value={formData.last_name}
                        onChange={(event) => setFormData({...formData, username: event.target.value})}
                        required
                    />

                    <label>The format should be abd@mail.com </label>
                    <input
                        className='form-control'
                        type='email'
                        placeholder='Email*'
                        name='email'
                        class="action_email"
                        value={formData.email}
                        onChange={(event) => setFormData({...formData, email: event.target.value})}
                        required
                    />

                    <label>Password needs to be more than 5 character long</label>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Password*'
                        name='password'
                        class="action_password"
                        value={formData.password}
                        onChange={(event) => setFormData({...formData, password: event.target.value})}
                        minLength='6'
                        required
                    />

                    <label>Password need to be the same</label>
                        <input
                            className='form-control'
                            type='password'
                            placeholder='Confirm Password*'
                            name='password2'
                            class="action_password2"
                            value={formData.re_password}
                            onChange={(event) => setFormData({...formData, password2: event.target.value})}
                            minLength='6'
                            required
                        />
                <input type='submit' text="send" />

        {errorMessage && <div className="error"> {errorMessage} </div>}
            </form>

        </div>
    );
};



export default SignUpPage
