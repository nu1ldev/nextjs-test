'use client'

import { useEffect, useState } from "react"

export default function Page({ params }: { params: { slug: string } }) {
  const [isLoading, setIsLoading] = useState<any>(true)
  const [fetchState, setFetchState] = useState<any>(null)
  useEffect(() => {
    fetch(`http://localhost:9000/posts/${params.slug}`, {
      mode: 'cors',
      method: 'GET',
      headers: {
        "Content-Type": 'application-json',
        "Accept": '*/*'
      }
    }).then(res => {
      setFetchState(res)
      setIsLoading(false)
    })
  }, [])
  return (
    <main>
      {isLoading ? (
        <div className='animate-pulse'>
          <div className='rounded dark:bg-white/20 bg-black/30 w-24' id="title-fake"></div>
          <br />
          <div className='grid grid-cols-8 gap-x-3 gap-y-4' id="content-fake">
            <div className='rounded dark:bg-white/20 bg-black/30 grid-cols-5'></div>
            <div className='rounded dark:bg-white/20 bg-black/30 grid-cols-3'></div>
            <div className='rounded dark:bg-white/20 bg-black/30 grid-cols-2'></div>
            <div className='rounded dark:bg-white/20 bg-black/30 grid-cols-6'></div>
            <div className='rounded dark:bg-white/20 bg-black/30 grid-cols-8'></div>
            <div className='rounded dark:bg-white/20 bg-black/30 grid-cols-3'></div>
            <div className='rounded dark:bg-white/20 bg-black/30 grid-cols-5'></div>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <h1 className='title'>{fetchState.title}</h1>
            <div className='flex gap-x-2'>
              <span>{fetchState.author}</span>
              <span>&middot;</span>
              <span>{fetchState.createdAt}</span>
            </div>
          </div>
          <div className={`w-${window.innerWidth - (window.innerWidth / 6)} h-2 dark:bg-white/60 bg-black/60`} />
          <div className='flex-wrap w-[25rem]'>
            {fetchState.content}
          </div>
        </div>
      )}
    </main>
  )
}
