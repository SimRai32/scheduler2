import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
export default function Appointment(props) {
  const interview = props.interview;
  console.log(props);
  const render = (
    interview ? <Show student={interview.student} interviewer={interview.interviewer.name}/> 
    : <Empty/>
    )
  return (
    <article className="appointment">
      <Header time={props.time}/>
      {render}
    </article>
  )
}