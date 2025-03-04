import { Book } from "../types/types";

export function confirmData(bookData: Book) {
  const confirmationMessage = `Please, make sure that the provided information is correct:\n
  Title: ${bookData.title}\n
  Author: ${bookData.authorName}\n
  Category: ${bookData.category}\n
  ISBN: ${bookData.ISBN}`;

  return confirm(confirmationMessage)
}