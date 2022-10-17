import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import { useVisualMode } from "hooks/useVisualMode";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE ="CREATE";
  const SAVING ="SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // saves the new interview data into the database
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING, true);
    // tries to save data
    props.bookInterview(props.id, interview)
      // success
      .then(() => {
        transition(SHOW);
      })
      // fail
      .catch((error) => {
        transition(ERROR_SAVE);
      });
  };

  // deletes the chosen interview from the database
  function cancel() {
    transition(DELETING, true);
    // tries to delete data
    props.cancelInterview(props.id)
        // success
        .then(() => {
          transition(EMPTY);
        })
        // fail
        .catch((error) => {
          transition(ERROR_DELETE, true);
        });
  };

  function confirming() {
    transition(CONFIRM);
  };

  function edit () {
    transition(EDIT);
  };

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirming}
          onEdit={edit}
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
      {mode === EDIT && (
        <Form
          onCancel={back}
          onSave={save}
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
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
      {mode === ERROR_SAVE && (
        <Error message="Unable to save appointment" onClose={back}/>
      )}
      {mode === ERROR_DELETE && (
        <Error message="Unable to delete appointment" onClose={back}/>
      )}

    </article>
  )
}