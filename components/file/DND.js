import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

const data = [
  { id: "1", name: "Prepare 2019 Financial" },
  { id: "2", name: "Prepare 2019 Marketing Plan" },
  { id: "3", name: "Update Personnel Files" },
  {
    id: "4",
    name: "Review Health Insurance Options Under the Affordable Care Act",
  },
]

const DragList = () => {
  const [list, setList] = useState(data)

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)

    result.splice(endIndex, 0, removed)
    console.log(result)
    return result
  }

  const onEnd = async (result) => {
    console.log(result)
    setList(reorder(list, result.source.index, result.destination.index))
  }
  return (
    <DragDropContext onDragEnd={onEnd}>
      <Droppable droppableId="123456">
        {(provided, snapshot) => (
          <div ref={provided.innerRef}>
            {list.map((item, index) => (
              <Draggable draggableId={item.id} key={item.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <div>{item.name}</div>
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
