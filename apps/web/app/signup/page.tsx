'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import discordIcon from '@/public/discord.svg'
import twitterIcon from '@/public/twitter.svg'
import { signIn, signOut } from 'next-auth/react'

const page = async () => {
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
              const response = await fetch('http://localhost:3001/users/create-user', {
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
              signIn('credentials')
            }}
            className='w-min'
          >
            Submit
          </button>
        </div>
        <div className='flex justify-evenly items-center text-white/60'>
          <div className='h-px w-[45rem] bg-white/60'></div>
          or
          <div className='h-px w-[45rem] bg-white/60'></div>
        </div>
        <div id='providers' className='flex flex-col gap-y-3'>
          <button onClick={() => signIn('discord')} className='bg-indigo-500 text-white hover:text-white hover:bg-indigo-600 flex items-center justify-center gap-x-3'>
            <Image width={25} height={25} src={discordIcon} alt='' />
            <p>Sign Up with Discord</p>
          </button>
          <button onClick={() => signIn('twitter')} className='bg-sky-500 text-white hover:text-white hover:bg-sky-600 flex items-center justify-center gap-x-3'>
            <Image width={25} height={25} src={twitterIcon} alt='' />
            <p>Sign Up with Twitter</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default page
