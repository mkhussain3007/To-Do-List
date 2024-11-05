import React from "react";
import { useState } from 'react'
import {useForm} from 'react-hook-form'
import {Form,Button} from "react-bootstrap"
import axios from 'axios'
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useNavigate } from "react-router-dom";

    
function Add(){
    let {userObj} = useSelector(state=>state.user)
    const{
        register,
        handleSubmit,
        formState:{errors},
    }=useForm();
    let navigate=useNavigate()

const onFormSubmit=(todoObj)=>{
    let token=localStorage.getItem("token")
    let today=new Date();
    //formData.append("username","Kaori")
    console.log(todoObj)
    todoObj.username=userObj.username
    //formData.append("todoObj",JSON.stringify(todoObj))
    todoObj.date=today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
    todoObj.time=today.getHours() + ":" + today.getMinutes()
    axios.post('http://localhost:5000/user/todo/add',todoObj,{
        headers:{Authorization: "Bearer "+ token}})
    .then(response=>{console.log(response)
        navigate('/userdashboard/todos')
})
    .catch(error=>alert("something went wrong"))
}

    return(
        <>
        <div className='display-2 text-center text-info'>Add To-Do
        </div>
        <Form className='w-50 mx-auto' onSubmit={handleSubmit(onFormSubmit)}>
        <Form.Group className='mb-3'>
                <Form.Label>
                    To-Do
                </Form.Label>
                <Form.Control type='text' placeholder="Enter todo" {...register("todo",{required:true})}/>
                {errors.todo&&<p classname='text-danger'>*Enter a todo</p>}
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Label>
                    Due Date
                </Form.Label>
                <Form.Control type='date' placeholder="Enter date" {...register("dueDate",{required:true})}/>
                {errors.dueDate&&<p classname='text-danger'>*Enter a dueDate</p>}
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Label>
                    Due Time
                </Form.Label>
                <Form.Control type='time' placeholder="Enter time" {...register("dueTime",{required:true})}/>
                {errors.dueTime&&<p classname='text-danger'>*Enter a dueTime</p>}
            </Form.Group>

            <Button variant='primary' type ='submit'>Add</Button>
        </Form>
        </>
    )
}

export default Add
