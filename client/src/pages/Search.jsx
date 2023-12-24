import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingItem from '../components/ListingItem';

export default function Search() {
  const navigate = useNavigate();
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    sort: 'created_at',
    order: 'desc',
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const parkingFromUrl = urlParams.get('parking');
    const girlsFromUrl = urlParams.get('girls');
    const boysFromUrl = urlParams.get('boys');
    const securityFromUrl = urlParams.get('security');
    const kitchenFromUrl = urlParams.get('kitchen');
    const singleFromUrl = urlParams.get('single');
    const doubleFromUrl = urlParams.get('double');
    const tripleFromUrl = urlParams.get('triple');

    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      girlsFromUrl || boysFromUrl || singleFromUrl || doubleFromUrl || tripleFromUrl || kitchenFromUrl || securityFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebarData({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
        parking: parkingFromUrl === 'true' ? true : false,
        boys: boysFromUrl === 'true' ? true : false,
        girls: girlsFromUrl === 'true' ? true : false,
        kitchen: kitchenFromUrl === 'true' ? true : false,
        single: singleFromUrl === 'true' ? true : false,
        double: doubleFromUrl === 'true' ? true : false,
        triple: tripleFromUrl === 'true' ? true : false,
        security: securityFromUrl === 'true' ? true : false,
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/list/get?${searchQuery}`);
      console.log("res--->", res)
      const data = await res.json();
      console.log("data---->", data)
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
    console.log("listings------>", listings)
  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === 'all' ||
      e.target.id === 'available' ||
      e.target.id === 'unavailable'
    ) {
      setSidebarData({ ...sidebarData, type: e.target.id });
    }

    if (e.target.id === 'searchTerm') {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }

    if (   e.target.id==='parking'||  e.target.id==='security' || e.target.id==='kitchen'|| e.target.id==='electricity'|| e.target.id==='boys'|| e.target.id==='girls'|| e.target.id==='single'|| e.target.id==='double'|| e.target.id==='triple'  ) {
      setSidebarData({
        ...sidebarData,
        [e.target.id]:
          e.target.checked || e.target.checked === 'true' ? true : false,
      });
    }

    if (e.target.id === 'sort_order') {
      const sort = e.target.value.split('_')[0] || 'created_at';

      const order = e.target.value.split('_')[1] || 'desc';

      setSidebarData({ ...sidebarData, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebarData.searchTerm);
    urlParams.set('type', sidebarData.type);
    urlParams.set('parking', sidebarData.parking);
    urlParams.set('boys', sidebarData.boys.toString());
  urlParams.set('girls', sidebarData.girls.toString());
  urlParams.set('kitchen', sidebarData.kitchen.toString());
  urlParams.set('single', sidebarData.single.toString());
  urlParams.set('double', sidebarData.double.toString());
  urlParams.set('triple', sidebarData.triple.toString());
  urlParams.set('security', sidebarData.security.toString());
    urlParams.set('sort', sidebarData.sort);
    urlParams.set('order', sidebarData.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/list/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };
  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7  border-b-2 md:border-r-2 md:min-h-screen w-1/3'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
          <div className='flex items-center gap-2'>
            <label className='whitespace-nowrap font-semibold'>
              Search Term:
            </label>
            <input
              type='text'
              id='searchTerm'
              placeholder='Search...'
              className='border rounded-lg p-3 w-full'
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Type:</label>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='all'
                className='w-5'
                onChange={handleChange}
                checked={sidebarData.type === 'all'}
              />
              <span>Both</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='available'
                className='w-5'
                onChange={handleChange}
                checked={sidebarData.type === 'available'}
              />
              <span>Available</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='unavailable'
                className='w-5'
                onChange={handleChange}
                checked={sidebarData.type === 'unavailable'}
              />
              <span>Unavailable</span>
            </div>
          </div>
          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Amenities:</label>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='parking'
                className='w-5'
                onChange={handleChange}
                checked={sidebarData.parking}
              />
              <span>Parking</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='boys'
                className='w-5'
                onChange={handleChange}
                checked={sidebarData.boys}
              />
              <span>Boys</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='girls'
                className='w-5'
                onChange={handleChange}
                checked={sidebarData.girls}
              />
              <span>Girls</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='security'
                className='w-5'
                onChange={handleChange}
                checked={sidebarData.security}
              />
              <span>Security</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='electricity'
                className='w-5'
                onChange={handleChange}
                checked={sidebarData.electricity}
              />
              <span>Electricity</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='kitchen'
                className='w-5'
                onChange={handleChange}
                checked={sidebarData.kitchen}
              />
              <span>Kitchen</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='single'
                className='w-5'
                onChange={handleChange}
                checked={sidebarData.single}
              />
              <span>For Single </span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='double'
                className='w-5'
                onChange={handleChange}
                checked={sidebarData.double}
              />
              <span>2-Sharing</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='triple'
                className='w-5'
                onChange={handleChange}
                checked={sidebarData.triple}
              />
              <span>3-Sharing</span>
            </div>
         
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Sort:</label>
            <select
              onChange={handleChange}
              defaultValue={'created_at_desc'}
              id='sort_order'
              className='border rounded-lg p-3'
            >
              <option value='regularPrice_desc'>Price high to low</option>
              <option value='regularPrice_asc'>Price low to high</option>
              <option value='createdAt_desc'>Latest</option>
              <option value='createdAt_asc'>Oldest</option>
            </select>
          </div>
          <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
            Search
          </button>
        </form>
      </div>
      <div className='flex-1'>
        <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5 w-2/3'>
          Listing results:
        </h1>
        <div className='p-7 flex flex-wrap gap-4'>
          {!loading && listings.length === 0 && (
            <p className='text-xl text-slate-700'>No listing found!</p>
          )}
          {loading && (
            <p className='text-xl text-slate-700 text-center w-full'>
              Loading...
            </p>
          )}

          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}

          {showMore && (
            <button
              onClick={onShowMoreClick}
              className='text-green-700 hover:underline p-7 text-center w-full'
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}