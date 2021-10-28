// import React from "react"
// import ReactDOM from "react-dom"
// import { AutoSizer, List } from "react-virtualized"
// import {
//   SortableContainer,
//   SortableElement,
//   arrayMove,
// } from "react-sortable-hoc"

// const Row = ({ style, item }) => {
//   console.log(item)

//   return (
//     <li style={style}>
//       <span>DRAG___</span>
//       <span>{item}</span>
//     </li>
//   )
// }

// const SortableRow = SortableElement(Row)

// const SortableList = SortableContainer(List)

// class MyList extends React.Component {
//   state = {
//     list: [
//       "Brian Vaughn 1",
//       "Brian Vaughn 2",
//       "Brian Vaughn 3",
//       "Brian Vaughn 4",
//       "Brian Vaughn 5",
//       // And so on...
//     ],
//   }

//   rowRenderer = (props) => {
//     return <SortableRow {...props} item={this.state.list[props.index]} />
//   }

//   onSortEnd = ({ oldIndex, newIndex }) => {
//     if (oldIndex !== newIndex) {
//       let { list } = this.state
//       this.setState({
//         list: arrayMove(list, oldIndex, newIndex),
//       })
//     }
//   }

//   render() {
//     const { list } = this.state
//     return (
//       <div>
//         <SortableList
//           width={500}
//           height={300}
//           rowCount={list.length}
//           rowHeight={50}
//           rowRenderer={this.rowRenderer}
//           onSortEnd={this.onSortEnd}
//           list={list}
//         />
//       </div>
//     )
//   }
// }

// export default MyList

import React, { useState } from "react"
import {
  SortableElement,
  SortableContainer,
  arrayMove,
} from "react-sortable-hoc"
// import arrayMove from "array-move"

const Item = SortableElement(({ value }) => <li>{value}</li>)

const ItemContainer = SortableContainer(({ items }) => (
  <ul>
    {items.map((item, index) => (
      <Item key={`item-${item.name}`} index={index} value={item.display} />
    ))}
  </ul>
))

function App() {
  const initalItems = [
    {
      name: "dashboard",
      display: "Dashboard",
      selected: false,
    },
    {
      name: "docs",
      display: "Documents",
      selected: false,
    },
    {
      name: "pricing",
      display: "Pricing",
      selected: false,
    },
    {
      name: "settings",
      display: "Settings",
      selected: false,
    },
  ]

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

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>

      <ItemContainer items={items} onSortEnd={onSortEnd} />
      {/* <ul>
        {items.map(item => (
          <li
            className={`${item.selected ? "active" : "inactive"} `}
            key={item.name}
            onClick={() => toggleItemState(item.name)}
          >
            <svg className="circle-active" width="20" height="20">
              <circle
                cx="10"
                cy="13"
                r="5"
                stroke="green"
                stroke-width="1"
                fill="yellow"
              />
            </svg>

            <svg className="circle-inactive" width="20" height="20">
              <circle
                cx="10"
                cy="13"
                r="5"
                stroke="gray"
                stroke-width="1"
                fill="gray"
              />
            </svg>
            {item.display}
          </li>
        ))}
      </ul> */}
    </div>
  )
}

export default App
