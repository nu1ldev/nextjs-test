'use client'

import React, { useRef } from 'react'
import useLocalStorage from 'use-local-storage'
import { User } from '@prisma/client'
import { ProviderButton } from '@/components'

const page = () => {
  const emailRef = useRef<any>(null)
  const passwordRef = useRef<any>(null)
  return (
    <div>
      <h1 className='title'>Sign In</h1>
      <br />
      <div>
        <div id='info'>
          <div
            id='inputs'
            className='flex flex-col gap-y-3'
          >
            <input
              type='text'
              className='dark:outline-none'
              placeholder='Email'
              ref={emailRef}
            />
            <input
              type='text'
              className='dark:outline-none'
              placeholder='Password'
              ref={passwordRef}
            />
          </div>
          <button onClick={async () => {
            const response = await fetch('http://localhost:3001/signin', {
              method: 'POST',
              mode: 'cors',
              headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
              },
              body: JSON.stringify({
                email: emailRef.current.value,
                password: passwordRef.current.value
              })
            })
          }}>
            Submit
          </button>
        </div>
        <div className='flex justify-evenly items-center text-white/60'>
          <div className='h-px w-[45rem] bg-white/60'></div>
          or
          <div className='h-px w-[45rem] bg-white/60'></div>
        </div>
        <div>
          <ProviderButton provider='discord' />
        </div>
      </div>
    </div>
  )
}

export default page
