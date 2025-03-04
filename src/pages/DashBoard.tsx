import { useEffect, useState } from "react";

import Spinner from "../components/Spinner";
import BooksTable from "../components/BooksTable";
import ErrorCase from "../components/ErrorCase";

import { Book, dataProp, showStatus } from "../types/types";
import { useActiveBook } from "../hooks/useActiveBook";
import { useActivePage } from "../hooks/useActivePage";

export default function DashBoard() {
  const [error, setError] = useState<unknown | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<dataProp | null>(null);
  const [bookFilter, setBookFilter] = useState<showStatus>("all");
  const {setBook} = useActiveBook();
  const {setPage} = useActivePage();

  function setNewFilter(e: React.ChangeEvent<HTMLSelectElement>) {
    setBookFilter(e.target.value as showStatus);
  }

  useEffect(() => {
    async function fetchBookData() {
      setError(null);
      setIsLoading(true);

      try {
        const response = await fetch("http://localhost:3000/books");
        const result: Book[] = await response.json();

        if (bookFilter === "all") {
          const activeBooks: dataProp = {
            totalEntries: result.length,
            data: result,
          };
          setData(activeBooks);
        }

        if (bookFilter === "active") {
          const activeBooks: dataProp = {
            totalEntries: result.length,
            data: result.filter((book) => book.isActive),
          };
          setData(activeBooks);
        }

        if (bookFilter === "deactivated") {
          const activeBooks: dataProp = {
            totalEntries: result.length,
            data: result.filter((book) => !book.isActive),
          };
          setData(activeBooks);
        }
      } catch (error: unknown) {
        console.log(error);
        setData(null);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBookData();
  }, [bookFilter]);

  return (
    <article>
      <section className="max-w-[1440px] mx-auto p-4">
        <div className="flex flex-wrap items-center justify-center gap-4 my-8">
          <button
            className="btn text-xl"
            onClick={() => {
              setBook(null);
              setPage("Update");
            }}
          >
            Add new Book
          </button>
          <select
            onChange={(e) => setNewFilter(e)}
            defaultValue="Select Filters"
            className="select"
          >
            <option disabled={true}>Select Filters</option>
            <option value={"all"}>Show All</option>
            <option value={"active"}>Show Active</option>
            <option value={"deactivated"}>Show Deactivated</option>
          </select>
          <p>
            {data?.data.length} / {data?.totalEntries}
          </p>
        </div>
        {error ? <ErrorCase /> : null}
        {isLoading ? (
          <Spinner />
        ) : (
          <BooksTable
            booksData={data?.data ?? []}
            setData={setData}
            data={data}
          />
        )}
      </section>
    </article>
  );
}
