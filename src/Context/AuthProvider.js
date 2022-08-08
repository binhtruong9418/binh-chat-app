import { Spin } from 'antd';
import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react'
import { auth } from '../firebase/config';
import {useNavigate} from 'react-router-dom'


export const AuthContext = createContext()

export default function AuthProvider ({children}) {

    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()



    useEffect(() => {
        const unsubscibed = onAuthStateChanged(auth, (user) => {
            if(user) {
                const { displayName, email, uid, photoURL } = user
                setUser(
                    { 
                        displayName,
                        email, 
                        uid, 
                        photoURL 
                    })
                navigate('/')
                setIsLoading(false)
                return;
            }
            setIsLoading(false)
            navigate('login')
        })

        return () => {
            unsubscibed()
        }
    }, [navigate])
    

  return (
    <AuthContext.Provider value={{ user }}>
        {
            isLoading ? <Spin /> : children
        }
    </AuthContext.Provider>
  )
}