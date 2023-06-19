import React from 'react'
import { signIn } from 'next-auth/react'

const ProviderButton = ({ provider }: { provider: string }) => {
  return (
    <button onClick={() => signIn(provider)}>
      Sign In with {provider.charAt(0).toUpperCase() + provider.slice(1)}
    </button>
  )
}

export default ProviderButton