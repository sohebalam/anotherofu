import React, { useState, useEffect } from "react"
import Posts from "../videos/posts/Posts"
import { Box } from "@material-ui/core"
import Pagination from "@mui/material/Pagination"

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

  const handleChange = async (number) => {
    if (!number) number = 1
    setCurrentPage(number)
  }

  return (
    <Box style={{ padding: "0.25rem" }}>
      <Posts posts={currentPosts} />

      <Pagination
        className="pagination"
        count={Math.ceil(posts.length / postsPerPage)}
        color="primary"
        onChange={(e) => handleChange(e.target.textContent)}
      />
    </Box>
  )
}

export default VideoList
