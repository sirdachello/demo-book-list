
export type Category = "Mystery" | "Fantasy" | "Horror" | "Fiction" | "Novel" | "Thriller" | "History" | "Humor";

export type Book = {
  id: string, 
  title: string,
  authorName: string,
  category: Category, 
  ISBN: string,
  createdAt: string,
  modifiedAt: string,
  isActive: boolean,
}

export type showStatus = 'all' | 'active' | 'deactivated';

export type dataProp = {
  totalEntries: number,
  data: Book[],
}

export type TableData = {
  booksData: Book[];
  data: dataProp | null,
  setData: React.Dispatch<React.SetStateAction<dataProp | null>>;
}