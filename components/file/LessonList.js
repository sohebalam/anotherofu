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
      const [{ files, videos, lessons: dblessons }] = data

      console.log("db", dblessons[0])

      if (!dblessons) {
        const lessons = [...files, ...videos]
        setExtLessons(lessons)
      }

      const objlessons = dblessons[0]

      // const arrayOfObj = Object.entries(lessons).map((e) => e)

      const lessons = Object.values(objlessons)

      const newlessons = [...lessons]

      console.log(newlessons)

      newlessons.map((lesson) => {
        console.log(lesson.name)
      })

      // const newlessons = lessons.map((lesson) => [...lessons])

      // console.log("newlessons", newlessons)

      // setExtLessons(lessons)
    } catch (error) {
      console.log(error)
    }
  }

  console.log("extlessons", extLessons)

  const initalItems = extLessons.map((item) => ({
    name: item.title,
    display: item.title,
    selected: false,
  }))

  console.log(initalItems)
  const [items, setItems] = useState(initalItems)
  useEffect(() => {
    setItems(initalItems)
  }, [extLessons, setExtLessons])

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
    console.log("ter", items)
    postLessons(items)
  }

  const postLessons = async (items) => {
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

  console.log(items)
  return (
    <div className="App">
      <h2>Start editing to see some magic happen!</h2>

      <ItemContainer items={items} onSortEnd={onSortEnd} />
    </div>
  )
}

export default App
