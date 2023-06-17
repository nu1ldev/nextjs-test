'use client'

import React, { useState } from 'react'
import useLocalStorage from 'use-local-storage'
import { User } from '@prisma/client'

const page = async () => {
  const [email, setEmail] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [displayName, setDisplayName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [currentUser, setCurrentUser] = useLocalStorage<User | null | string>(
    'currentUser',
    null
  )
  return (
    <div>
      <h1 className='text-5xl'>Sign Up</h1>
      <br />
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
            type='text'
            id='email'
            placeholder='Email'
            onChange={e => setEmail(e.target.value)}
          />
          <input
            className='dark:outline-none'
            type='text'
            placeholder='Username'
            onChange={e => setUsername(e.target.value)}
          />
          <input
            className='dark:outline-none'
            type='text'
            id='displayName'
            placeholder='Display Name'
            onChange={e => setDisplayName(e.target.value)}
          />
          <input
            className='dark:outline-none'
            type='password'
            id='password'
            placeholder='Password'
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button
          onClick={async () => {
            setUsername(username.replaceAll(' ', '_'))
            const response = fetch(
              'http://localhost:3001/users/create-user',
              {
                method: 'POST',
                mode: 'cors',
                headers: {
                  'Content-Type': 'application/json',
                  "Accept": '*/*'
                },
                body: JSON.stringify({
                  username,
                  displayName,
                  email,
                  password
                })
              }
            ).then(async res =>  setCurrentUser(await res.json().then(res => res.user)))
          }}
          className='w-min'
        >
          Submit
        </button>
      </div>
    </div>
  )
}

export default page
