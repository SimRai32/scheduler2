import React from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";
import { useState } from 'react';

export default function Form (props) {

  const [student, setStudent] = useState(props.student || "");
  const [error, setError] = useState("");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  
  // resets value of student and interviewer
  const reset = () => {
    setStudent("");
    setInterviewer(null);
  };

  // Cancels the form and resets any data the user may have input
  const cancel = () => {
    reset();
    setError("");
    props.onCancel();
  };

  // Ensures all the necessary information is input by the user
  function validate() {
    setError("");
    // checks if student name is blank
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    // checks if an interviewer was selected
    if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    }
    props.onSave(student, interviewer);
  };
  
  return(
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList 
          value={interviewer}
          interviewers={props.interviewers}
          onChange={(set)=>{setInterviewer(set)}}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>Cancel</Button>
          <Button onClick={validate} confirm>Save</Button>
        </section>
      </section>
    </main>
  )
}