import { useEffect, useState } from "react";

export default function Search({setSearchData}) {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearchData(inputValue)
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [setSearchData, inputValue]);

  const handleSearchValue = (e) => {
    setInputValue(e.target.value)
  }

  return (
    <div>
      <input 
      placeholder="Search..." 
      className="border border-black px-5 py-3 focus:border-none w-96" 
      type="search" 
      value={inputValue}
      onChange={handleSearchValue} />
    </div>
  );
}