import { useState } from "react"


const PhoneAuth = () => {
    const [number, setNumber]=useState()
  return (
    <div>
      <input type="text" onChange={(e)=>setNumber(e.target.value)} value={number}required/>
      <button>Send OTP</button>
    </div>
  )
}

export default PhoneAuth
