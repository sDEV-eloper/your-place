import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const ViewList = () => {
    const {currentUser}=useSelector(state=>state.user)
    const [listData, setListData]=useState([])
    const fetchListData=async()=>{
        try{
            const response=await fetch(`/api/list/get-list/${currentUser._id}`,
            {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
              });
            console.log("response-->", response)
            const data= await response.json();
            setListData(data)
            console.log("data-->", data)
        }catch(err){
            console.log("Error in fetching data")
        }

    }
    useEffect(()=>{
fetchListData()
    },[])

    console.log("listdata", listData);
  return (
    <div className='flex flex-wrap'>
      
{
     listData.map((item)=>
     (
<div key={item._id} className="m-4 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

    <img className="rounded-t-lg" src={item.imageUrls[0]} alt />
  
  <div className="p-5">
    <a href="#">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.name}</h5>
    </a>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.address}</p>
    <div className='flex gap-2'>
    <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      Edit
    </button>
    <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
      Delete
    </button>
    </div>
  </div>
</div>
     ))
}
    </div>
  )
}

export default ViewList
