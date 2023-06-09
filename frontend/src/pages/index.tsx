import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
  const [containers, setContainers] = useState(2);

  
  return (
    <main>
        <div className='break'>
      <h3>Dockmate extension demo</h3>
      </div>
      <div className='break'>
      <button className='button1'>
      Get data
      </button>
      </div>
      <div className='break'>
      <form>
        <div><label htmlFor="Service">Service</label></div>
        <input type='text'>
      
      </input>
      <div className='break'>
      <div><label htmlFor="MaxSize">Max Service Size(GB)</label></div>
      <input type='number'>
      
      </input>
      </div>
      <button className='button2'>
      Create Service
      </button>
      </form>
      </div>
    
     const: {containers}

    </main>
  )
}
