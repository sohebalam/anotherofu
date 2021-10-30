import { useEffect, useState } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import axios from "axios"
// const data = [
//   { id: "1", name: "Prepare 2019 Financial" },
//   { id: "2", name: "Prepare 2019 Marketing Plan" },
//   { id: "3", name: "Update Personnel Files" },
//   {
//     id: "4",
//     name: "Review Health Insurance Options Under the Affordable Care Act",
//   },
// ]

const DragList = ({ slug }) => {
  useEffect(() => {
    getlessons()
  }, [])

  const getlessons = async () => {
    try {
      const { data } = await axios.get(`/api/course/lessons/${slug}`)
      const [{ files, videos, lessons: dblessons }] = data

      console.log(files, videos)

      // if (!dblessons) {
      const lessons = [...files, ...videos]

      console.log(lessons)
      setData(lessons)
      // setExtLessons(lessons)
      // }

      // const objlessons = dblessons[0]

      // const lessons = Object.values(objlessons)

      // const newlessons = [...lessons]

      // console.log(newlessons)

      // newlessons.map((lesson) => {
      //   console.log(lesson.title)
      // })

      // setExtLessons(lessons)
    } catch (error) {
      console.log(error)
    }
  }

  const [data, setData] = useState([])

  console.log(data)

  // const [list, setList] = useState(data)

  // console.log(list)

  const reorder = (data, startIndex, endIndex) => {
    const result = Array.from(data)
    const [removed] = result.splice(startIndex, 1)

    result.splice(endIndex, 0, removed)
    console.log(result)
    return result
  }

  const onEnd = async (result) => {
    console.log(result)
    setData(reorder(data, result.source.index, result.destination.index))
  }
  return (
    <DragDropContext onDragEnd={onEnd}>
      <Droppable droppableId="123456">
        {(provided, snapshot) => (
          <div ref={provided.innerRef}>
            {data.map((item, index) => (
              <Draggable draggableId={item._id} key={item._id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <div>{item.title}</div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default DragList
