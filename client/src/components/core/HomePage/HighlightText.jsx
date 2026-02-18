import React from 'react'

const HighlightText = ({text}) => {
  return (
   <span className="font-bold bg-linear-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent">
    {" "}
      {text}
    </span>
  )
}

export default HighlightText
