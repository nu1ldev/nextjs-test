import React from 'react'
import { useQuery } from '@tanstack/react-query'

const page = ({ params }: { params: { userId: string } }) => {
  const { data, isLoading } = useQuery({
    queryFn: async () => {
      const user = await fetch(`http://localhost:3001/users/${params.userId}`, {
        method: 'GET',
        mode: 'cors'
      })
    }
  })
  return (
    <div>
      {isLoading ? (
        <div>
          
        </div>
      ) : (
        <div>

        </div>
      )}
    </div>
  )
}

export default page