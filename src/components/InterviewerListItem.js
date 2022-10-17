import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {
  const classCheck = classNames("interviewers__item", {"interviewers__item--selected":props.selected});
  let name = ""
  // checks if this interviewer was selected
  if (props.selected) {
    name = [props.name];
  } 
  return(
    <li className={classCheck} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {name}
    </li>
  );
};