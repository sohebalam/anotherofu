import { useEffect, useState } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import axios from "axios"

const DragList = ({ slug }) => {
  const [data, setData] = useState([])
  useEffect(() => {
    getlessons()
  }, [setData])

  const getlessons = async () => {
    try {
      const { data } = await axios.get(`/api/course/lessons/${slug}`)
      const [{ files, videos, lessons: dblessons }] = data

      console.log(files, videos)

      console.log("dblessons", dblessons)

      if (dblessons.length === 0) {
        const lessons = [...files, ...videos]

        console.log(lessons)
        setData(lessons)
        // setExtLessons(lessons)
      }
      if (dblessons.length > 0) {
        setData(dblessons)
      }

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

  console.log(data)

  const reorder = (data, startIndex, endIndex) => {
    const result = Array.from(data)
    const [removed] = result.splice(startIndex, 1)

    result.splice(endIndex, 0, removed)
    postLessons(result)
    return result
  }

  const postLessons = async (items) => {
    console.log("itemssds", items)
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    try {
      console.log("ster", items)
      const { data } = await axios.post(
        `/api/lessons/${slug}`,
        { ...items },
        config
      )

      console.log(data)
    } catch (error) {
      console.log(error)
    }
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
            {!data ? (
              <Circularprogress />
            ) : (
              data.map((item, index) => (
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
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default DragList
