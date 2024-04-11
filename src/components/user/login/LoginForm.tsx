"use client"

import React from 'react';
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

interface FormData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const result = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result?.error) {
      toast.error(result.error, { theme: "colored" });
    } else {
      toast.success("Login success", { theme: "colored" });
      // Handle successful login (e.g., redirect to dashboard)
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const response = await signIn('google', { callbackUrl: '/' });
      if (!response) {
        toast.error("Something went wrong with Google Sign In", { theme: "colored" });
      }
    } catch (error) {
      toast.error("An error occurred", { theme: "colored" });
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <span className="text-red-500">{errors.password.message}</span>}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4"
            >
              Sign in with Google
            </button>
          </div>
          <div className='mt-3 flex flex-row gap-2'>
            <h1>Don't have a acount?</h1>
            <Link className='text-blue-600 font-bold' href={"/register"}>Register</Link>
          </div>
          <Link href={"/password/sendMail"}>
          <h1 className='text-red-700 font-medium'>ForgotPassword?</h1>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;