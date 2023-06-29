'use client'

import { CurrentUserContext, useContext } from "@/user"

const Page = () => {
  const context = useContext(CurrentUserContext)
  console.log(context)
  const test = true
  context.append({ test })
  return (
    <div>
      Dashboard page
      <br />
      {JSON.stringify(context)}
    </div>
  )
}

export default Page