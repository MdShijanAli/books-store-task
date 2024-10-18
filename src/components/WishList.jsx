import axios from "axios";
import { useEffect, useState } from "react";
import BaseSelect from "./BaseSelect";
import Book from "./Book";
import ImageLoader from "./loader/ImageLoader";

export default function WishList({ searchData = "", setWishList, setWishLists, wishList = 0, wishLists = [] }) {
  const [books, setBooks] = useState([]);
  const [filterBooks, setFilterBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [bookshelves, setBookshelves] = useState([]);
  const [topic, setTopic] = useState(localStorage.getItem("filter") || "");
  const [bookIds, setBookIds] = useState(() => {
    const storedWishList = localStorage.getItem("wishLists");
    const wishList = storedWishList ? JSON.parse(storedWishList) : [];
    return wishList.map(wish => wish.id);
  });
  const [booksFetched, setBooksFetched] = useState(false); 

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
        const idsParam = bookIds.length > 0 ? `&ids=${bookIds.join(',')}` : '';

        const searchValue = localStorage.getItem("search");
        const searchParam = searchValue && searchValue.trim() !== '' ? `&search=${searchValue.trim()}` : '';

        const response = await axios.get(
          `https://gutendex.com/books/?sort=ascending${searchData ? `&search=${searchData}` : searchParam}${topic ? `&topic=${topic}` : ''}${idsParam && idsParam}`
        );

        console.log('response', response.data.results);
        setBooks(response.data.results);
        setBooksFetched(true);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching books:', error);
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [searchData, topic, bookIds]);

  useEffect(() => {
    if (books?.length > 0) {
      const filteredBooks = books.filter(book =>
        wishLists?.some(wish => wish.id === book.id)
      );
      setFilterBooks(filteredBooks);
    }
  }, [wishLists, books]);

  useEffect(() => {
    const bookshelvesArray = books.flatMap((book) => book.bookshelves);
    const uniqueBookshelves = [...new Set(bookshelvesArray)];
    setBookshelves(uniqueBookshelves);
  }, [books]);

  let content;
  if (isLoading) {
    content = (
      <>
        <ImageLoader />
        <ImageLoader />
        <ImageLoader />
        <ImageLoader />
        <ImageLoader />
        <ImageLoader />
        <ImageLoader />
        <ImageLoader />
      </>
    );
  } else if (booksFetched && filterBooks.length === 0) {
    content = <div>No Product Found</div>;
  } else if (!isLoading && filterBooks.length > 0) {
    content = filterBooks.map((book) => (
      <Book
        key={book.id}
        book={book}
        setWishList={setWishList}
        setWishLists={setWishLists}
        wishList={wishList}
        wishLists={wishLists}
      />
    ));
  }

  return (
    <div className="max-w-7xl mx-auto px-10 py-5">
      <div className="flex justify-end mb-3">
        <BaseSelect bookshelves={bookshelves} setTopic={setTopic} topic={topic} isLoading={isLoading} />
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
        {content}
      </div>
    </div>
  );
}
