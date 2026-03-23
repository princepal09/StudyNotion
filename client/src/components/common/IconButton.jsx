import React from 'react'

const IconButton = ({
    text,
    onClick, 
    children,
    diabled,
    outline = false,
    customClasses,
    type
}) => {
  return (
    <button>
      {
        children ? (
            <span>{text}</span>
        ) : (text)
      }
    </button>
  )
}

export default IconButton
