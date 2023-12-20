
import { Link } from "react-router-dom"

import PhoneAuth from "./PhoneAuth"


const SignIn = () => {

  return (
    <>
    <section className="bg-[url('https://images.pexels.com/photos/4467735/pexels-photo-4467735.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] dark:bg-gray-900 bg-cover ">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    
    <div className="w-full backdrop-brightness-75 rounded-lg shadow-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl  bg-white rounded-lg p-2 font-bold leading-tight tracking-tight text-cyan-800 md:text-2xl dark:text-white text-center">
          SIGN-IN WITH OTP
        </h1>
        <div className="space-y-4 md:space-y-3" >
          <PhoneAuth/>
        </div>
      </div>
    </div>
  </div>
</section>
    </>
  )
}

export default SignIn
