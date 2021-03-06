import { useEffect, useState } from "react"
import axios from "axios"
import PreviewModal from "../../components/modal/PreviewModal"
import SingleCourseJumbotron from "../../components/cards/CourseJumbotron"
import SingleCourseLesson from "../../components/cards/SingleCourseLesson"
import { useRouter } from "next/router"
// import { Context } from "../../context"
// import { toast } from "react-toastify"
import { loadStripe } from "@stripe/stripe-js"
import { useSelector, useDispatch } from "react-redux"
import {
  checkEnrollment,
  freeEnroll,
  getSingleCourse,
  paidEnroll,
} from "../../redux/actions/lessonActions"
import { wrapper } from "../../redux/store"
import { CircularProgress } from "@mui/material"

const Course = () => {
  const [showModal, setShowModal] = useState(false)
  const [preview, setPreview] = useState("")
  // const [loading, setLoading] = useState(false)
  // const [enrolled, setEnrolled] = useState({})
  const router = useRouter()

  const dispatch = useDispatch()

  const profile = useSelector((state) => state.profile)
  const { error, dbUser } = profile

  const singleCourse = useSelector((state) => state.singleCourse)
  const { loading, error: courseError, course } = singleCourse

  const enrollmentCheck = useSelector((state) => state.enrollmentCheck)
  const { loading: enrollLoad, error: enrollError, enrolled } = enrollmentCheck

  const user = dbUser

  const handelPaidEnroll = async () => {
    try {
      if (!user) {
        router.push("/user/login")
      }
      if (enrolled.status) {
        return router.push(`/user/course/${enrolled.course.slug}`)
      }

      dispatch(paidEnroll(course))
    } catch (error) {
      // toast("Enrollment failed please try again")
      console.log(error)
    }
  }
  const handelFreeEnroll = async (e) => {
    e.preventDefault()

    try {
      if (!user) {
        router.push("/user/login")
      }
      if (enrolled.status) {
        return router.push(`/user/course/${enrolled.course.slug}`)
      }

      dispatch(freeEnroll(course))

      // toast(data.message)
      return router.push(`/user/course/${course.slug}`)
    } catch (error) {
      // toast("Enrollment failed, try again4")
      console.log(error)
    }
  }

  useEffect(() => {
    if (user && course) dispatch(checkEnrollment(course))
  }, [user, course])

  return (
    <>
      <SingleCourseJumbotron
        course={course}
        showModal={showModal}
        setShowModal={setShowModal}
        preview={preview}
        setPreview={setPreview}
        user={user}
        loading={loading}
        handelPaidEnroll={handelPaidEnroll}
        handelFreeEnroll={handelFreeEnroll}
        enrolled={enrolled}
        // setEnrolled={setEnrolled}
      />

      <PreviewModal
        showModal={showModal}
        setShowModal={setShowModal}
        preview={preview}
      />
      {course.lessons && (
        <SingleCourseLesson
          lessons={course.lessons}
          setPreview={setPreview}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { params, req } = context

    await store.dispatch(getSingleCourse(req, params.slug))
  }
)

export default Course
