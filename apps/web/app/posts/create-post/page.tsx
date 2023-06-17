'use client'

import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import slug from 'slug'

const page = () => {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [tags, setTags] = useState<Array<string>>([])
  return (
    <div>
      <h1 className='text-5xl'>Create Post</h1>
      <br />
      <div
        id='inputs'
        className='flex flex-col gap-y-3'
      >
        <div>Create your own post by filling up every field below.</div>
        <div
          id='info'
          className='flex flex-col gap-y-7'
        >
          <input
            className='dark:outline-none w-min'
            type='text'
            id='title'
            placeholder='Title'
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            placeholder='Content'
            className='dark:outline-none w-min'
            name='content'
            id='content'
            cols={30}
            rows={10}
            onChange={e => setContent(e.target.value)}
          ></textarea>
          <input
            className='dark:outline-none w-min'
            type='text'
            id='tags'
            placeholder='Tags'
            onChange={e => setTags(e.target.value.split(' '))}
          />
        </div>
        <button
          onClick={async () => {
            const currentUser = localStorage.getItem('currentUser')
            await fetch('http://localhost:3001/posts/create-post', {
              method: 'POST',
              mode: 'cors',
              headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
              },
              body: JSON.stringify({
                title,
                content,
                tags,
                currentUser
              })
            })
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
