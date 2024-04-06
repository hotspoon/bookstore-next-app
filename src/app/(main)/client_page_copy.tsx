"use client"
import Image from "next/image"
import Link from "next/link"
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
  Home,
  LineChart,
  ListFilter,
  MoreVertical,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  Truck,
  User,
  Users2
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Book, BookV2 } from "@/types/books"
import { useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import InfiniteScroll from "react-infinite-scroll-component"
import { UserButton } from "@clerk/clerk-react"

let totalBooksGenerated = 0
const MAX_BOOKS = 20

interface ClientPageProps {
  books: Book[]
  booksV2: BookV2[]
}

function ClientPage({ books, booksV2 }: ClientPageProps): JSX.Element {
  const [searchTerm, setSearchTerm] = useState("")
  const [initialBooks, setInitialBooks] = useState(books)
  const [hasMore, setHasMore] = useState(true)
  const [selectedTag, setSelectedTag] = useState("")

  const getMoreBooks = () => {
    return new Promise<Book[]>((resolve) => {
      setTimeout(() => {
        if (totalBooksGenerated >= MAX_BOOKS) {
          resolve([])
          return
        }

        const booksToGenerate = Math.min(20, MAX_BOOKS - totalBooksGenerated)

        const newBooks = Array.from({ length: booksToGenerate }, (_, i) => ({
          id: totalBooksGenerated + i + 1,
          title: `Book ${totalBooksGenerated + i + 1}`,
          author: `Author ${totalBooksGenerated + i + 1}`,
          description: `Description ${totalBooksGenerated + i + 1}`,
          price: `${(totalBooksGenerated + i + 1) * 10}`,
          tag: [`tag${totalBooksGenerated + i + 1}`],
          image: "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg"
        }))

        totalBooksGenerated += newBooks.length

        resolve(newBooks)
      }, 2000)
    })
  }
  const fetchMoreData = async () => {
    const newBooks = await getMoreBooks()

    // Check if any new books were fetched before updating state
    if (newBooks.length > 0) {
      setHasMore(true) // Only set hasMore to true if there are new books
      setInitialBooks((prevBooks) => [...prevBooks, ...newBooks])
    } else {
      setHasMore(false) // Set hasMore to false if no new books were fetched
    }
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  // Update this function to filter by the selected tag as well
  const filteredBooks = initialBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedTag === "" || book.tag.includes(selectedTag))
  )

  const allTags = Array.from(new Set(initialBooks.flatMap((book) => book.tag)))
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <TooltipProvider>
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <Link
              href="#"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            >
              <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span className="sr-only">Orders</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Orders</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Package className="h-5 w-5" />
                  <span className="sr-only">Products</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Products</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Users2 className="h-5 w-5" />
                  <span className="sr-only">Customers</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Customers</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <LineChart className="h-5 w-5" />
                  <span className="sr-only">Analytics</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Analytics</TooltipContent>
            </Tooltip>
          </nav>
          <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
          </nav>
        </aside>
      </TooltipProvider>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link href="#" className="flex items-center gap-4 px-2.5 text-foreground">
                  <ShoppingCart className="h-5 w-5" />
                  Orders
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Package className="h-5 w-5" />
                  Products
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Users2 className="h-5 w-5" />
                  Customers
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="h-5 w-5" />
                  Settings
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Orders</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Recent Orders</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
          <UserButton />
        </header>
        <main className="p-4">
          <div className="flex justify-between gap-4 mb-6">
            <p className="sm:px-6 text-2xl font-bold">
              {selectedTag === "" ? "Best sellers" : selectedTag}
            </p>
            <select
              className="border"
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
            >
              <option value="">All tags</option>
              {allTags.map((tag, index) => (
                <option key={index} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>
          <InfiniteScroll
            dataLength={filteredBooks.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4 className="text-center mt-4">Loading...</h4>}
          >
            <div className="grid flex-1 items-start gap-4  sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-5 xl:grid-cols-5">
              {filteredBooks.map((book, index) => (
                <Card
                  key={index}
                  className="bg-white shadow-lg rounded-lg overflow-hidden max-w-sm border border-gray-300"
                >
                  <CardHeader className="p-6">
                    <CardTitle className="text-xl font-bold text-center">{book.title}</CardTitle>
                    <CardDescription className="text-gray-700 mt-2 text-center">
                      Written by: {book.author}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center p-6 space-y-4 text-center text-sm">
                    <Image src={book.image} width={92} height={123} alt="Book cover" priority />
                    <p className="text-gray-700">{book.description}</p>
                    <p className="text-gray-700">
                      Price: <span className="font-bold">{book.price}</span>
                    </p>
                    <p className="text-gray-700">
                      Tags:{" "}
                      {book.tag.map((tag, tagIndex) => (
                        <span key={tagIndex} className="font-bold text-indigo-600">
                          {tag}
                        </span>
                      ))}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </InfiniteScroll>
        </main>
      </div>
    </div>
  )
}

export default ClientPage
