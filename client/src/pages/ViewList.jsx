import  { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoAdd } from "react-icons/io5";
import { list } from "firebase/storage";


const ViewList = () => {
  const navigate=useNavigate()
  const { currentUser } = useSelector((state) => state.user);
  console.log("view list currentUser", currentUser)
  const [listData, setListData] = useState([]);
  const fetchListData = async () => {
    try {
      const response = await fetch(`/api/list/get-list/${currentUser?._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("response in view list--", response)
      const data = await response.json();
      setListData(data);
      console.log("list data in view list----->",listData)
    } catch (err) {
      console.log("Error in fetching data");
    }
  };
  useEffect(() => {
    fetchListData();
  }, []);

  const handleListDelete =async (listId) => {
    try{
        const response=await fetch(`/api/list/delete-list/${listId}`,
        {
            method: 'DELETE',
          });
        const data= await response.json();
        if(data.success===false){
            console.log(data.message)
             return;
            }
        setListData((item)=>item.filter(list=>list._id!=listId))
    }catch(err){
        console.log("Error in fetching data")
    }
  };
  const handleListUpdate =async (listId) => {
   navigate(`/update-list/${listId}`)
  };


  return (
  <>
  <h1 className="text-4xl text-gray-600 text-center my-4  border-b-2 py-2 font-bold">Your Rental Lists</h1>
  {console.log("listdata len", listData.length)}
   { listData.length ?
    <div className="flex flex-wrap">
      {listData.map((item) => (
        <div
          key={item._id}
          className="m-4 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <img className="rounded-t-lg" src={item.imageUrls[0]} alt />

          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {item.name}
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {item.address}
            </p>
            <div className="flex gap-2">
              <button onClick={()=>handleListUpdate(item._id)} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Edit
              </button>
              <button
                onClick={()=>handleListDelete(item._id)}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
    :
  <div className='p-4 h-screen text-gray-500  flex flex-col items-center gap-8 justify-center text-6xl border rounded font-md'>
    <span>Sorry! Lists Not Found...</span>
    <button onClick={()=>{navigate('/create-list')}} className="bg-cyan-800 hover:bg-cyan-600 flex gap-2 items-center px-4 text-lg font-sm text-white rounded p-2 w-1/3 justify-center">Create List
    <IoAdd/>
    </button>
  </div>
  
  }</>
  );
};

export default ViewList;
