import "./App.css";

import { useState } from "react";

import DashBoard from "./pages/DashBoard";
import Update from "./pages/Update";
import ThemeChanger from "./components/ThemeChanger";

import { ActiveBook, ActivePage } from "./context/context";
import { Book } from "./types/types";

export default function App() {
  const [book, setBook] = useState<Book | null>(null);
  const [page, setPage] = useState<"Dashboard" | "Update">("Dashboard");

  return (
    <>
      <header className="bg-primary p-4">
        <nav className="navbar bg-base-100 shadow-sm max-w-[1440px] mx-auto">
          <div className="flex-1">
            <button
              className="btn btn-ghost text-xl"
              onClick={() => setPage("Dashboard")}
            >
              Dashboard
            </button>
          </div>
          <ThemeChanger />
        </nav>
      </header>
      <main>
        <ActiveBook.Provider value={{ book, setBook }}>
          <ActivePage.Provider value={{ page, setPage }}>
            {page === "Dashboard" && <DashBoard />}
            {page === "Update" && <Update />}
          </ActivePage.Provider>
        </ActiveBook.Provider>
      </main>
      <footer className="p-4 bg-primary flex items-center justify-center">
        <a
          className="btn"
          href="https://github.com/sirdachello/"
          target="_blank"
          rel="noreferrer"
        >
          &copy; Valentine Kliuchev
        </a>
      </footer>
    </>
  );
}
