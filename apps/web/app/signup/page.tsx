'use client'

import { CurrentUserContext, useContext } from '@/user'
import { redirect } from 'next/navigation'
import React, { useRef, useState } from 'react'

const Page = async () => {
  const context = useContext(CurrentUserContext)
  const emailRef = useRef<any>(null)
  const usernameRef = useRef<any>(null)
  const passwordRef = useRef<any>(null)
  const displayNameRef = useRef<any>(null)
  return (
    <div>
      <h1 className='text-5xl'>Sign Up</h1>
      <br />
      <div className='flex flex-col gap-y-2'>
        <div
          id='inputs'
          className='flex flex-col gap-y-3'
        >
          <div
            id='info'
            className='flex flex-col gap-y-7'
          >
            <input
              className='dark:outline-none'
              ref={emailRef}
              type='text'
              id='email'
              placeholder='Email'
            />
            <input
              className='dark:outline-none'
              ref={usernameRef}
              type='text'
              placeholder='Username'
            />
            <input
              className='dark:outline-none'
              ref={displayNameRef}
              type='text'
              id='displayName'
              placeholder='Display Name'
            />
            <input
              className='dark:outline-none'
              ref={passwordRef}
              type='password'
              id='password'
              placeholder='Password'
            />
          </div>
          <button
            onClick={async () => {
              const response = await fetch('http://localhost:9000/users/new', {
                method: 'POST',
                mode: 'cors',
                headers: {
                  'Content-Type': 'application/json',
                  Accept: '*/*'
                },
                body: JSON.stringify({
                  username: usernameRef.current.value,
                  displayName: displayNameRef.current.value,
                  email: emailRef.current.value,
                  password: passwordRef.current.value
                })
              })
              const data = await response.json()
              context.setCurrentUser(data.newUser)
              redirect('/dashboard')
            }}
            className='w-min'
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default Page
