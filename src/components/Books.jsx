import axios from "axios";
import { useEffect, useState } from "react";
import Book from "./Book";
import ImageLoader from "./loader/ImageLoader";
import Pagination from "./Pagination";

export default function Books({ searchData }) {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [bookshelves, setBookshelves] = useState([])
  const [topic, setTopic] = useState('')
  console.log('Topic', topic);

  useEffect(()=> {
      const pages = total / books?.length;
      setPages(Math.ceil(pages))
      
  },[total, books])


  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get(`https://gutendex.com/books/?sort=ascending&page=${ page }${ searchData ? `&search=${ searchData }` : '' }${ topic ? `&topic=${ topic }` : '' }`);
        console.log('response', response.data.results);
        setTotal(response.data?.count)
        setBooks(response.data.results);
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching books:', error);
        setIsLoading(false)
      }
    };

    fetchBooks();
  }, [page, searchData, topic]);

  let content;
  if (isLoading) {
    content = <>
      <ImageLoader />
      <ImageLoader />
      <ImageLoader />
      <ImageLoader />
      <ImageLoader />
      <ImageLoader />
      <ImageLoader />
      <ImageLoader />
    </>
  }
  if (!isLoading && books.length === 0) content = <div>No Product Found</div>
  if (!isLoading && books.length > 0) {
    content = books.map((book) => <Book key={book.id} book={book} />)
  }

  useEffect(() => {
    const bookshelvesArray = books.flatMap((book) => book.bookshelves);

    // If you want unique bookshelves (remove duplicates)
    const uniqueBookshelves = [...new Set(bookshelvesArray)];
    setBookshelves(uniqueBookshelves)
  }, [books]);


  return (
    <div>
      <div className="flex justify-end mb-3">
        <select name="" id="" className="border px-5 py-2" value={topic} onChange={(e) => setTopic(e.target.value)}>
          <option default>Select</option>
          {
            isLoading ? <option default>Loading...</option> :
              bookshelves?.map((item, ind) => <option key={ind} value={item}>{item}</option>)
          }
        </select>
      </div>
      <div className="grid grid-cols-4 gap-5">
        {content}
      </div>

      <div className="my-10">
        <Pagination pages={pages} setPage={setPage} page={page} total={total} />
      </div>
    </div>
  );
}