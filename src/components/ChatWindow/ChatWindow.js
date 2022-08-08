import { signOut } from 'firebase/auth'
import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import firebase, { auth } from '../../firebase/config'
import { Form, Input, Button } from 'antd'
import Message from './Message'
import { AuthContext } from '../../Context/AuthProvider'
import { addDocument } from '../../firebase/services'
import useFirestore from '../../hooks/useFirestore'


const WrappedStyled = styled.div`
    width: 35vw;
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    @media only screen and (max-width: 600px) {
        width: 100vw;
        height: 100vh;
    }
`

const MessageListStyled = styled.div`
    width: 95%;
    height: 100%;
    margin-top: 10px;
    background-color: #eee;
    padding: 20px 5px 20px 5px;
    border-radius: 8px;
    box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%);
    display: flex;
    flex-direction: column;
    align-items: start;
    overflow-y: auto;

`


const FormStyled = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 8px;
  margin: 10px 0 10px 0;
  width: 95%;

  .ant-form-item {
    flex: 1;
    margin: 0;
  }

`

export default function ChatWindow() {
    const [inputValue, setInputValue] = useState('')
    const [form] = Form.useForm()
    const { user: {uid, displayName, photoURL} } = useContext(AuthContext)

    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }

    const handleSubmit = () => {
        if(inputValue.length) {
            addDocument('messages', {
                text: inputValue,
                uid,
                photoURL,
                displayName
            })
        }
    
        form.resetFields(['messages'])
        setInputValue('')
    }

    const messages = useFirestore('messages')
    
    return (
        <WrappedStyled>
            <button type='button' className='btn btn-danger btn-sm mt-2' onClick={() => signOut(auth)}>Đăng xuất</button>
            <MessageListStyled> 
            {
                messages.map(mes => (
                    <Message 
                        key={mes.id}
                        photo={mes.photoURL}
                        name={mes.displayName}
                        time={mes.createdAt}
                        text={mes.text}
                        userUid={mes.uid}
                    />
                ))
            }
            
            </MessageListStyled>
            <FormStyled form={form}>
                <Form.Item name='messages'>
                    <Input 
                        placeholder='Nhắn gì vào đây ...'
                        autoComplete='off'
                        onChange={handleInputChange}
                        type='text'
                        spellCheck={false}
                    />
                </Form.Item>
                <Button onClick={handleSubmit}>Gửi</Button>
            </FormStyled>
        </WrappedStyled>
    )
}
