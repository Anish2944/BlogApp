import React from 'react'

function Button({
    children,
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className = '',
    ...props
}) {
  return (
    <button className={`px-4 py-2 bg-purple-600 hover:border-2 focus:bg-accent focus:text-black rounded-lg ${bgColor} ${textColor} ${className}`}
   {...props}>{children}</button>
  )
}

export default Button