import { createContext } from "react";
import { Book } from "../types/types";

type ActiveBook = {
    book: Book | null;
    setBook: (book: Book | null) => void;
}
type ActivePage = {
    page: "Dashboard" | "Update",
    setPage: (page: "Dashboard" | "Update") => void;
}

export const ActiveBook = createContext<ActiveBook | null>(null);
export const ActivePage = createContext<ActivePage | null>(null);
