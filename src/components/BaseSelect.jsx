import { useEffect } from "react";

export default function BaseSelect({ bookshelves = [], setTopic, topic = "", isLoading = false }) {
  useEffect(() => {
    if (topic !== "") {
      localStorage.setItem("filter", topic);
    } else {
      localStorage.removeItem("filter");
    }
  }, [topic])

  const handleSelectTopic = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "clear" || selectedValue === "select") {
      setTopic("");
    } else {
      setTopic(selectedValue);
    }
  }

  return (
    <select
      name=""
      id=""
      className="border px-5 py-2 w-full sm:w-[300px]"
      value={topic}
      onChange={handleSelectTopic}
    >
      <option value="select" default>Select</option>
      <>
        {bookshelves?.map((item, ind) => (
          <option key={ind} value={item}>
            {item}
          </option>
        ))}
        {bookshelves?.length && <option className="bg-black text-white" value="clear">Clear</option>}
      </>

    </select>
  );
}