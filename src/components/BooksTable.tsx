import { useActiveBook } from "../hooks/useActiveBook";
import { useActivePage } from "../hooks/useActivePage";
import { Book, dataProp, TableData } from "../types/types";
import { format } from "date-fns";


export default function BooksTable({ booksData, setData, data }: TableData) {
  const {setBook} = useActiveBook();
  const {setPage} = useActivePage();

    function editEntry(id: string) {
        const book = booksData.find((book) => book.id === id);
        if(!book) return;
        setBook(book)
        setPage('Update')
    }

  async function removeEntry(id: string) {
    const confirmation = confirm(`Are you sure you want to delete this book?`);
    if (!confirmation) return;

      const response = await fetch(`http://localhost:3000/books/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete entry!");
      }

      if (data) {
        const editedArray = booksData.filter((book) => book.id !== id);

        const updatedData: dataProp = {
          data: editedArray,
          totalEntries: data.totalEntries - 1,
        };
        setData(updatedData);
      }

  }

  async function toggleActiveEntry(id: string) {
    const book = booksData.find((book) => book.id === id);

    const confirmation = confirm(
      `This will ${
        book?.isActive ? "deactivate" : "re-activate"
      } the entry, please confirm.`
    );
    if (confirmation) {
      const response = await fetch(`http://localhost:3000/books/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          isActive: !book?.isActive,
          modifiedAt: format(new Date(), "d MMMM yyyy, h:ma"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to update entry");
      }

      if (data) {
        const updatedData: dataProp = {
          data: data.data.map((book) =>
            book.id === id ? { ...book, isActive: !book.isActive } : book),
          totalEntries: data.totalEntries,
        };
        
        setData(updatedData);
      }
    }
  }


  return (
    <div className="overflow-y-scroll no-scrollbar">
    <table className="table table-xs sm:table-sm lg:table-md table-zebra ">
      <thead>
        <tr>
          <th>Book title</th>
          <th>Author name</th>
          <th>Category</th>
          <th>ISBN</th>
          <th>Created At</th>
          <th>Modified At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {booksData?.map((book: Book) => {
          return (
            <tr key={book.id} className="hover:bg-base-300">
              <td>{book.title}</td>
              <td>{book.authorName}</td>
              <td>{book.category}</td>
              <td>{book.ISBN}</td>
              <td>{book.createdAt}</td>
              <td>{book.modifiedAt}</td>
              <td>
                <div className="flex flex-wrap justify-center items-center">
                <button onClick={() => editEntry(book.id)} className="btn">Edit</button>
                <button onClick={() => removeEntry(book.id)} className="btn">
                  Delete
                </button>
                <button
                  onClick={() => toggleActiveEntry(book.id)}
                  className="btn"
                >
                  {book.isActive ? "Deactivate" : "Re-Activate"}
                </button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
      <tfoot></tfoot>
    </table>
    </div>
  );
}
