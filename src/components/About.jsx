import React from 'react'

const About = () => {
  return (
    <div className="hero h-screen w-screen">
      <div className="bg-[#0a0a0aef] h-full flex flex-col justify-center mx-auto">
        <div className="w-full mx-auto px-7 md:px-10 max-w-[1200px]">
          <div className="flex flex-col items-center justify-center space-y-6 mt-[6rem] text-white">
            <div className="text-center">
              <p className="md:text-4xl">
                At inspire, we have created a platform for everyone to freely get or create an inspirational 
                post. Happiness is free! <br />
              </p>
              <p className="p-8 md:text-4xl">— Inspire someone today.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About