
import { CiSearch } from "react-icons/ci";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Avatar from 'react-avatar'
import { useEffect, useState } from "react";



export default function Header() {
  const navigate=useNavigate()
  const [searchTerm, setSearchTerm]=useState()

  const handleSubmit=(e)=>{
  e.preventDefault();
const urlParams=new URLSearchParams(window.location.search)
urlParams.set('searchTerm', searchTerm)
const searchQuery=urlParams.toString()
navigate(`/search?${searchQuery}`)
}
  useEffect(()=>{
    const urlParams=new URLSearchParams(location.search)
const searchTermFromUrl=urlParams.get('searchTerm')
if(searchTermFromUrl){
  setSearchTerm(searchTermFromUrl)
}
  },[location.search])



  const userData=useSelector((state)=>state.user.currentUser)
  return (
    <header className="bg-[#1a373f] p-4 flex justify-between shadow-md">
     <Link to="/"> 
     <h1 className="rounded-lg flex gap-1 bg-[#164863] w-fit py-1 px-2 items-center flex-wrap">
        <span className="text-white text-xl font-bold">Your</span>
        <span className="text-[#9BBEC8] text-xl font-bold">Place</span>
      </h1>
      </Link>
      <form onSubmit={handleSubmit} className=" w-1/3 bg-white flex items-center px-4 rounded">
        <input type="text" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}  placeholder="Search your place..." className=" w-full p-2 bg-transparent focus:outline-none"/>
<span className="cursor-pointer text-xl"><CiSearch /></span>
      </form>
      <nav className="w-1/4">
        <ul className="flex gap-12 items-center text-[#57cdd6] ">
            <Link to='/'><li className="hover:underline cursor-pointer hidden sm:inline">Home</li></Link>
            <Link to='/about'><li className="hover:underline cursor-pointer hidden sm:inline">About</li></Link>
           {!userData ?
            (<Link to="/sign-in">
            <li className="hover:font-medium cursor-pointer hidden sm:inline">Sign In</li>
            </Link>) 
             : 
             (
              <div className="flex items-center gap-2">
                <Link to='/profile'>
               { userData?.avatar ? <img src={userData?.avatar} className="w-8 h-8 rounded-full object-cover" alt="user" referrerPolicy="no-referrer"/>: <Avatar name={userData?.username} size={40} round="10px"/> }
                </Link>
              </div>
            )
            }       
        </ul>
      </nav>
    </header>
  );
}
