import React, { useContext, useState } from 'react'
import { Avatar, Typography } from 'antd'
import styled from 'styled-components'
import { formatRelative } from 'date-fns'
import { AuthContext } from '../../Context/AuthProvider'

const formatDate = (seconds) => {
  let formattedDate = ''

  if(seconds) {
    formattedDate = formatRelative(new Date(seconds * 1000), new Date())

    formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }
  return formattedDate
}

const BoxChatStyled = styled.div`
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: start;
    max-width: 200px;
    border-radius: 8px;
    padding: 8px;

`


export default function Message( {text, name, time, photo, userUid}) {

    const [visibleTime, setVisibleTime] = useState(false)
    const {user: {uid}} = useContext(AuthContext)
    console.log(photo, name);

    return (
        <div className='w-100 ps-4 pe-4'>
            <div className= {userUid === uid ?  'd-flex align-items-center mb-3 justify-content-end' : 'd-flex align-items-center mb-3 justify-content-start' }>
                <div className='text-left pe-1'>
                    <Avatar size='small' src={photo}>
                    {photo ? '' : name?.charAt(0)?.toUpperCase()}
                    </Avatar>
                </div>
                <div className='d-flex flex-column ps-1'>
                    <div className='d-flex justify-content-start'>
                        <Typography.Text className='ms-1 '>{name}</Typography.Text>
                    </div>
                    <BoxChatStyled onClick={() => setVisibleTime(!visibleTime)}>
                        <div className='fw-semibold text-start '>{text}</div>
                        {
                            visibleTime ?  (<div className='pt-1'>{formatDate(time.seconds)}</div>) : null
                        }
                    </BoxChatStyled>
                </div>
            </div>
        </div>
  )
}