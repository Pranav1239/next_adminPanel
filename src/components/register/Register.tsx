"use client"
import React from 'react'
import RegisterForm from './RegisterForm'
import { useSession } from 'next-auth/react'

const Register = () => {

  const { data: session } = useSession()

  if (session) {
    return null;
  }

  return (
    <div className='h-screen flex bg-slate-900 items-center justify-center'>
      <RegisterForm />
    </div>
  )
}

export default Register