import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import {Button, Input, Logo} from './index'
import { useDispatch } from 'react-redux'
import { login } from '../store/authSlice'
import { useForm } from 'react-hook-form' 

function Signup() {
    const navigate = useNavigate();
    const [error,setError] =  useState("");
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();

    const create = async (data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(login(userData))
                    navigate('/')
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className='fles justify-center duration-200 my-10 items-center'>
        <div className={`mx-auto w-full max-w-lg bg-background rounded-xl 
                    p-10 border border-black/10`}>
            <div className='mb-2 flex justify-center'>
                <span className='inline-block w-full max-w-[100px]'>
                    <Logo width='100%' />
                </span>
            </div>
            <h2 className='text-center text-text text-2xl font-bold leading-tight'>
                Sign up to create account
            </h2>
            <p className='mt-2 text-center text-base text-text2'>
                Already have an account?&nbsp;
                <Link to="/login"
                    className='font-medium text-start transition-all duration-200 hover:underline'>
                        log in
                </Link>
            </p>
            {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
            <form onSubmit={handleSubmit(create)}>
            <div className='space-y-5 text-text'>
                <Input label = "Name: " placeholder="Enter your name"
                 {...register("name",{ required: true})} type = "text" />
                 <Input 
                    label="Email: " placeholder ="Enter your e-mail" type= "email"
                    {...register("email",{
                        required: true,
                        validate: {
                            // ^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$
                            matchPattern: (value) => {
                                /^(?:(?:[\w`~!#$%^&*\-=+;:{}'|,?\/]+(?:(?:\.(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)*"|[\w`~!#$%^&*\-=+;:{}'|,?\/]+))*\.[\w`~!#$%^&*\-=+;:{}'|,?\/]+)?)|(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)+"))@(?:[a-zA-Z\d\-]+(?:\.[a-zA-Z\d\-]+)*|\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])$/
                                .test(value) || "Email address must be valid address"
                            },
                        }
                    })}
                    />
                    <Input label = "Password: " type="password" placeholder="Enter your password"
                    {...register("password",{required: true})}
                    />
                    <Button type='submit' className='w-full'> Create Account</Button>
            </div>

            </form>
        </div>
    </div>
  )
}

export default Signup