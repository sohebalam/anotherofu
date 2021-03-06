import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import {
  Avatar,
  Tooltip,
  Button,
  Grid,
  Box,
  makeStyles,
  DialogActions,
  IconButton,
  Alert,
  Typography,
} from "@material-ui/core"
import ReactMarkdown from "react-markdown"
import { CheckCircleOutline } from "@material-ui/icons"
import EditIcon from "@material-ui/icons/Edit"
import HighlightOffIcon from "@material-ui/icons/HighlightOff"
import HelpOutlineIcon from "@material-ui/icons/HelpOutline"
import PublishIcon from "@material-ui/icons/Publish"
import Dialog from "@material-ui/core/Dialog"
import CloseIcon from "@material-ui/icons/Close"
import GroupIcon from "@mui/icons-material/Group"
import CourseForm from "../../../../components/forms/FileForm"
import { useSelector } from "react-redux"
import { wrapper } from "../../../../redux/store"
import {
  getlessons,
  getSingleCourse,
} from "../../../../redux/actions/lessonActions"
import Lessons from "../../../../components/file/DragList"

const useStyles = makeStyles((theme) => ({
  paper: {
    overflowY: "unset",
  },
  customizedButton: {
    position: "absolute",
    left: "95%",
    top: "-9%",
    backgroundColor: "lightgray",
    color: "primary",
  },
  iconColor: {
    color: "green",
  },
  avcolor: {
    backgroundColor: theme.palette.primary.main,
  },
}))

const CourseView = () => {
  // const [course, setCourse] = useState({})
  const [file, setFile] = useState({})
  const [fileVisible, setFileVisible] = useState(false)
  const [visible, setVisible] = useState(false)
  const [values, setValues] = useState({
    title: "",
    content: "",
    video: "",
  })
  const classes = useStyles()
  const [uploading, setUploading] = useState(false)
  const [uploadButtonText, setUploadButtonText] = useState("Upload Video")
  const [fileButtonText, setFileButtonText] = useState("Upload File")
  const [progress, setProgress] = useState(0)
  const [students, setStudents] = useState(0)

  const router = useRouter()
  const { slug } = router.query

  const singleCourse = useSelector((state) => state.singleCourse)
  const { loading, error: courseError, course } = singleCourse

  console.log(course)

  useEffect(() => {
    course && studentCount()
  }, [course])

  const studentCount = async () => {
    const { data } = await axios.post(`/api/instructor/studentCount`, {
      courseId: course._id,
    })
    // console.log("STUDENT COUNT => ", data.length)
    setStudents(data.length)
  }

  const handlePublish = async (e, courseId) => {
    try {
      let answer = window.confirm(
        "One you publish your course, it will be live in the marketplace for users to enroll"
      )
      if (!answer) return

      const { data } = await axios.put(`/api/course/publish/${courseId}`)
      // toast(" course is live")
      console.log(" course is live")

      setCourse(data)
    } catch (error) {
      // toast("Publish failed, course is not live")
    }
  }

  const handleUnpublish = async (e, courseId) => {
    try {
      let answer = window.confirm(
        "One you Un-Publish your course, it will  not be live in the marketplace for users to enroll"
      )
      if (!answer) return
      const { data } = await axios.put(`/api/course/unpublish/${courseId}`)
      // toast(" course is not live")
      console.log(" course is not live")
      setCourse(data)
    } catch (error) {
      // toast("UnPublish failed, course is live")
    }
  }

  return (
    <>
      <Grid container>
        <>
          {course && (
            <Grid container key={course._id} style={{ marginTop: "2rem" }}>
              <Grid container>
                <Grid item xs={2}>
                  <Avatar
                    style={{ height: "150px", width: "150px" }}
                    src={course.image ? course.image.Location : "/course.jpg"}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="h3">{course.title}</Typography>
                  <Typography variant="h4">
                    {course.lessons && course.lessons.length} Lessons
                  </Typography>
                  <Typography variant="h5">{course.category}</Typography>
                  <Box padding="1rem">
                    <Typography variant="h5">
                      <ReactMarkdown children={course.description || ""} />
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box mt="1rem">
                    <Button
                      variant="outlined"
                      fullWidth={true}
                      color="primary"
                      icon={<PublishIcon />}
                      size="large"
                      onClick={() => setFileVisible(true)}
                    >
                      Add File
                    </Button>
                  </Box>
                </Grid>

                <Grid item xs={1}></Grid>
                <Grid item xs={2}>
                  <div>
                    <Box marginLeft="6rem">
                      <Tooltip
                        title={`${students} Enrolled`}
                        style={{ marginBottom: "0.5rem", marginRight: "1rem" }}
                      >
                        <GroupIcon
                          className="h5 pointer mr-4"
                          className={classes.iconColor}
                        />
                      </Tooltip>

                      <Tooltip title="Edit" style={{ marginRight: "1rem" }}>
                        <EditIcon
                          onClick={() =>
                            router.push(`/user/instructor/course/edit/${slug}`)
                          }
                          className="h5 pointer text-warning mr-4"
                        />
                      </Tooltip>

                      {course.lessons && course.lessons.length < 5 ? (
                        <Tooltip title="Min 5 lessons required to publish">
                          <HelpOutlineIcon className="h5 pointer text-danger" />
                        </Tooltip>
                      ) : course.published ? (
                        <Tooltip title="Unpublish">
                          <HighlightOffIcon
                            onClick={handlePublish}
                            onClick={(e) => handleUnpublish(e, course._id)}
                            className="h5 pointer text-danger"
                          />
                        </Tooltip>
                      ) : (
                        <Tooltip title="Publish">
                          <CheckCircleOutline
                            onClick={(e) => handlePublish(e, course._id)}
                            className="h5 pointer text-success"
                          />
                        </Tooltip>
                      )}
                    </Box>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          )}

          <Dialog
            open={fileVisible}
            onClose={() => setFileVisible(false)}
            footer={null}
            classes={{ paper: classes.paper }}
          >
            <CourseForm slug={slug} />
            <DialogActions>
              <IconButton
                autoFocus
                onClick={() => setFileVisible(false)}
                color="primary"
                className={classes.customizedButton}
              >
                <CloseIcon />
              </IconButton>
            </DialogActions>
          </Dialog>
        </>
      </Grid>
      <Grid container style={{ marginTop: "0.5rem" }}>
        <Lessons slug={slug} />
      </Grid>
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { params, req } = context

    const { slug } = params

    // const slug = "fdzsf"

    await store.dispatch(getSingleCourse(req.headers.cookie, req, params.slug))
    await store.dispatch(getlessons(req.headers.cookie, req, slug))
  }
)

export default CourseView

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async (context) => {
//     const { params, req } = context

//     await store.dispatch(getLessons(params.slug))
//   }
// )
