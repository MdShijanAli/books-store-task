import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { LoveIcon } from '../components/icons/LoveIcon';
import Search from '../components/Search';

export default function Header({ setSearchData }) {
  

  const [wishList, setWishList] = useState(0);

  useEffect(() => {
    const getWishList = () => {
      const storedWishList = localStorage.getItem("wishLists");
      return storedWishList ? JSON.parse(storedWishList) : [];
    };

    const wishList = getWishList()
    setWishList(wishList?.length);
  }, []);

  return (
    <div className='border-b'>
      <div className='max-w-7xl mx-auto px-10 py-3 flex justify-between items-center'>
        <div className='w-72 h-auto'>
          <Link to="/"><img className='w-100 h-100' src={logo} alt="Logo" /></Link>
        </div>
        <div>
          <Search setSearchData={setSearchData} />
        </div>
        <div className='relative'>
          <LoveIcon className="w-8 h-8" />
          {wishList > 0 && (
            <span className='absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center'>
              {wishList}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
