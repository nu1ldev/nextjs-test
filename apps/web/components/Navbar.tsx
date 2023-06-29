'use client'

import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image'

const Navbar = ({
  darkThemeProvider,
  setter
}: {
  darkThemeProvider: boolean
  setter: () => void
}) => {
  const [menu, setMenu] = useState<boolean>(false)
  const menuItems: Array<{ href: string; name: string }> = [
    {
      href: '/dashboard',
      name: 'Dashboard'
    },
    {
      href: '/dashboard/posts',
      name: 'My posts'
    },
    {
      href: '/settings',
      name: 'Settings'
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
        <button onClick={() => setMenu(prev => !prev)}>
          
        </button>
        {menu && (
          <div className='border rounded dark:border-white/30 dark:bg-black bg-white border-gray-200 px-4 py-3 absolute flex flex-col gap-y-3 translate-x-56 translate-y-[5.5rem]'>
            {menuItems.map(item => {
              return (
                <Link
                  href={item.href}
                  className='dark:hover:bg-white/30 transition rounded py-1 px-2 hover:bg-black/30'
                >
                  {item.name}
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
