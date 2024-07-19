import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth'
import { login as authLogin } from '../store/authSlice'
import {Button, Input, Logo} from './index' 
import {useForm} from 'react-hook-form'
import { useDispatch } from 'react-redux'

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();
    const [error,setError] = useState("");

    const login = async(data) => {
        setError("")
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(authLogin(userData));
                    navigate("/");
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className='flex my-20 duration-200 items-center justify-center w-full'>
        <div className={`mx-auto w-full max-w-lg bg-background rounded-xl 
                    p-10 border border-black/10`}>
            <div className='mb-2 flex justify-center'>
                <span className='inline-block w-full max-w-[100px]'>
                    <Logo width='100%' />
                </span>
            </div>
            <h2 className='text-center text-text text-2xl font-bold leading-tight'>
                Sign in to your account
            </h2>
            <p className='mt-2 text-center text-base text-text2'>
                Don&apos;t have any account?&nbsp;
                <Link to="/signup"
                    className='font-medium text-start transition-all duration-200 hover:underline'>
                        Sign up
                </Link>
            </p>
            {error && <p className='text-red-600 font-bold mt-8 text-center'>{error}</p>}
            <form onSubmit={handleSubmit(login)} className='mt-8'>
                <div className='space-y-5 text-text'>
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
                    <Input label="Password" type="password" placeholder="Enter your password" 
                    {...register("password", {
                        required: true,
                    })}
                    />
                    <Button type='submit' className='w-full' > Log in</Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login