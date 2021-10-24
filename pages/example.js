import React, { useState } from "react"
import ReactDOM from "react-dom"

import ReactDragList from "react-drag-list"
// import "react-drag-list/assets/index.css";

// import "./style/simple.less";

const dataArray = [
  {
    color: "#FF5500",
    title: "Senior Product Designer",
    text: "Senior Product Designer",
  },
  {
    color: "#5FC296",
    title: "Senior Animator",
    text: "Senior Animator",
  },
  {
    color: "#2DB7F5",
    title: "Visual Designer",
    text: "Visual Designer",
  },
  {
    color: "#FFAA00",
    title: "Computer adsasdEngineer",
    text: "Computer Engineer",
  },
  {
    color: "#FF5500",
    title: "Senior Proafasdduct Designer",
    text: "Senior Product Designer",
  },
  {
    color: "#5FC296",
    title: "Senior Adasdsanimator",
    text: "Senior Animator",
  },
  {
    color: "#2DB7F5",
    title: "Visual dasadsDesigner",
    text: "Visual Designer",
  },
  {
    color: "#FFAA00",
    title: "Computerdasasd Engineer",
    text: "Computer Engineer",
  },
]
export default function AboutPage() {
  const [dataSource] = useState(dataArray)

  const _handleUpdate = (evt, updated) => {
    console.log(evt) // tslint:disable-line
    console.log(updated) // tslint:disable-line
    // this.setState({
    //   dataSource: [...updated, {
    //     color: '#FFAA00',
    //     title: 'Added Engineer',
    //     text: 'Added Engineer',
    //   }]
    // })
  }

  return (
    <div className="simple">
      <ReactDragList
        dataSource={dataSource}
        rowKey="title"
        row={(record, index) => (
          <div key={index} style={{ color: record.color }}>
            <div className="simple-drag-row-title">{record.title}</div>
            <span>{record.text}</span>
          </div>
        )}
        handles={false}
        className="simple-drag"
        rowClassName="simple-drag-row"
        onUpdate={_handleUpdate}
      />
    </div>
  )
}
