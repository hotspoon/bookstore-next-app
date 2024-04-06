import axios from "axios"

export const getPosts = async () => {
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts")
    return response.data
  } catch (error) {
    console.error("Error fetching posts", error)
    return []
  }
}

export const getBooks = async ({ limit, page }: { limit: number; page: number }) => {
  try {
    const response = await axios.get("https://bookstore-api-ecru.vercel.app/api/books", {
      params: {
        limit,
        page
      }
    })
    return response.data
  } catch (error) {
    console.error("Error fetching posts", error)
    return []
  }
}

export const createOrder = async (bookId: number, customerId: number) => {
  try {
    const response = await axios.post("https://bookstore-api-ecru.vercel.app/api/order", {
      bookId,
      customerId
    })
    return response.data
  } catch (error) {
    console.error("Error creating order", error)
    throw new Error("Error creating order")
  }
}

export const updateOrder = async (orderId: number) => {
  try {
    const response = await axios.patch(
      `https://bookstore-api-ecru.vercel.app/api/order/${orderId}/update`
    )
    return response.data
  } catch (error) {
    console.error("Error updating order", error)
    throw new Error("Error updating order")
  }
}

export const cancelOrder = async (orderId: number) => {
  try {
    const response = await axios.patch(
      `https://bookstore-api-ecru.vercel.app/api/order/${orderId}/cancel`
    )
    return response.data
  } catch (error) {
    console.error("Error cancelling order", error)
    throw new Error("Error cancelling order")
  }
}
