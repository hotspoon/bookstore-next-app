"use client"

import React, { useState, useEffect } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import axios from "axios"

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

function ClientPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)

  const getPosts = async () => {
    const response = await axios.get<Post[]>(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
    )
    return response.data
  }

  const fetchMoreData = async () => {
    const newPosts = await getPosts()
    setPage(page + 1)

    if (newPosts.length === 0) {
      setHasMore(false)
      return
    }

    setPosts((prevPosts) => [...prevPosts, ...newPosts])
  }

  useEffect(() => {
    fetchMoreData() // initial fetch
  }, [])

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
    >
      {posts.map((post, index) => (
        <div key={index}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </InfiniteScroll>
  )
}

export default ClientPage
