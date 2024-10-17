import { useEffect } from "react";

export default function BaseSelect({ bookshelves = [], setTopic, topic = "", isLoading = false }) {

  useEffect(() => {
    if (topic !== "") {
      localStorage.setItem("filter", topic);
    } else {
      localStorage.removeItem("filter");
    }
  }, [topic])

  return (
    <select
      name=""
      id=""
      className="border px-5 py-2"
      value={topic}
      onChange={(e) => {
        const selectedValue = e.target.value;
        if (selectedValue === "clear" || selectedValue === "select") {
          setTopic("");
        } else {
          setTopic(selectedValue);
        }
      }}
    >
      <option value="select" default>Select</option>
      {
        isLoading ? <option disabled>Loading...</option> :
          <>
            {bookshelves?.map((item, ind) => (
              <option key={ind} value={item}>
                {item}
              </option>
            ))}
            <option className="bg-black text-white" value="clear">Clear</option>
          </>
      }
    </select>
  );
}