'use client'

import React, { useRef } from 'react'
import { CurrentUserContext, useContext } from '@/user'
import { redirect } from 'next/navigation'

const Page = () => {
  const titleRef = useRef<any>(null)
  const contentRef = useRef<any>(null)
  const tagsRef = useRef<any>(null)
  const { currentUser } = useContext(CurrentUserContext)
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
              const response = await fetch('http://localhost:9000/posts/new', {
                method: 'POST',
                mode: 'cors',
                headers: {
                  'Content-Type': 'application/json',
                  Accept: '*/*'
                },
                body: JSON.stringify({
                  author: currentUser,
                  title: titleRef.current.value,
                  content: contentRef.current.value,
                  tags: tagsRef.current.value.split(', ')
                })
              })
              const data = await response.json()
              redirect(`/posts/${data.newPost.slug}`)
            }}
            className='w-min'
          >
            Submit
          </button>
        </div>
      </div>
    </>
  )
}

export default Page
