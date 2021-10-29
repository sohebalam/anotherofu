// import React from "react"
// import DraggableList from "react-draggable-lists"

// class App extends React.Component {
//   render() {
//     return (
//       <div className="App">
//         <h1>react-draggable-lists</h1>
//         <div style={{ width: 300, margin: "0 auto" }}>
//           <DraggableList width={300} height={100} rowSize={1}>
//             <div style={{ width: 300, height: 100, background: "green" }}>
//               1
//             </div>
//             <div style={{ width: 300, height: 100, background: "blue" }}>2</div>
//             <div style={{ width: 300, height: 100, background: "red" }}>3</div>
//           </DraggableList>
//         </div>
//       </div>
//     )
//   }
// }

// export default App
import React from "react"
import DraggableList from "react-draggable-lists"

const listItems = [
  "Entertainment",
  "Private Time",
  "Rest",
  "Meal",
  "Exercise",
  "Work",
  "Home Projects",
  "Family",
]

function App({ slug }) {
  const [index, setIndex] = React.useState()

  console.log(index)

  const handleMoveEnd = () => {
    console.log("move end")
  }

  console.log(slug)
  return (
    <div className="App">
      <div style={{ width: 300, margin: "0 auto" }}>
        <DraggableList
          width={300}
          height={50}
          rowSize={1}
          onMoveEnd={() => handleMoveEnd()}
        >
          {listItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </DraggableList>
      </div>
    </div>
  )
}

export default App
