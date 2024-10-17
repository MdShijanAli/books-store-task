import axios from "axios";
import { useEffect, useState } from "react";
import BaseSelect from "./BaseSelect";
import Book from "./Book";
import ImageLoader from "./loader/ImageLoader";
import Pagination from "./Pagination";

export default function Books({ searchData = "", setWishList, wishList=0 }) {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [bookshelves, setBookshelves] = useState([])
  const [topic, setTopic] = useState(localStorage.getItem("filter") || "");


  useEffect(() => {
    const pages = total / books?.length;
    setPages(Math.ceil(pages));

  }, [total, books])

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        const searchValue = localStorage.getItem("search");

        const searchParam = searchValue && searchValue.trim() !== '' ? `&search=${ searchValue.trim() }` : '';

        const response = await axios.get(`https://gutendex.com/books/?sort=ascending&page=${ page }${ searchData ? `&search=${ searchData }` : searchParam }${ topic ? `&topic=${ topic }` : '' }`);
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
    content = books.map((book) => <Book key={book.id} book={book} setWishList={setWishList} wishList={wishList} />)
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
        <BaseSelect bookshelves={bookshelves} setTopic={setTopic} topic={topic} isLoading={isLoading} />
      </div>
      <div className="grid grid-cols-4 gap-5">
        {content}
      </div>

      {
        total > 32 && <div className="my-10">
          <Pagination pages={pages} setPage={setPage} page={page} total={total} />
        </div>
      }
    </div>
  );
}