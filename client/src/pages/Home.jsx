import React, { useEffect, useState } from 'react'

export default function Home() {
const [data, setData]=useState(null)

useEffect(()=>{
  async function fetchData(){
    try{
      const d= await fetch('http://localhost:8080/test');
     const dt= await  d.text()
      setData(dt)
    }catch(err){
      console.log(err)
    }
  }
  fetchData();
},[])
  
  return (
      <div className='text-black'>
        {console.log("home page, data", data)}
        <h1>Welcome to the home page!</h1>
        <h1>Data is {data}</h1>

    </div>
  )
}

