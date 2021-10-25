import { useEffect } from "react"
import axios from "axios"

const LesssonList = ({ slug }) => {
  useEffect(() => {
    getlessons()
  }, [])

  const getlessons = async () => {
    try {
      const { data } = await axios.get(`/api/course/lessons/${slug}`)
      const [{ files, videos }] = data

      // files.concat(videos)

      const lessons = [...files, ...videos]
      console.log(lessons)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h1>LesssonList </h1>
    </div>
  )
}

export default LesssonList
