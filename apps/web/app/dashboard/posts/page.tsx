'use client'

import { CurrentUserContext } from '@/user'
import React, { useContext } from 'react'

const page = () => {
  const {test} = useContext(CurrentUserContext)
  return (
    <div>{test || 'Yok'}</div>
  )
}

export default page