import React, { useEffect, useState } from 'react'

const Time = () => { 
 const [date, setDate] = useState(new Date())

 useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000)

    return function cleanup() {
        clearInterval(timer)
    }
 }, [])
  

  return (
    <div className='flex flex-col items-end text-[#e2ececcb] text-[13px] md:text-[16px]'>
        <p>{date.toLocaleDateString()}</p>
        <p>{date.toLocaleTimeString()}</p>
    </div>
  )
}

export default Time