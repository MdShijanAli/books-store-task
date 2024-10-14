import { Link } from "react-router-dom";

export default function Book({ book }) {
  const { id, title, formats, authors } = book;
  return (
    <div className="border p-5">
      <div className="flex justify-center h-72">
        <Link to={`/book/${ id }`}>
          <img className="w-full h-full" src={formats["image/jpeg"]} alt={`${ title } cover`} />
        </Link>
      </div>
      <div className="mt-3">
        <h2 className="text-sm">ID: <span className="font-semibold">{id}</span></h2>
        <h1 className="text-md my-1">Title: <Link to={`/book/${ id }`}><span className="font-semibold hover:text-blue-950">{title}</span></Link></h1>
        <h2 className="text-sm">Author: <span className="font-semibold">{authors?.[0]?.name}</span></h2>
      </div>
    </div>
  );
}