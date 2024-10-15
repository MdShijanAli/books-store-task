import axios from "axios";
import { useEffect, useState } from "react";
import Book from "./Book";
import ImageLoader from "./loader/ImageLoader";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get(`https://gutendex.com/books/?page=${ page }`);
        console.log('response', response.data.results);
        setBooks(response.data.results);
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching books:', error);
        setIsLoading(false)
      }
    };

    fetchBooks();
  }, []);

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

  return (
    <div>
      <div className="grid grid-cols-4 gap-5">
        {content}
      </div>
    </div>
  );
}