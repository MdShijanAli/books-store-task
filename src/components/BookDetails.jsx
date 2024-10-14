import { useParams } from "react-router-dom";

export default function BookDetails(){
  const {bookId} = useParams();
    return (
        <div>
          <h1>This is Book Details Page for ID {bookId}</h1>
        </div>
    );
}