import { useState } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Header from './common/Header'
import BookDetails from './components/BookDetails'
import Home from './views/Home'

function App() {
  const [searchData, setSearchData] = useState('');
  console.log('Search Data', searchData);
  

  return (
    <>
      <Router>
        <Header setSearchData={setSearchData}/>
        <Routes>
          <Route path='/' element={<Home searchData={searchData} />} />
          <Route path='/book/:bookId' element={<BookDetails />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
