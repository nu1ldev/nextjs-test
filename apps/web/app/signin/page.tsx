'use client'

import React, { useEffect, useRef, useState } from 'react'
import { CurrentUserContext, useContext } from '@/user'
import { redirect } from 'next/navigation'

const Page = () => {
  const context = useContext(CurrentUserContext)
  const emailRef = useRef<any>(null)
  const passwordRef = useRef<any>(null)
  const [test, setTest] = useState<boolean>(false)
  let jsonData = {}
  useEffect(() => {
    context.setCurrentUser(jsonData)
  }, [test])
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
              type='password'
              className='dark:outline-none'
              placeholder='Password'
              ref={passwordRef}
            />
          </div>
          <button onClick={async () => {
            const response = await fetch('http://localhost:9000/users/get', {
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
            const data = await response.json()
            jsonData = data
            setTest(!test)
            redirect('/dashboard')
          }}>
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default Page
