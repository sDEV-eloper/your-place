import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase.js'
import toast from 'react-hot-toast'
import { MdAdd } from "react-icons/md";
import { FaEdit, FaRegEye } from "react-icons/fa";
import { updateUserFailure, updateUserSuccess } from "../assets/redux/userSlice/userSlice.js"
import { Link } from "react-router-dom"
const Profile = () => {
  const userData=useSelector((state)=>state.user.currentUser)
const fileRef=useRef(null)
const [file, setFile]=useState(undefined)
const [filePercentage, setFilePercentage]=useState()
const [uploadSuccess, setUploadSuccess]=useState()
const [err, setErr]=useState()
const [formData, setFormData]=useState({})
const dispatch=useDispatch()


useEffect(()=>{
  console.log("use effect calling")
  if(file){
    console.log("use effect calling handleFileUpload")
  handleFileUpload(file);
}
},[file])

const handleFileUpload = (file) => {
  const storage = getStorage(app);
  const fileName = new Date().getTime() + file.name;
  const storageRef = ref(storage, fileName);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    'state_changed',
    (snapshot) => {
      const progress =
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setFilePercentage(Math.round(progress));
      setUploadSuccess(true)
      // toast.success("image updated success") 

    },
    (error) => {
      setErr(error)
      setUploadSuccess(false);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
        setFormData({ ...formData, avatar: downloadURL })
      );
    }
  );
};


const handleChange = (e) => {
  setFormData({ ...formData, [e.target.id]: e.target.value });
};



//Update 
const handleUpdate=async(e)=>{
 
e.preventDefault();
try {
  // dispatch(updateUserStart());

  const res = await fetch(`/api/user/update/${userData._id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  const data = await res.json();
  console.log("data", data)
  if (data.success === false) {
    dispatch(updateUserFailure(data.message));
    return;
  }

  dispatch(updateUserSuccess(data));
  toast.success("Updated Successfully")
} catch (error) {
  dispatch(updateUserFailure(error.message));
}
}



  return (
    <>
  
        <section className="bg-gray-200 ">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    <div className="w-full bg-transparent  md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 ">
      <div className="p-6 space-y-4 md:space-y-2 sm:p-8 border rounded-lg bg-gray-100">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-800  text-center py-1 w-full md:text-2xl ">
          PROFILE
        </h1>
        <form className="space-y-4 md:space-y-3" onSubmit={handleUpdate}>
        <div className="flex justify-center flex-col items-center">
        <input onChange={(e) => setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept="image/*"/>
        <img onClick={() => fileRef.current.click()} src={userData?.avatar || formData?.avatar }  alt="" className="w-1/4 rounded-full h-24" />
        {uploadSuccess && formData ? 
      <p className="text-green-500 text-sm font-md"> Profile image updated successfully </p>
      :  
      <p className="text-red-500 text-lg font-md">{err}</p>  
      }
      <p className="underline text-xs flex gap-1 items-center justify-center text-red-400">
        <FaEdit/>
        click on image to change
        </p>
        </div>
          <div className="flex items-center gap-6">
            <input type="text" name="username" id="username" value={userData?.username} readOnly    className="bg-gray-200 border border-gray-300 text-gray-400 sm:text-sm rounded-lg  block w-full p-2 focus:outline-none "  />
          </div>
          <div className="flex items-center gap-6">
             <input type="email" name="email" id="email" value={userData?.email} readOnly className="bg-gray-200 border border-gray-300 text-gray-400 sm:text-sm rounded-lg  block w-full p-2.5 focus:outline-none " />
          </div>
          <div className="flex items-center gap-6">
             <input type="phone" name="phone" id="phone" value={userData?.phone.substr(3)} readOnly className="bg-gray-200 border border-gray-300 text-gray-400 sm:text-sm rounded-lg  block w-full p-2.5 focus:outline-none"   />
          </div>
          <div className="flex items-center gap-6">
            <input type="password" name="password" id="password" placeholder="password"  onChange={handleChange}  className="bg-gray-50 border-2 border-gray-500 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "  />
          </div>
         
          <button type="submit" className="w-full text-white bg-primary-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">UPDATE</button>
          <div className="flex gap-2">
           
            <Link to='/create-list'  className=" flex justify-center items-center w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
              <MdAdd size={20}/>
              CREATE LISTING 
            </Link>
            
          <Link to={`/view-list/${userData._id}`} className="flex justify-center items-center w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
   
<span className="mr-1">
<FaRegEye size={20} />
</span>
            VIEW LISTING
            </Link>
      
          </div>
            </form>
      </div>
   
    </div>
  </div>
</section>

    </>
  )
}

export default Profile