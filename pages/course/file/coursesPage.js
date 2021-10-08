import { Container, Grid } from "@material-ui/core"
import React from "react"
import CourseForm from "../../../components/file/CourseForm"
import CoursesList from "../../../components/file/CoursesList"

const CoursesPage = () => {
  return (
    <>
      <Container>
        <Grid container style={{ marginTop: "0.5rem" }}>
          <Grid item sm={6}>
            <Container component="main" maxWidth="xs">
              <CourseForm />
            </Container>
          </Grid>

          <Grid item sm={6}>
            <CoursesList />
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default CoursesPage
