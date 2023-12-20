import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IoCall } from "react-icons/io5";
import { FaKitchenSet, FaPerson, FaPeopleGroup, FaUser, FaMoneyBill, FaMoneyBill1Wave  } from "react-icons/fa6";

import 'swiper/css/bundle';
import {
  FaBath,
  FaBed,
  FaChair,
  FaFemale,
  FaMale,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from 'react-icons/fa';
import ImageSlider from './ImageSlider';
import { BsPeopleFill } from "react-icons/bs";


export default function Listing() {

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/list/get/${params.id}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.id]);

  return (
    <main>
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && (
        <p className='text-center my-7 text-2xl'>Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div >
          <div className='flex border rounded-2xl border-[#2771a7] bg-[#f1f9ff] flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
            <p className='text-xl font-semibold text-sky-500 '>
              <span className='text-gray-500 text-xl'>Owner/House Name: &nbsp;</span>
              {listing.name}
            </p>
            <ul className='flex flex-col gap-2'>
            <p className='text-lg font-semibold text-red-500 '>Monthly Rate</p>
              { listing.regularPrice>0 &&
              <li>
              <p className='text-md text-cyan-700 font-semibold '>
              <span className='text-gray-500 text-md'>Single: &nbsp;</span>
              &#8377;
              {listing.regularPrice.toLocaleString('en-US')}
              {'/Person'}
              {listing.type !== 'rent' && ' For Sell'}
            </p>
              </li>}


              {listing.doubleSharingPrice>0 &&
                <li>
              <p className='text-md text-cyan-700 font-semibold '>
              <span className='text-gray-500 text-md'>2-Sharing: &nbsp;</span>
              &#8377;
              {listing.doubleSharingPrice.toLocaleString('en-US')}
              {'/Person'}
              {listing.type !== 'rent' && ' For Sell'}
            </p>
              </li>
              }


              {listing.tripleSharingPrice>0 && <li>
              <p className='text-md text-cyan-700 font-semibold '>
              <span className='text-gray-500 text-md'> 3-Sharing: &nbsp;</span>
              &#8377;
              {listing.tripleSharingPrice.toLocaleString('en-US')}
              {'/Person'}
              {listing.type !== 'rent' && ' For Sell'}
            </p>
              </li>}
            </ul>
            <p className='flex items-center mt-2 gap-2 text-blue-500  text-md '>
              <FaMapMarkerAlt className='text-red-700 text-lg' />
              <span className='text-red-700'>Location: </span>
              {listing.address}
            </p>
            <div className='flex gap-4'>
              <p className='bg-green-700 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
              </p>
            
            </div>
            <p className='text-slate-800'>
              <span className='font-semibold text-black'>Description - </span>
              {listing.description}
            </p>
            <ul className='text-pink-600 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
              <h3 className='text-cyan-700 text-md'>Amenities:</h3>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBed className='text-lg' />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds `
                  : `${listing.bedrooms} bed `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBath className='text-lg' />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths `
                  : `${listing.bathrooms} bath `}
              </li>
             {listing.parking && <li className='flex items-center gap-1 whitespace-nowrap '>
                 <span><FaParking className='text-lg' />Parking spot</span>
              </li>}
             {listing.furnished &&  <li className='flex items-center gap-1 whitespace-nowrap '>
                <span><FaChair className='text-lg' />  Furnished </span> 
              </li>}
              {listing.kitchen &&<li className='flex items-center gap-1 whitespace-nowrap '>
                <span className='flex gap-2'><FaKitchenSet className='text-lg' />  Kitchen </span> 
              </li>
                }            
            </ul>

            <ul className='text-pink-600 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
              <h3 className='text-cyan-700 text-md'>Space:</h3>
             
             {listing.single && <li className='flex items-center gap-1 whitespace-nowrap '>
                 <span className='flex gap-1'><FaUser className='text-md' />Single Person </span>
              </li>}
             {listing.double &&  <li className='flex items-center gap-1 whitespace-nowrap '>
             <span className='flex gap-2'><BsPeopleFill className='text-lg' /> Double Sharing </span> 
              </li>}
              {listing.triple &&<li className='flex items-center gap-1 whitespace-nowrap '>
                <span className='flex gap-2'><FaPeopleGroup className='text-lg' /> Triple Sharing </span> 
              </li>
                }
            </ul>
            <ul className='text-pink-600 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
              <h3 className='text-cyan-700 text-md'>Available for:</h3>
             
             {listing.girls && <li className='flex items-center gap-1 whitespace-nowrap '>
                 <span className='flex gap-1'><FaFemale className='text-lg' />Girls </span>
              </li>}
             {listing.boys &&  <li className='flex items-center gap-1 whitespace-nowrap '>
             <span className='flex gap-2'><FaMale className='text-lg' /> Boys </span> 
              </li>}
            
            </ul>
            <ul className='text-pink-600 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
              <h3 className='text-cyan-700 text-md'>Additional:</h3>
             
             {listing.security && <li className='flex items-center gap-1 whitespace-nowrap '>
                 <span className='flex gap-1'><FaMoneyBill className='text-lg' />Security Money </span>
              </li>}
             {listing.electricity &&  <li className='flex items-center gap-1 whitespace-nowrap '>
             <span className='flex gap-2'><FaMoneyBill1Wave className='text-lg' /> Electricity Bill </span> 
              </li>}
            
            </ul>
            
            
            <ImageSlider  images={listing.imageUrls} />
            <a href={`tel:${currentUser.phone}`} className='w-[100%]'>
              <button
                onClick={() => setContact(true)}
                className='bg-blue-900 text-white rounded-lg uppercase hover:opacity-95 p-3 w-full'
              >
               <span className='flex items-center justify-center text-lg gap-2 font-md'><IoCall  className='text-lg'/>Contact landlord</span>
              </button> 
              </a>
           
          </div>
        </div>
      )}
    </main>
  );
}