'use client'

import { useQuery } from "@tanstack/react-query"

export default function Page({ params }: { params: { postName: string } }) {
  const { data, isLoading } = useQuery({
    queryFn: async () => {
      const data = await fetch(`http://localhost:3001/posts/${params.postName}`)
      return await data.json()
    }
  })
  console.log(data)
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
          <h1 className='text-5xl'>{data.post.title}</h1>
          <p>{data.post.author.username} &middot; {data.post.createdAt}</p>
          <br />
          <div>
            {data.post.content}
          </div>
        </div>
      )}
    </main>
  )
}
