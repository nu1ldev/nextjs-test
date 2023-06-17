'use client';
import { Rubik } from 'next/font/google'

const rubik = Rubik({
  weight: '400',
  subsets: ['latin']
})

export default function Home() {
  return (
    <main className='w-full'>
      <div className='mt-28 ml-20 flex flex-col gap-y-5'>
        <div id="catchword" className={`text-8xl flex flex-col gap-y-2 ${rubik.className}`}>
          <span className='flex gap-x-7'>
            POST
            <span className='bg-gradient-to-r dark:from-indigo-800 dark:to-emerald-500 from-indigo-950 to-emerald-800 bg-clip-text text-transparent'>
              Your Own
            </span>
          </span>
          <span>
            Content
          </span>
        </div>
        <div id="buttons">
          <button onClick={() => window.location.href = '/posts/create-post'} className='hover:bg-gradient-to-r dark:hover:from-indigo-800 dark:hover:to-emerald-500 hover:from-indigo-950 hover:to-emerald-800 hover:text-white'>
            Start Posting
          </button>
        </div>
      </div>
    </main>
  )
}
