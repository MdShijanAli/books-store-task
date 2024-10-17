import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetValueOrDefault } from './../utils/useGetValueOrDefault';
import { LoveFillIcon } from "./icons/LoveFillIcon";
import { LoveIcon } from './icons/LoveIcon';

export default function Book({ book = {}, setWishList, wishList: bookWishList = 0 }) {
  const { id, title, formats, authors } = book || {};
  const [wish, setWish] = useState(false);

  const getWishList = () => {
    const storedWishList = localStorage.getItem("wishLists");
    return storedWishList ? JSON.parse(storedWishList) : [];
  };

  useEffect(() => {
    const wishList = getWishList();
    const isWished = wishList.some((item) => item.id === book.id);
    setWish(isWished);
  }, [book.id]);

  const handleWish = (value) => {
    const wishList = getWishList();

    if (value) {
      const updatedWishList = [...wishList, book];
      localStorage.setItem("wishLists", JSON.stringify(updatedWishList));
      setWishList(bookWishList+1)
    } else {
      const updatedWishList = wishList.filter((item) => item.id !== book.id);
      localStorage.setItem("wishLists", JSON.stringify(updatedWishList));
      setWishList(bookWishList-1)
    }

    setWish(value);
  };

  return (
    <div className="border p-5 relative">
      {
        wish ? 
        <LoveFillIcon 
          onClick={() => handleWish(false)} 
          className="absolute top-0 right-0 m-1 text-red-600 cursor-pointer" 
        /> :
        <LoveIcon 
          onClick={() => handleWish(true)} 
          className="absolute top-0 right-0 m-1 cursor-pointer" 
        />
      }
      
      <div className="flex justify-center h-72">
        <Link to={`/book/${id}`}>
          <img className="w-full h-full bg-cover" src={formats["image/jpeg"]} alt={title} />
        </Link>
      </div>
      <div className="mt-3">
        <h2 className="text-sm">ID: <span className="font-semibold">{id}</span></h2>
        <h1 className="text-md my-1">Title: <Link to={`/book/${id}`}><span className="font-semibold hover:text-blue-950">{useGetValueOrDefault(title.slice(0, 30))}...</span></Link></h1>
        <h2 className="text-sm">Author: <span className="font-semibold">{useGetValueOrDefault(authors?.[0]?.name)}</span></h2>
      </div>
    </div>
  );
}
