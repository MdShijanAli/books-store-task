import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { CloseIcon } from '../components/icons/CloseIcon';
import { LoveIcon } from '../components/icons/LoveIcon';
import Search from '../components/Search';

export default function Header({ setSearchData, wishList = 0, setWishList }) {
  const [wishLists, setWishLists] = useState([]);
  const [isWishListModal, setIsWishListModal] = useState(false);
  const modalRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getWishList = () => {
      const storedWishList = localStorage.getItem("wishLists");
      return storedWishList ? JSON.parse(storedWishList) : [];
    };

    const wishList = getWishList();
    setWishLists(wishList);
  }, []);

  // Handle closing modal when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsWishListModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  // Close modal when route changes
  useEffect(() => {
    setIsWishListModal(false);
  }, [location]);

  const handleShowWishLists = () => {
    setIsWishListModal(!isWishListModal);
  };

  const handleShowBooks = () => {
    navigate('/wishlist');
  };

  const handleRemoveWish = (id) => {
    console.log('Remove Id', id);
    const updatedWishList = wishLists?.filter((wishList) => wishList.id !== id);
    setWishLists(updatedWishList);

    localStorage.setItem("wishLists", JSON.stringify(updatedWishList));
    setWishList(wishList - 1)
  };

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
          <button onClick={handleShowWishLists}>
            <LoveIcon className="w-8 h-8" />
            {wishList > 0 && (
              <span className='absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center'>
                {wishList}
              </span>
            )}
          </button>

          {isWishListModal && (
            <div ref={modalRef} className='absolute top-full transition duration-500 ease-in-out right-0 w-[300px] border bg-white p-3 shadow-lg z-10'>
              {wishLists.length > 0 ? (
                <>
                  {wishLists.slice(0, 5).map((wish) => (
                    <div key={wish.id} className='grid grid-cols-3 gap-3 mb-2 items-center'>
                      <div className='col-span-1'>
                        <div className='h-20'>
                          <Link to={`/book/${ wish?.id }`}>
                            <img className="w-full h-full bg-cover" src={wish?.formats["image/jpeg"]} alt={wish?.title} />
                          </Link>
                        </div>
                      </div>
                      <div className='col-span-2 flex justify-between'>
                        <div>
                          <h3 className='text-sm font-semibold'>
                            <Link to={`/book/${ wish?.id }`}>
                              <span className="font-semibold hover:text-blue-950">{wish?.title.slice(0, 30)}...</span>
                            </Link>
                          </h3>
                          <p className='text-xs'>{wish?.authors?.[0]?.name}</p>
                        </div>

                        <div>
                          <button onClick={() => handleRemoveWish(wish?.id)}>
                            <CloseIcon className="text-red-600" />
                          </button>
                        </div>

                      </div>
                    </div>
                  ))}

                  <div className='mt-3 text-center'>
                    <button onClick={handleShowBooks} className='bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition duration-200'>
                      See All
                    </button>
                  </div>
                </>
              ) : (
                <div className='text-center text-sm text-gray-500'>No items in wishlist</div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
