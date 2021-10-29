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
      <Item
        key={`item-${item.description}`}
        index={index}
        value={item.display}
      />
    ))}
  </ul>
))

function App({ slug }) {
  const [extLessons, setExtLessons] = useState([])
  const [extFiles, setExtFiles] = useState([])

  useEffect(() => {
    getlessons()
  }, [])

  const getlessons = async () => {
    try {
      const { data } = await axios.get(`/api/course/lessons/${slug}`)
      const [{ files, videos, lessons: dblessons }] = data

      // console.log(files, videos)

      console.log("db", dblessons[0])

      if (!dblessons) {
        const lessons = [...files, ...videos]

        console.log(lessons)
        setExtLessons(lessons)
      }

      const objlessons = dblessons[0]

      const lessons = Object.values(objlessons)

      const newlessons = [...lessons]

      console.log(newlessons)

      newlessons.map((lesson) => {
        console.log(lesson.title)
      })

      setExtLessons(lessons)
    } catch (error) {
      console.log(error)
    }
  }

  console.log("extlessons", extLessons)

  //initalItems

  const initalItems = extLessons.map((item) => ({
    description: item.description || undefined,
    title: item.title,
    display: item.title,
    selected: false,
    playlistId: item.playlistId || undefined,
    file_path: item.file_path || undefined,
    file_mimetype: item.file_mimetype || undefined,
    thumbnailUrl: item.thumbnailUrl || undefined,
    videoId: item.videoId || undefined,
    channelTitle: item.channelTitle || undefined,
    name: item.name || item.title,
    media: item.media || undefined,
  }))

  console.log(initalItems)
  const [items, setItems] = useState(initalItems)
  useEffect(() => {
    setItems(initalItems)
  }, [extLessons, setExtLessons, setItems])

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

  console.log(items)
  return (
    <div className="App">
      <h2>Start editing to see some magic happen!</h2>

      <ItemContainer items={items} onSortEnd={onSortEnd} />
    </div>
  )
}

export default App
