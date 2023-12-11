
import { CiSearch } from "react-icons/ci";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Avatar from 'react-avatar'



export default function Header() {
  const userData=useSelector((state)=>state.user.currentUser)
  // console.log("header user data", userData)
  return (
    <header className="bg-[#e6f4f8] p-4 flex justify-between shadow-md">
     <Link to="/"> 
     <h1 className="rounded-lg flex gap-1 bg-[#164863] w-fit py-1 px-2 items-center flex-wrap">
        <span className="text-white text-xl font-bold">Your</span>
        <span className="text-[#9BBEC8] text-xl font-bold">Place</span>
      </h1>
      </Link>
      <form className=" w-1/3 bg-white flex items-center px-4 rounded">
        <input type="text"  placeholder="Search your place..." className=" w-full p-2 bg-transparent focus:outline-none"/>
<span className="cursor-pointer text-xl"><CiSearch /></span>
      </form>
      <nav className="w-1/4">
        <ul className="flex gap-12 items-center text-[#3489a3] ">
            <li className="hover:font-medium cursor-pointer hidden sm:inline">Home</li>
            <li className="hover:font-medium cursor-pointer hidden sm:inline">About</li>
           {!userData ?
            (<Link to="/sign-in">
            <li className="hover:font-medium cursor-pointer hidden sm:inline">Sign In</li>
            </Link>) 
             : 
             (
              <div className="flex items-center gap-2">
                <p className="text-sm">{userData.username} </p>
                <Link to='/profile'>
               { userData?.avatar ? <img src={userData?.avatar} className="w-8 rounded-full" alt="user" referrerPolicy="no-referrer"/>: <Avatar name={userData?.username} size={40} round="10px"/> }
                </Link>
              </div>
            )
            }       
        </ul>
      </nav>
    </header>
  );
}
