import { FormEvent } from "react";
import { useActiveBook } from "../hooks/useActiveBook";
import { useActivePage } from "../hooks/useActivePage";
import { prepareBookData } from "../lib/prepareBookData";
import { confirmData } from "../lib/confirmData";
import { Category } from "../types/types";

const categories: Category[] = [
  "Mystery",
  "Fantasy",
  "Horror",
  "Fiction",
  "Novel",
  "Thriller",
  "History",
  "Humor",
];

export default function Update() {
  const { book } = useActiveBook();
  const { setPage } = useActivePage();

  async function handleSubmit(data: FormData) {
    if (!book) {
      // if it's a new entry
      const newBookData = prepareBookData(data);

      const confirmation = confirmData(newBookData);

      if (!confirmation) return;

      const response = await fetch(`http://localhost:3000/books`, {
        method: "POST",
        body: JSON.stringify(newBookData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Unable to create new entry!");
      }
      console.log(`entry created, id ${newBookData.id}`);
      setPage("Dashboard");
    } else {
      // this is if the book exists
      const newBookData = prepareBookData(data, book);

      const confirmation = confirmData(newBookData);

      if (!confirmation) return;

      const response = await fetch(
        `http://localhost:3000/books/${newBookData.id}`,
        {
          method: "PATCH",
          body: JSON.stringify(newBookData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update entry");
      }
      setPage("Dashboard");
    }
  }

  function submitData(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleSubmit(new FormData(e.currentTarget));
  }

  return (
    <article className="max-w-[1440px] flex justify-center mx-auto">
      <section>
        <form onSubmit={(e) => submitData(e)}>
          <fieldset className="fieldset my-4">
            <legend className="fieldset-legend text-3xl text-center mb-4">
              Book details
            </legend>

            <label className="input pl-4">
              Title:
              <input
                required
                name="title"
                defaultValue={book ? `${book.title}` : ""}
                type="text"
                className="grow"
                placeholder="e.g. Lord of the Rings"
              />
            </label>

            <label className="input pl-4">
              Author:
              <input
                required
                name="author"
                defaultValue={book ? `${book.authorName}` : ""}
                type="text"
                className="grow"
                placeholder="e.g. John Ronald Tolkien"
              />
            </label>

            <select
              required
              name="category"
              defaultValue={book ? `${book.category}` : ""}
              className="select"
            >
              <option value="" disabled={true}>
                Select Category
              </option>
              {categories.map((category, index) => {
                return (
                  <option key={index} value={category}>
                    {category}
                  </option>
                );
              })}
            </select>

            <label className="input pl-4">
              ISBN:
              <input
                required
                name="ISBN"
                defaultValue={book ? `${book.ISBN}` : ""}
                pattern="^\d{13}$"
                type="text"
                className="grow"
                placeholder="e.g. 9780261103252"
              />
            </label>

            <button className="btn sm:w-[20rem] mt-4">Submit</button>
          </fieldset>
        </form>
      </section>
    </article>
  );
}
