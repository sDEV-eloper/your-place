import { useSelector } from "react-redux"


export default function Home() {
  const userData=useSelector((state)=>state.user.currentUser)
  console.log("home user data", userData)
  localStorage.setItem('user',userData);
  const storedUser = localStorage.getItem('user');
  return (
      <div className='text-black'>
        <h1>Welcome to the home page!</h1>
    </div>
  )
}

