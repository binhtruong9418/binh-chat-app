import { FacebookAuthProvider, getAdditionalUserInfo, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import React from 'react'
import styled from 'styled-components'
import { auth } from '../../firebase/config'
import { addDocument } from '../../firebase/services'
import { Button } from 'antd'
import { FacebookFilled, GoogleSquareFilled } from '@ant-design/icons'


const ContentStyled = styled.div`
    width: 50%;
    height: 50%;
    display: flex;
    align-items: center;
    flex-direction: column;

    .login-title {
        font-size: 2.5rem;
        font-weight: 500
    }

    .login-description {
        font-size: 1rem;
        margin: 30px 0;
    }
`

export default function Login() {

    const googleProvider = new GoogleAuthProvider()
    const fbProvider = new FacebookAuthProvider()


    const handleGoogleLogin = async () => {
        const ggdata = await signInWithPopup(auth, googleProvider)
        const AdditionalUserInfo = getAdditionalUserInfo(ggdata)
        const {user} = ggdata
        console.log(user);

        if(AdditionalUserInfo.isNewUser) {
            addDocument('users', {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                providerId: AdditionalUserInfo.providerId,
            })
       }
    }


    return (
        <ContentStyled>
            <div className='login-title'>Wellcome to Binh chat app</div>
            <div className='login-description'><i>Một sản phẩm made by Bình troll</i></div>
            <Button type="primary" className='mt-2 d-flex align-items-center'shape='round'  onClick={handleGoogleLogin}>
                <GoogleSquareFilled />
                Đăng nhập bằng Google
            </Button>
        </ContentStyled>
    )
}
