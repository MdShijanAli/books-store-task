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

  useEffect(() => {
    const storedWishList = localStorage.getItem("wishLists");
    const wishList = storedWishList ? JSON.parse(storedWishList) : [];
    setWishList(wishList?.length);
    setWishLists(wishList);
  }, []);

  return (
    <>
      <Router>
        <Header setSearchData={setSearchData} wishList={wishList} setWishList={setWishList} setWishLists={setWishLists} wishLists={wishLists} />
        <Routes>
          <Route path='/' element={<Home searchData={searchData} setWishList={setWishList} setWishLists={setWishLists} wishList={wishList} wishLists={wishLists} />} />
          <Route path='/wishlist' element={<WishList searchData={searchData} setWishList={setWishList} setWishLists={setWishLists} wishList={wishList} wishLists={wishLists} />} />
          <Route path='/book/:bookId' element={<BookDetails />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
