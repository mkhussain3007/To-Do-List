import React, { useState } from 'react'
import {useForm} from 'react-hook-form'
import {Form,Button} from "react-bootstrap"
import {MdLogin} from "react-icons/md"
import axios from 'axios';

import {useNavigate} from 'react-router-dom'
function SignUp()
{
    let [img,setImg]=useState(null)
    const onImageSelect=(event)=>{
        setImg(event.target.files[0])
    }
    const{
        register,
        handleSubmit,
        formState:{errors},
    }=useForm();
    const navigate=useNavigate();
const onFormSubmit=(userObj)=>{
    
    let formData=new FormData();
    formData.append("userObj",JSON.stringify(userObj))
    formData.append("photo",img)
    for (const value of formData.values()) {
        console.log(value);
      }
    axios.post('http://localhost:5000/user/createuser',formData)
    .then(response=>{console.log(response)
    alert(response.data.message)
    if(response.data.message==='User Created')
    {
        navigate('/login');
    }
})
    .catch(error=>alert("something went wrong"))
}
    return (
        <>
        <div className='display-2 text-center text-info'>Signup
        </div>
        <Form className='w-50 mx-auto' onSubmit={handleSubmit(onFormSubmit)}>
            <Form.Group className='mb-3'>
                <Form.Label>
                    Username
                </Form.Label>
                <Form.Control type='text' placeholder="Enter Username" {...register("username",{required:true})}/>
                {errors.username&&<p classname='text-danger'>*Username is required</p>}
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Label>
                    Password
                </Form.Label>
                <Form.Control type='password' placeholder="Enter Password" {...register("password",{required:true})}/>
                {errors.password&&<p classname='text-danger'>*Email is required</p>}
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Label>
                    Email
                </Form.Label>
                <Form.Control type='email' placeholder="Enter Email" {...register("email",{required:true})}/>
                {errors.email&&<p classname='text-danger'>*Email is required</p>}
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Label>
                    City
                </Form.Label>
                <Form.Control type='text' placeholder="Enter City" {...register("city",{required:true})}/>
                {errors.city&&<p classname='text-danger'>*City is required</p>}
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Label>
                    Select File
                </Form.Label>
                <Form.Control type='file' {...register("photo",{required:true})}
                onChange={(event)=>onImageSelect(event)}/>
                {
                    errors.photo && (<p className="text-danger">* Profile image is required</p>)
                }
            </Form.Group>
            <Button variant='primary' type ='submit'>SignUp<MdLogin/></Button>
        </Form>
        </>
    )
}

export default SignUp