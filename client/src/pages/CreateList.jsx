import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import {  useState } from "react";
import {  useSelector } from "react-redux"
import { app } from "../firebase";
import {toast} from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'

const CreateList = () => {
  const navigate=useNavigate()
  const {currentUser}=useSelector((state)=>state.user)
    const [images, setImages]=useState([])
    const [uploading, setUploading]=useState(false)
    const [loading, setLoading]=useState(false)
    const [error, setError]=useState(false)
    const [imageUploadError, setImageUploadError]=useState()
    const [formData, setFormData]=useState({
        imageUrls:[],
        name: '',
        description:'',
        address:'',
        type:'available',
        bedrooms:1,
        bathrooms:1,
        regularPrice:0,
        doubleSharingPrice:0,
        tripleSharingPrice:0,
        parking:false,
        furnished:false,
        single:false,
        double:false,
        triple:false,
        electricity:false,
        kitchen:false,
        girls:false,
        boys:false,
        security:false,
        
    })
    console.log("img",images)
    console.log("form data",formData)
const handleUploadImage=()=>{
setUploading(true)
    if(images.length>0 && images.length<7){
        const promises=[]
        for(let i=0;i<images.length;i++){
            promises.push(storageImage(images[i]))
        }
        Promise.all(promises).then((urls)=>{
            setFormData({...formData, imageUrls: formData.imageUrls.concat(urls)
            })
            setImageUploadError(false)
            setUploading(false)
        }).catch((err)=>{
            setImageUploadError("Image upload failed (less than 2MB required)")
            setUploading(false)
        })
    }else{
        setImageUploadError("Only up to 6 images can be uploaded")
        setUploading(false)
    }
}

const storageImage=async(image)=>{
return  new Promise((resolve, reject)=>{
    const storage=getStorage(app)
    const fileName=new Date()+ image.name;
    const storageRef=ref(storage, fileName)
    const uploadTask=uploadBytesResumable(storageRef, image)
    uploadTask.on("state_changed", 
    (snapshot)=>{
        const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100
        console.log(`Upload is ${progress}% done`);

    },
    (error)=>{reject(error)},
    ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
            resolve(downloadURL)
        })
    }
    )
})
}

//Remove image
const handleRemoveImage=(index)=>{
    setFormData({
        ...formData,
        imageUrls: formData.imageUrls.filter((_, i) => i !== index),
      });

}

const handleChange=(e)=>{

if(e.target.id==='available'|| e.target.id==='unavailable'){
  setFormData({
    ...formData, 
    type: e.target.id
  })
}
if(e.target.id==='parking'||  e.target.id==='furnished' || e.target.id==='security' || e.target.id==='kitchen'|| e.target.id==='electricity'|| e.target.id==='boys'|| e.target.id==='girls'|| e.target.id==='single'|| e.target.id==='double'|| e.target.id==='triple'){
  setFormData({
    ...formData, 
    [ e.target.id]: e.target.checked
  })
}
if(e.target.type==='number'|| e.target.type==='text' || e.target.type==='textarea'){
  setFormData({
    ...formData, 
    [ e.target.id]: e.target.value

  })
}

}

