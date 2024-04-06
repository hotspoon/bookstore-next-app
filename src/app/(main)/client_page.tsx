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
  ShoppingBasket,
  ShoppingCart,
  Truck,
  User,
  Users2,
  XIcon
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
import { Book, BookResponse, BookV2 } from "@/types/books"
import { useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import InfiniteScroll from "react-infinite-scroll-component"
import { UserButton } from "@clerk/clerk-react"
import { cancelOrder, createOrder, getBooks, updateOrder } from "@/services/all-services"
import { useRouter } from "next/navigation"

let totalBooksGenerated = 0
const MAX_BOOKS = 20

interface ClientPageProps {
  books: Book[]
  booksV2: BookResponse
}

function ClientPage({ books, booksV2 }: ClientPageProps): JSX.Element {
  const [searchTerm, setSearchTerm] = useState("")
  const [initialBooks, setInitialBooks] = useState(booksV2.items)
  const [currentPage, setCurrentPage] = useState(booksV2.currentPage)
  const [hasMore, setHasMore] = useState(true)
  const [selectedTag, setSelectedTag] = useState("")
  const router = useRouter()
  const [isDisabled, setIsDisabled] = useState(false)

  const fetchMoreData = async () => {
    setCurrentPage((currentPage) => currentPage + 1)

    const data: BookResponse = await getBooks({
      limit: 10,
      page: currentPage + 1
    })

    // Check if any new books were fetched before updating state
    if (data.items.length > 0) {
      setHasMore(true) // Only set hasMore to true if there are new books
      setInitialBooks((prevBooks) => [...prevBooks, ...data.items])
    } else {
      setHasMore(false) // Set hasMore to false if no new books were fetched
    }
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleOrder = async (orderId: number) => {
    try {
      setIsDisabled(true)
      await updateOrder(orderId)
      window.location.reload()
    } catch (error) {
      console.log(error)
    } finally {
      setIsDisabled(false)
    }
  }

  const handleCancelOrder = async (orderId: number) => {
    try {
      setIsDisabled(true)
      await cancelOrder(orderId)
      window.location.reload()
    } catch (error) {
      console.log(error)
      alert("Error cancelling order")
    } finally {
      setIsDisabled(false)
    }
  }

  // Update this function to filter by the selected tag as well
  const filteredBooks = initialBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedTag === "" || book.tags.includes(selectedTag))
  )

  const allTags = Array.from(new Set(initialBooks.flatMap((book) => book.tags)))
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
                  href="/"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground  transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
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
            scrollThreshold={0.8}
            loader={<h4 className="text-center mt-4">Loading...</h4>}
          >
            <div className="grid flex-1 items-start gap-4  sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-5 xl:grid-cols-5">
              {filteredBooks.map((book, index) => {
                const order = book.orders[0]

                return (
                  <Card
                    key={index}
                    className="bg-white shadow-lg rounded-lg overflow-hidden max-w-sm border border-gray-300"
                  >
                    <CardHeader className="p-6">
                      <CardTitle className="text-xl font-bold text-center">{book.title}</CardTitle>
                      <CardDescription className="text-gray-700 mt-2 text-center">
                        Written by: {book.writer}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center p-6 space-y-4 text-center text-sm">
                      <Image
                        src={book.coverImage}
                        width={92}
                        height={123}
                        alt="Book cover"
                        priority
                      />

                      <p className="text-gray-700">
                        Price: <span className="font-bold text-green-500">{book.price} pts</span>
                      </p>
                      <p className="text-gray-700">
                        Tags:{" "}
                        {book.tags && book.tags.length > 0 ? (
                          book.tags.map((tag, tagIndex) => (
                            <span key={tagIndex} className="font-bold text-indigo-600">
                              {tag}
                              {tagIndex < book.tags.length - 1 ? ", " : ""}
                            </span>
                          ))
                        ) : (
                          <span className="font-bold text-indigo-600">No tags</span>
                        )}
                      </p>
                      {order && !order.cancelled ? (
                        <Button
                          className="px-10 flex items-center bg-red-500 hover:bg-red-400"
                          onClick={() => handleCancelOrder(order.id)}
                          disabled={isDisabled}
                        >
                          <XIcon className="h-5 w-5 mr-2" />
                          Cancel Order
                        </Button>
                      ) : (
                        <Button
                          className="px-10 flex items-center bg-blue-500 hover:bg-blue-400"
                          onClick={() => handleOrder(order.id)}
                          disabled={isDisabled}
                        >
                          <ShoppingBasket className="h-5 w-5 mr-2" />
                          Order
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </InfiniteScroll>
        </main>
      </div>
    </div>
  )
}

export default ClientPage
