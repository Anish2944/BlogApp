import React from 'react'
import Button from './Button'
function Delete({onClick}) {
  return (
    <div className='flex absolute top-12 py-20 right-5 my-20 duration-200 items-center justify-center w-full'>
        <div className={`mx-auto w-full max-w-lg bg-background rounded-xl 
                    p-10 border border-black/10`}>
            
            <h2 className='text-center pb-10  text-2xl font-bold leading-tight'>
                Are you sure to delete this Post?
            </h2>
                <div className=' flex pt-6 flex-col justify-between space-y-5'>
                    <Button onClick={onClick} className='w-full bg-red-600' > Yes</Button>
                    <Button className='w-full bg-green-600' > No</Button> 
                </div>
        </div>
    </div>
  )
}

export default Delete