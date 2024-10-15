import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DescriptionLoader from "./loader/DescriptionLoader";
import ImageLoader from "./loader/ImageLoader";

export default function BookDetails() {
  const { bookId } = useParams();
  const [bookDetails, setBookDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { id, title, formats, authors, subjects, bookshelves, languages, download_count } = bookDetails || {};

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`https://gutendex.com/books/?ids=${ bookId }`);
        setBookDetails(response.data.results?.[0]);
        setIsLoading(false);
        console.log('bookDetails', response.data.results?.[0]);
      } catch (error) {
        console.error('Error fetching books:', error);
        setIsLoading(false);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-10 py-5">
        <div className="grid grid-cols-4 gap-5">
          <div className="col-span-3">
            <div>
              {isLoading ? <DescriptionLoader /> :
                <div>
                  <h1 className="text-xl mb-2">Title: <span className="font-semibold">{title}</span></h1>
                  <p className="text-lg my-2">Author: <span className="font-semibold">{authors?.[0]?.name}</span></p>
                  <p className="text-md my-2">Birth: <span className="font-semibold">{authors?.[0]?.birth_year}</span></p>
                  <p className="text-md my-2">Death: <span className="font-semibold">{authors?.[0]?.death_year}</span></p>
                  <p className="text-md my-2 font-semibold">Subjects: </p>
                  <ul className="list-decimal ml-5">
                    {subjects?.map((item, ind) => <li key={ind}>{item}</li>)}
                  </ul>
                  <p className="text-md my-2 font-semibold">Bookshelves: </p>
                  <ul className="list-decimal ml-5">
                    {bookshelves?.map((item, ind) => <li key={ind}>{item}</li>)}
                  </ul>
                  <p className="text-md my-2 font-semibold">Formats: </p>
                  <div className="flex flex-wrap gap-3">
                    {formats ? (
                      Object.keys(formats).map((key, ind) => (
                        <a key={ind} href={formats[key]} target="_blank" rel="noopener noreferrer">
                          <span className="bg-[#0071BC] text-white px-5 py-1 rounded-2xl">{key}</span>
                        </a>
                      ))
                    ) : (
                      <p>No Formats Available</p>
                    )}
                  </div>
                </div>
              }
            </div>
          </div>

          <div className="col-span-1 sticky top-20">
            {
              isLoading ? <ImageLoader /> :
                <div>
                  <div className="h-96">
                    {formats && formats["image/jpeg"] ? (
                      <img
                        className="w-full h-full"
                        src={formats["image/jpeg"]}
                        alt={`${ title } cover`}
                      />
                    ) : (
                      <p>No Image Available</p>
                    )}
                  </div>

                  <div>
                    <p className="text-md my-2 font-semibold">Languages: </p>
                    {languages?.map((item, ind) => (
                      <span key={ind} className="bg-[#0071BC] text-white px-5 py-1 rounded-2xl">{item}</span>
                    ))}
                    <p className="my-2">Downloaded: <span className="font-semibold">{download_count}</span></p>
                  </div>
                </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
