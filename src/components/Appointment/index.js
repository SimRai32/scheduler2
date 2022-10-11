import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import { useVisualMode } from "hooks/useVisualMode";
import Status from "./Status";
import Confirm from "./Confirm";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE ="CREATE";
  const SAVING ="SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
  };
  function cancel() {
    transition(DELETING);
    props.cancelInterview(props.id)
        .then(() => {
          transition(EMPTY);
        })
  }
  function confirming() {
    transition(CONFIRM);
  }
  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirming}
        />
      )}
      {mode === CREATE && (
        <Form
          onCancel={back}
          onSave={save}
          bookInterview={props.bookInterview}
          interviewers={props.interviewers}
        />
      )}
      {mode === SAVING && (
        <Status message="SAVING"/>
      )}
      {mode === DELETING && (
        <Status message="DELETING"/>
      )}
      {mode === CONFIRM && (
        <Confirm 
          onConfirm={cancel}
          onCancel={back}
        />
      )}

    </article>
  )
}