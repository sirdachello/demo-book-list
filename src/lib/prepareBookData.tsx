import { format } from "date-fns";
import { Book, Category } from "../types/types";
import {v4 as uuid} from 'uuid';

export function prepareBookData (data: FormData, book?: Book): Book {
  return {
    id: book? book.id : uuid(),
    title: data.get("title") as string,
    authorName: data.get("author") as string,
    category: data.get("category") as Category,
    ISBN: data.get("ISBN") as string,
    createdAt: book ? book.createdAt : format(new Date(), "d MMMM yyyy, h:ma"),
    modifiedAt: book ? format(new Date(), "d MMMM yyyy, h:ma") : "-",
    isActive: book ? book.isActive : true,
  }
}