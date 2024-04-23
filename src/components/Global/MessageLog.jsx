import React from 'react'
import { Message } from 'rsuite'

const MessageLog = ({type, error}) => {
    return (
    <Message
      showIcon
      type={type}
      header={type === "warning" ? " Favorite Removed" : "Favorite Added"}
      closable
    >
      <small className="text-black">{error}</small>
    </Message>
    )
}


export default MessageLog