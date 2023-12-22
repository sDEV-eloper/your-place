import  { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import toast from 'react-hot-toast'
import OAuth from '../components/OAuth'
import PhoneAuth from './PhoneAuth'

const SignUp = () => {
const [username, setUsername]=useState()
const [user, setUser] = useState(null);
const [email, setEmail]=useState()
const [phone, setPhone]=useState()
const [countryCode, setCountryCode] = useState("+91");
const [password, setPassword]=useState()

const navigate=useNavigate()
const handleSubmit=async(e)=>{
  e.preventDefault();
  try {
    const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          phone:countryCode+phone,
          password,
        }),
      });
    console.log("response", response);
    if (response.ok) {
      const responseData = await response.json();
     toast.success(responseData); 
     navigate('/sign-in')
    } else {
      const errorData = await response.json();
      toast.error(errorData); 
    }

    
  } catch (error) {
    toast.error(error)
  }
}

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
          SIGN UP
        </h1>
        <form className="space-y-4 md:space-y-3" onSubmit={handleSubmit}>
          <div>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
            <input type="text" name="username" id="username" value={username}  onChange={(e)=>setUsername(e.target.value)}   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" required />
          </div>
          <div>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input type="email" name="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@mail.com" required />
          </div>
          <div>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
            <div className='flex '>
          
       <PhoneAuth phone={phone} setPhone={setPhone} countryCode={countryCode} setCountryCode={setCountryCode} user={user} setUser={setUser}/>
       {console.log("phone", phone)}
            </div>
               </div>
          <div>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input type="password" name="password" id="password" placeholder="••••••••" value={password}  onChange={(e)=>setPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
         
   
<button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
         <OAuth/>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Already have an account? <Link to="/sign-in" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign In here</Link>
          </p>
        </form>
      </div>
    </div>
  </div>
</section>

    </>
  )
}

export default SignUp