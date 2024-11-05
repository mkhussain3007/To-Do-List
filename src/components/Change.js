import React from "react";
import axios from "axios";
import {useForm} from 'react-hook-form'
import {Form,Button} from 'react-bootstrap'
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {clearLoginStatus} from '../slices/userSlice'

function Change(){
    const {register,handleSubmit,formState:{errors}}=useForm();
    let {userObj,isError,isSuccess,isLoading,errMsg}=useSelector(state=>state.user)
    let navigate=useNavigate()
    let dispatch=useDispatch()
    const onFormSubmit=(userCredentialObject)=>{
        userCredentialObject.username=userObj.username;
        let token=localStorage.getItem('token')
        axios.put('http://localhost:5000/user/mod',userCredentialObject,
        {headers:{Authorization: "Bearer "+ token}})
        .then(response=>{alert(response.data.message)
        if(response.data.message==='success')
        {
            localStorage.clear()
            dispatch(clearLoginStatus())
            navigate('/login')
        }})
        .catch(error=>alert("something went wrong"))
    }
    return(
        <>
        <p className='display-2 text-center text-primary'>Change Password
        </p>
        <Form className='w-50 mx-auto' onSubmit={handleSubmit(onFormSubmit)}>
            <Form.Group className='mb-3'>
                <Form.Label>
                    Old Password
                </Form.Label>
                <Form.Control type='password' placeholder="Enter Old Password" {...register("oldPass",{required:true})}/>
                {errors.oldPass&&<p classname='text-danger'>*Password is required</p>}
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Label>
                   New Password
                </Form.Label>
                <Form.Control type='password' placeholder="Enter New Password" {...register("newPass",{required:true})}/>
                {errors.newPass&&<p classname='text-danger'>*Password is required</p>}
            </Form.Group>
            <Button variant='secondary' type ='submit'>Change</Button>
        </Form>
        </>
    )
}

export default Change