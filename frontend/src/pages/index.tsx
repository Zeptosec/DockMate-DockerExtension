import { useEffect, useState } from 'react'

export default function Home() {
  const [textbox1, setTextbox1] = useState('');
  const [textbox2, setTextbox2] = useState('');
  const [result, setResult] = useState('');
  
  const welpGG = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },

    };

    const response = await fetch("http://localhost:8000/api",requestOptions);
    const data = await response.json()
    console.log(data)
  };

  useEffect(() => {
    welpGG()
  }, [])
  
  return (
    <main>
      <div>
        helloWorld
      </div>
    </main>
  )
}
