import React, { useEffect, useState } from "react"
import {
  SortableElement,
  SortableContainer,
  arrayMove,
} from "react-sortable-hoc"
import axios from "axios"
// import arrayMove from "array-move"

const Item = SortableElement(({ value }) => <li>{value}</li>)

const ItemContainer = SortableContainer(({ items }) => (
  <ul>
    {items.map((item, index) => (
      <Item key={`item-${item.name}`} index={index} value={item.display} />
    ))}
  </ul>
))

function App({ slug }) {
  const [extLessons, setExtLessons] = useState([])
  useEffect(() => {
    getlessons()
  }, [])

  const getlessons = async () => {
    try {
      const { data } = await axios.get(`/api/course/lessons/${slug}`)
      const [{ files, videos }] = data

      // files.concat(videos)

      const lessons = [...files, ...videos]
      setExtLessons(lessons)
    } catch (error) {
      console.log(error)
    }
  }

  console.log(...extLessons)

  const initalItems = extLessons.map((item) => ({
    name: item.title,
    display: item.title,
    selected: false,
  }))

  console.log(initalItems)

  useEffect(() => {
    setItems(initalItems)
  }, [setItems])

  const [items, setItems] = useState(initalItems)

  function toggleItemState(item) {
    const updatedItems = items.map((currentItem) => ({
      ...currentItem,
      selected:
        currentItem.name === item
          ? !currentItem.selected
          : currentItem.selected,
    }))

    setItems(updatedItems)
  }

  function onSortEnd({ oldIndex, newIndex }) {
    const updatedItems = arrayMove(items, oldIndex, newIndex)
    setItems(updatedItems)
  }
  console.log(items)
  return (
    <div className="App">
      <h2>Start editing to see some magic happen!</h2>

      <ItemContainer items={items} onSortEnd={onSortEnd} />
    </div>
  )
}

export default App
