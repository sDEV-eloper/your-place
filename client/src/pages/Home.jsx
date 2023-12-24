import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoImages } from "react-icons/io5";
import { FaSearchengin } from "react-icons/fa";
import { MdCreateNewFolder } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import ListingItem from '../components/ListingItem';

export default function Home() {
  const [unavailableListings, setUnavailableListings] = useState([]);
  const [availListings, setAvailListings] = useState([]);

  useEffect(() => {
  
    const fetchAvailableRentListings = async () => {
      try {
        const res = await fetch('/api/list/get?type=available&limit=100');
        const data = await res.json();
        setAvailListings(data);
        fetchUnavailableListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchUnavailableListings = async () => {
      try {
        const res = await fetch('/api/list/get?type=unavailable&limit=4');
        const data = await res.json();
        setUnavailableListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAvailableRentListings();
  }, []);
  return (
    <div>
      {/* top */}
<section className="bg-white dark:bg-gray-900">
  <div className="grid max-w-screen-xl px-6 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
    <div className="mr-auto place-self-center lg:col-span-7">
      <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Uniting Tenants and Owners for Effortless Housing Solutions!</h1>
      <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400"> YourPlace simplifies the tenant-owner connection, offering a user-friendly platform for effortless room finding and hassle-free tenant seeking. Discover your perfect match, connect seamlessly, and thrive in a stress-free housing experience.</p>
  <div className='grid grid-cols-2 gap-4  '>
  <p  className="inline-flex items-center justify-start px-5 py-3 text-base font-medium  text-[#376ca8]  hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
     <span className='mr-2'><FaSearchengin /></span>
      Effortless Search
      </p>
      <p  className="inline-flex items-center justify-start px-5 py-3 text-base font-medium  text-[#376ca8]  hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
      <span className='mr-2'><IoCall /></span>
      Direct Owner Contact
      </p> 
      <p  className="inline-flex items-center justify-start px-5 py-3 text-base font-medium  text-[#376ca8]  hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
      <span className='mr-2'><IoImages /></span>
      Room Visual
      </p> 
      <p  className="inline-flex items-center justify-start px-5 py-3 text-base font-medium  text-[#376ca8]  hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
     
<span className='mr-2'><MdCreateNewFolder /></span>
      Become a Host
      </p> 
  </div>
    </div>
    <div className="hidden lg:mt-0 lg:col-span-5 lg:flex ">
      <img src="https://cdn.pixabay.com/photo/2016/05/21/21/52/house-1407562_1280.jpg" alt="rental-house" className='rounded-xl'/>
    </div>                
  </div>
</section>




      {/* listing results for offer, sale and rent */}

      <div className='max-w-8xl mx-auto p-4 md:p-6 flex flex-col gap-8 my-10 bg-[#F6F7C4] '>
     
        {availListings &&availListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Show more places for rent</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {availListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {unavailableListings && unavailableListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>Show more places for sale</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {unavailableListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}