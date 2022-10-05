import React from "react";
import "components/InterviewerListItem.scss"
import classNames from "classnames";

export default function InterviewerListItem(props) {
  const classCheck = classNames("interviewers__item", {"interviewers__item--selected":props.selected});
  console.log(classCheck);
  const renderName = () => {
    
  }
  return(
    <li className={classCheck} onClick={() => {props.setInterviewer(props.name)}}>
      <img
        className="interviewers__item-image"
        src="https://i.imgur.com/LpaY82x.png"
        alt="Sylvia Palmer"
      />
      Sylvia Palmer
    </li>

  )
}