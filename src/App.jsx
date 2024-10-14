import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import BookDetails from './components/BookDetails'
import Main from './layouts/Main'
import Home from './views/Home'

function App() {

  return (
    <>
      <Router>
        <Main />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/book/:bookId' element={<BookDetails />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
