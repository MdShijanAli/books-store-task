import Books from "../components/Books";

export default function Home({ searchData = "", bookIds = [], setWishList, wishList = 0 }) {

  return (
    <div>
      <div className='max-w-7xl mx-auto px-10 py-5' >
        <div>
          <Books searchData={searchData} bookIds={bookIds} setWishList={setWishList} wishList={wishList} />
        </div>
      </div>
    </div>
  );
}