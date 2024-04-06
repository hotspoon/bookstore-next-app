import { Book, BookResponse, BookV2 } from "@/types/books"
import ClientPage from "./client_page"
import { getBooks } from "@/services/all-services"

const books: Book[] = [
  {
    title: "Title 1",
    author: "Author 1",
    description: "Description 1",
    price: "$19.99",
    tag: ["Bestseller", "Fiction"],
    image: "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg"
  },
  {
    title: "Title 2",
    author: "Author 2",
    description: "Description 2",
    price: "$29.99",
    tag: ["Non-fiction", "Classic"],
    image: "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg"
  },
  {
    title: "Title 3",
    author: "Author 3",
    description: "Description 3",
    price: "$39.99",
    tag: ["Bestseller", "Thriller"],
    image: "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg"
  },
  {
    title: "Title 4",
    author: "Author 4",
    description: "Description 4",
    price: "$49.99",
    tag: ["Non-fiction", "Biography"],
    image: "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg"
  },
  {
    title: "Title 5",
    author: "Author 5",
    description: "Description 5",
    price: "$59.99",
    tag: ["Bestseller", "Romance"],
    image: "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg"
  },
  {
    title: "Title 6",
    author: "Author 6",
    description: "Description 6",
    price: "$69.99",
    tag: ["Non-fiction", "History"],
    image: "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg"
  },
  {
    title: "Title 7",
    author: "Author 7",
    description: "Description 7",
    price: "$79.99",
    tag: ["Bestseller", "Mystery"],
    image: "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg"
  },
  {
    title: "Title 8",
    author: "Author 8",
    description: "Description 8",
    price: "$89.99",
    tag: ["Non-fiction", "Science"],
    image: "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg"
  },
  {
    title: "Title 9",
    author: "Author 9",
    description: "Description 9",
    price: "$99.99",
    tag: ["Bestseller", "Fantasy"],
    image: "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg"
  },
  {
    title: "Title 10",
    author: "Author 10",
    description: "Description 10",
    price: "$109.99",
    tag: ["Non-fiction", "Philosophy"],
    image: "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg"
  }
]

export default async function Page() {
  const data: BookResponse = await getBooks({
    limit: 10,
    page: 1
  })
  return <ClientPage books={books} booksV2={data} />
}
