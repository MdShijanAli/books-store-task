import axios from "axios";
import { useEffect, useState } from "react";
import BaseSelect from "./BaseSelect";
import Book from "./Book";
import ImageLoader from "./loader/ImageLoader";

export default function WishList({ searchData = "", setWishList, wishList = 0, wishLists = [] }) {
  const [books, setBooks] = useState([]);
  const [filterBooks, setFilterBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [bookshelves, setBookshelves] = useState([])
  const [topic, setTopic] = useState(localStorage.getItem("filter") || "");
  const [bookIds, setBookIds] = useState(() => {
    const storedWishList = localStorage.getItem("wishLists");
    const wishList = storedWishList ? JSON.parse(storedWishList) : [];
    return wishList.map(wish => wish.id);
  });

  // Effect to filter books based on wishLists
  useEffect(() => {
    if (wishLists.length > 0 && books.length > 0) {
      const filteredBooks = books.filter(book =>
        wishLists.some(wish => wish.id === book.id)
      );
      setFilterBooks(filteredBooks);
    }
  }, [wishLists]);

  useEffect(() => {
    const getWishList = () => {
      const storedWishList = localStorage.getItem("wishLists");
      return storedWishList ? JSON.parse(storedWishList) : [];
    };

    const wishList = getWishList();
    const bookIds = wishList.map(wish => wish.id);
    setBookIds(bookIds);
  }, []);


  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        const idsParam = bookIds.length > 0 ? `&ids=${ bookIds.join(',') }` : '';

        const searchValue = localStorage.getItem("search");

        const searchParam = searchValue && searchValue.trim() !== '' ? `&search=${ searchValue.trim() }` : '';

        const response = await axios.get(`https://gutendex.com/books/?sort=ascending${ searchData ? `&search=${ searchData }` : searchParam }${ topic ? `&topic=${ topic }` : '' }${ idsParam && idsParam }`);
        console.log('response', response.data.results);
        setBooks(response.data.results);
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching books:', error);
        setIsLoading(false)
      }
    };

    fetchBooks();
  }, [searchData, setBooks, setIsLoading, topic, bookIds]);

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
  if (!isLoading && filterBooks.length === 0) content = <div>No Product Found</div>
  if (!isLoading && filterBooks.length > 0) {
    content = filterBooks.map((book) => <Book key={book.id} book={book} setWishList={setWishList} wishList={wishList} />)
  }

  useEffect(() => {
    const bookshelvesArray = books.flatMap((book) => book.bookshelves);

    // If you want unique bookshelves (remove duplicates)
    const uniqueBookshelves = [...new Set(bookshelvesArray)];
    setBookshelves(uniqueBookshelves)
  }, [books]);


  return (
    <div className='max-w-7xl mx-auto px-10 py-5' >
      <div className="flex justify-end mb-3">
        <BaseSelect bookshelves={bookshelves} setTopic={setTopic} topic={topic} isLoading={isLoading} />
      </div>
      <div className="grid grid-cols-4 gap-5">
        {content}
      </div>

    </div>
  );
}