import React from 'react'

function GoldencareLayout({children}:{children: React.ReactNode}) {
  return (
    <div className='cursor-default'>
        {children}
    </div>
  )
}

export default GoldencareLayout