
import  {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase'
import { signInSuccess } from '../assets/redux/userSlice/userSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const OAuth = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const handleGoogleAuth=async()=>{
        try
        {
            const provider=new GoogleAuthProvider()
            const auth = getAuth(app);
            const result=await signInWithPopup(auth, provider);
            
            console.log("result", result)
            const  res= await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                }, 
                body: JSON.stringify({
                    name:result?.user?.displayName,
                    phone:result?.user?.phone,
                    
            })
        })
        const data=await res.json()
        console.log("data", data)
        dispatch(signInSuccess(data))
        navigate('/')
        }
        catch(err){
            console.log("Couldn't sign in", err)
        }
    }
  return (
    <>
    <button onClick={handleGoogleAuth}  className="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Continue with Google</button>

    </>
  )
}

export default OAuth
