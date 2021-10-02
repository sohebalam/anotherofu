import React, { useState, useEffect } from "react"
import Posts from "../videos/posts/Posts"
import Pagination from "../videos/posts/Pagination"
import { Box } from "@material-ui/core"

function VideoList({ videos }) {
  const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(2)

  // console.log(posts)

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

  console.log("currentposts", currentPosts)

  useEffect(() => {
    setPosts(videos)
  }, [videos, currentPosts])

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <Box style={{ padding: "0.25rem" }}>
      <Posts posts={currentPosts} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </Box>
  )
}

export default VideoList
