import React from 'react'

const Qualification_commponent = () => {
  return (
    <>
    <scetion className="w-full h-full">

    <div className='w-full py-20 px-5'>
        <h2 className='text-5xl'>qalification_commponentu</h2>
        <div className='w-full flex justify-between'>
            {
              ["ssc", "hsc","rwd","mern"].map((itm,idx)=>(
                <div key={idx}>
                  <h3 className='text-3xl' >{itm}</h3>
                </div>
              ))
            }

        </div>
    </div>
    </scetion>
    </>
  )
}

export default Qualification_commponent