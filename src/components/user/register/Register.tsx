"use client"
import React from 'react'
import RegisterForm from './RegisterForm'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const Register = () => {

  const { data: session } = useSession()
  const router = useRouter()


  if (session) {
    router.push('/dashboard')
    return null
  }


  return (
    <div className='h-screen flex bg-black items-center justify-center'>
      <RegisterForm />
    </div>
  )
}

export default Register