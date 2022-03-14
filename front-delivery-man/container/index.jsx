import { signIn, useSession } from 'next-auth/react'
import React from 'react'

export const Login = ({ providers }) => {
    const { data, status } = useSession()
    return (
        <div>
            {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                    <button onClick={() => signIn(provider.id)}>
                        Sign in with {provider.name}
                    </button>
                </div>
            ))}
        </div>
    )
}
