import React from 'react'

const Button = (props) => {
  return (
    <button className='bg-[#b60f4f] text-white py-2 px-6 rounded md:ml-8 hover:bg-[#7a0834] transition-all ease duration-200'>
      {props.children}
    </button>
  )
}

export default Button