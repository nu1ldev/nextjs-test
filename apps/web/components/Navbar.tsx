import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image'

const Navbar = ({ darkThemeProvider, setter }: {
  darkThemeProvider: boolean,
  setter: () => void
}) => {
  const { data } = useSession()
  const [menu, setMenu] = useState<boolean>(false)
  const menuItems = [
    {
      href: '/users/'
    }
  ]
  return (
    <nav className='w-full h-16 flex items-center justify-around sticky top-0 left-0 dark:bg-black/70 border-b-[0.3px] dark:border-b-white/90 bg-white/70 border-b-black/90'>
      <a href='/'>Home</a>
      <a href='/placeholder'>Navbar Placeholder Link</a>
      <div className='flex items-center gap-x-10'>
        <a href='/posts/create-post'>Create Post</a>
        <div className='h-12 w-px dark:bg-white/50 bg-black' />
        <button onClick={() => setter()}>
          {!darkThemeProvider ? (
            <MoonIcon
              width={18}
              height={18}
            />
          ) : (
            <SunIcon
              width={18}
              height={18}
            />
          )}
        </button>
        <button onClick={() => setMenu(prev => !prev)} className='rounded-full p-0 block'>
          {data?.user ? (
            <>
              {/* @ts-ignore */}
              <Image className='object-cover rounded-full' src={data!.user!.image} alt='' width={30} height={30}  />
            </>
          ) : (
            <Link href='/signin'>Sign In</Link>
          )}
        </button>
        {menu && (
          <div className='dark:border-gray-800 dark:bg-black bg-white border-gray-200 px-4 py-3 '>

          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
