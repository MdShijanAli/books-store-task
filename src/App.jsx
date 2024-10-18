import { useEffect, useState } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Header from './common/Header'
import BookDetails from './components/BookDetails'
import WishList from './components/WishList'
import Home from './views/Home'

function App() {
  const [searchData, setSearchData] = useState('');
  const [wishList, setWishList] = useState(0);
  const [wishLists, setWishLists] = useState([]);

  const getWishList = () => {
    const storedWishList = localStorage.getItem("wishLists");
    return storedWishList ? JSON.parse(storedWishList) : [];
  };

  useEffect(() => {
    const wishList = getWishList();
    setWishList(wishList?.length);
    setWishLists(wishList);
  }, [getWishList]);

  return (
    <>
      <Router>
        <Header setSearchData={setSearchData} wishList={wishList} setWishList={setWishList} />
        <Routes>
          <Route path='/' element={<Home searchData={searchData} setWishList={setWishList} wishList={wishList} />} />
          <Route path='/wishlist' element={<WishList searchData={searchData} setWishList={setWishList} wishList={wishList} wishLists={wishLists} />} />
          <Route path='/book/:bookId' element={<BookDetails />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
