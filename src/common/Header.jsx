import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { LoveIcon } from '../components/icons/LoveIcon';
import Search from '../components/Search';

export default function Header({setSearchData}){
    return (
        <div className='border-b'>
          <div className='max-w-7xl mx-auto px-10 py-3 flex justify-between items-center'>
          <div className='w-72 h-auto'>
            <Link to="/"><img className='w-100 h-100' src={logo} alt="Logo" /></Link>
          </div>
          <div>
            <Search setSearchData={setSearchData} />
          </div>
          <div>
            <LoveIcon className="w-8 h-8" />
          </div>
        </div>
        </div>
    );
}