const handleSubmit=async(e)=>{
  e.preventDefault();
  try{
      if(formData.imageUrls.length<1){
        toast.error("Must have atleast 1 image")
        return;
      }
    setLoading(true)
    setError(false)
    const data=await fetch('/api/list/create-list', {
      method:'POST',
      headers:{
        'Content-Type':'application/json'
        },
        body:JSON.stringify({...formData,
          userRef: currentUser?._id} )
        
    })
    const res=await data.json()
    console.log("after ceated list, result", res)
    setLoading(false)
    toast.success("List Created")
    navigate(`/view-list/${res._id}`)
    if(res.success===false){
      setError(res.message)
    }
  }catch(err){
    console.log(err.message)
    setLoading(false)
    setError(err.message)
  }
}
  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>
        Create Your Rental House List
      </h1>
      <form className='flex flex-col sm:flex-row gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 flex-1'>
          <input
            type='text'
            onChange={handleChange}
            value={formData.name}
            placeholder='Name'
            className='border p-3 rounded-lg'
            id='name'
            maxLength='62'
            minLength='2'
            required
                 />
          <input
            type='text'
            onChange={handleChange}
            value={formData.contact}
            placeholder='Owner Contact Number'
            className='border p-3 rounded-lg'
            id='contact'
            maxLength='15'
            minLength='8'
            required
                 />
          <textarea
            type='text'
            placeholder='Description(Optional)'
            className='border p-3 rounded-lg'
            id='description'
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type='text'
            placeholder='Address(local area, district, pin-code,  state, country)'
            className='border p-3 rounded-lg'
            id='address'
            required
            onChange={handleChange}
            value={formData.address}
          />
          <div className='flex gap-6 flex-wrap'>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='available'
                className='w-5'
                onChange={handleChange}
            checked={formData.type==='available'}
              />
              <span>Available</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='unavailable'
                className='w-5'
                onChange={handleChange}
            checked={formData.type==='unavailable'}
              />
              <span>Unavailable</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='parking'
                className='w-5'
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking spot</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='boys'
                className='w-5'
                onChange={handleChange}
                checked={formData.boys}
              />
              <span>Boys</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='girls'
                className='w-5'
                onChange={handleChange}
                checked={formData.girls}
              />
              <span>Girls</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='security'
                className='w-5'
                onChange={handleChange}
                checked={formData.security}
              />
              <span>Security</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='electricity'
                className='w-5'
                onChange={handleChange}
                checked={formData.electricity}
              />
              <span>Electricity</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='kitchen'
                className='w-5'
                onChange={handleChange}
                checked={formData.kitchen}
              />
              <span>Kitchen</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='single'
                className='w-5'
                onChange={handleChange}
                checked={formData.single}
              />
              <span>For Single </span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='double'
                className='w-5'
                onChange={handleChange}
                checked={formData.double}
              />
              <span>2-Sharing</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='triple'
                className='w-5'
                onChange={handleChange}
                checked={formData.triple}
              />
              <span>3-Sharing</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='furnished'
                className='w-5'
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>
          </div>
          <div className='flex flex-wrap gap-6'>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='bedrooms'
                min='1'
                max='10'
                required
                className='p-3 border border-gray-300 rounded-lg'
                onChange={handleChange}
               value={formData.bedrooms}
              />
              <p>Beds</p>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='bathrooms'
                min='1'
                max='10'
                required
                className='p-3 border border-gray-300 rounded-lg'
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <p>Baths</p>
            </div>
              {formData.single&&
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='regularPrice'
                min='500'
                max='10000000'
                required
                className='p-3 border border-gray-300 rounded-lg'
                onChange={handleChange}
                value={formData.regularPrice}
              />
                <div className='flex flex-col items-center'>
                <p> Rent for Single Person </p>
              </div>
            </div>}
           {formData.double &&
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='doubleSharingPrice'
                min='500'
                max='10000000'
                required
                className='p-3 border border-gray-300 rounded-lg'
                onChange={handleChange}
                value={formData.doubleSharingPrice}
              />
              <div className='flex flex-col items-center'>
                <p>Double-Sharing Rent  <span className="text-red-500">{'(per Person)'}</span></p>
              </div>
            </div>
            }

           { formData.triple &&
           <div className='flex items-center gap-2'>
              <input
                type='number'
                id='tripleSharingPrice'
                min='500'
                max='10000000'
                required
                className='p-3 border border-gray-300 rounded-lg'
                onChange={handleChange}
                value={formData.tripleSharingPrice}
              />
              <div className='flex flex-col items-center'>
                <p>Triple-Sharing Rent  <span className="text-red-500">{'(per Person)'}</span></p>
              </div>
            </div>}
            
          </div>
        </div>
        <div className='flex flex-col flex-1 gap-4'>
          <p className='font-semibold'>
            Images:
            <span className='font-normal text-gray-600 ml-2'>
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className='flex gap-4'>
            <input
          onChange={(e)=>setImages(e.target.files)}
              className='p-3 border border-gray-300 rounded w-full'
              type='file'
              id='images'
              accept='image/*'
              multiple
            />
            <button
            disabled={uploading}
              type='button'
            onClick={handleUploadImage}
              className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
            >
                {uploading ? "Uploading...": "Upload"}
            </button>
          </div>
            {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className='flex justify-between p-3 border items-center'
              >
                <img
                  src={url}
                  alt='listing image'
                  className='w-20 h-20 object-contain rounded-lg'
                />
                <button
                  type='button'
                  onClick={() => handleRemoveImage(index)}
                  className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                >
                  Delete
                </button>
              </div>
            ))}
          <p className='text-red-700 text-sm'>{imageUploadError && imageUploadError }
          </p>
 
          <button type="submit"   className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
          >
            {loading? 'Creating...' : 'Create List'}
          </button>
         { error &&<p className='text-red-700 text-sm'>{error}</p>}
        </div>
      </form>
    </main>
  );
}

export default CreateList
