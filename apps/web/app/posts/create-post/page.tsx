'use client'

import React, { useRef } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

const page = () => {
  const titleRef = useRef<any>(null)
  const contentRef = useRef<any>(null)
  const tagsRef = useRef<any>(null)
  const { data } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/signin?callbackUrl=/posts/create-post')
    },
  })
  return (
    <>
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
                ref={titleRef}
                type='text'
                id='title'
                placeholder='Title'
              />
              <textarea
                placeholder='Content'
                className='dark:outline-none w-min'
                ref={contentRef}
                name='content'
                id='content'
                cols={30}
                rows={10}
              ></textarea>
              <input
                className='dark:outline-none w-min'
                ref={tagsRef}
                type='text'
                id='tags'
                placeholder='Tags, e.g. tag1, tag2'
              />
            </div>
            <button
              onClick={async () => {
                await fetch('http://localhost:3001/posts/create-post', {
                  method: 'POST',
                  mode: 'cors',
                  headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*'
                  },
                  body: JSON.stringify({
                    currentUser: data?.user,
                    title: titleRef.current.value,
                    content: contentRef.current.value,
                    tags: tagsRef.current.value.split(', ')
                  })
                })
              }}
              className='w-min'
            >
              Submit
            </button>
            {JSON.stringify(data)}
          </div>
        </div>
    </>
  )
}

export default page
