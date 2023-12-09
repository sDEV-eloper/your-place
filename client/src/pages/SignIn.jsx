import { useState } from "react"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { signInFail, signInStart, signInSuccess } from "../assets/redux/userSlice/userSlice"


const SignIn = () => {
  const navigate =useNavigate()
  const dispatch=useDispatch()
 const {loading, error}=useSelector((state)=>state.user)
  const [email, setEmail]=useState('')
const [password, setPassword]=useState('')
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      dispatch(signInStart())
      const response = await fetch('/api/auth/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

    
      if (response.ok) {
        const userResponseData = await response.json();
        console.log("urd", userResponseData)
       toast.success(`${userResponseData.username} sign in successfully`); 
       dispatch(signInSuccess(userResponseData))
       navigate('/')
      } else {
        const errorData = await response.json();
        console.log(errorData)
        dispatch(signInFail(errorData.message))
        toast.error(`${errorData.message}`); 
      }
  
      
    } catch (error) {
      toast.error(error)
      dispatch(signInFail(error))
    }
  }
  return (
    <>
    <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
          SIGN IN
        </h1>
        <form className="space-y-4 md:space-y-3" onSubmit={handleSubmit} >
          <div>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input type="email" name="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
         
          </div>
          <div>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input type="password" name="password" id="password" placeholder="••••••••"  value={password} onChange={(e)=>setPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
         
          <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">SIGN IN</button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Don&apos;t have an account? <Link to="/sign-up" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign Up here</Link>
          </p>
        </form>
      </div>
    </div>
  </div>
</section>
    </>
  )
}

export default SignIn
