import React from 'react'
import {useForm} from 'react-hook-form'
import {Form,Button} from 'react-bootstrap'
import {useSelector,useDispatch} from 'react-redux' 
import {userLogin} from '../slices/userSlice'
import { useNavigate } from 'react-router'
import FormCheckLabel from 'react-bootstrap/esm/FormCheckLabel'
function Login()
{
    let navigate=useNavigate()
    const {register,handleSubmit,formState:{errors}}=useForm();
    let {user,isError,isLoading,isSuccess,errMsg}=useSelector(state=>state.user)
    let dispatch=useDispatch();
    if(isSuccess===true)
    {
        navigate('/userdashboard')
    }
    const onFormSubmit=(userCredentialObject)=>{
        dispatch(userLogin(userCredentialObject))
    }
    return (
        <>
        <p className='display-2 text-center text-primary'>Login
        </p>
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
                {errors.password&&<p classname='text-danger'>*Password is required</p>}
            </Form.Group>
            <Button variant='secondary' type ='submit'>Login</Button>
        </Form>
        </>
    )
}

export default Login