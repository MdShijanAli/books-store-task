import Books from "../components/Books";

export default function Home({searchData}){

    return (
        <div>
          <div className='max-w-7xl mx-auto px-10 py-5' >
             <div>
                <Books searchData={searchData} />
             </div>
          </div>
        </div>
    );
}