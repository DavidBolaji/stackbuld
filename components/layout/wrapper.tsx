import React, { PropsWithChildren } from 'react'

interface Iwrapper extends PropsWithChildren {}

const Wrapper:React.FC<Iwrapper> = ({children}) => {
  return (
    <div data-testid="wrapper-div" className='max-w-7xl mx-auto lg:px-0 md:px-4 px-2'>{children}</div>
  )
}

export default Wrapper