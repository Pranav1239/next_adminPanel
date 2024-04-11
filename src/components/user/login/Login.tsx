'use client'

import React from 'react'
import LoginForm from './LoginForm'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const Login = () => {
  const { data: session } = useSession()
  const router = useRouter()

  if (session) {
    router.push('/dashboard')
    return null
  }

  return (
    <div className='h-screen flex bg-black items-center justify-center'>
      <LoginForm />
    </div>
  )
}

export default Login