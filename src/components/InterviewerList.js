import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from 'prop-types';

function InterviewerList(props) {
  const interviewers  = props.interviewers;
  const value = props.value;
  const onChange = props.onChange;
  const arr = interviewers.map((interviewer) =>
    <InterviewerListItem
      key={interviewer.id}
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === value}
      setInterviewer={() => onChange(interviewer.id)}
    />
    );
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{arr}</ul>
    </section>
  );
};

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;