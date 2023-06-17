import React, { useState } from 'react'
import useLocalStorage from 'use-local-storage'
import { User } from '@prisma/client'

const page = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [currentUser, setCurrentUser] = useLocalStorage<User | null | string>(
    'currentUser',
    localStorage.getItem('currentUser') || null
  )
  return (
    <div>
      <h1 className='title'>Sign In</h1>
      <br />
      <div id='info'>
        <div
          id='inputs'
          className='flex flex-col gap-y-3'
        >
          <input
            type='text'
            className='dark:outline-none'
            placeholder='Email'
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type='text'
            className='dark:outline-none'
            placeholder='Password'
            onChange={e => setPassword(e.target.value)}
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
              email,
              password
            })
          }).then(async res => setCurrentUser(await res.json().then(res => res.user)))
        }}>
          Submit
        </button>
      </div>
    </div>
  )
}

export default page
