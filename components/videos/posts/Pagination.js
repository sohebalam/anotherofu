import { makeStyles } from "@material-ui/core"
import { Box } from "@mui/system"
import React from "react"

const useStyles = makeStyles((theme) => ({
  root: {
    "& .Mui-selected": {
      backgroundColor: "transparent",
      color: "#19D5C6",
    },
  },
}))

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i)
  }
  const classes = useStyles()

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <Box key={number} style={{ padding: "0.25rem" }}>
            <li>
              <a className="page-link" onClick={() => paginate(number)}>
                {number}
              </a>
            </li>
          </Box>
        ))}
      </ul>
    </nav>
  )
}

export default Pagination
