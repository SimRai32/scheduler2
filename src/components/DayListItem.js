import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const selectIsTrue = props.selected;
  function formatSpots() {
    if (props.spots > 1) {
      return `${props.spots} spots remaining`;
    } else if(props.spots === 1) {
      return "1 spot remaining";
    } else {
      return "no spots remaining";
    }
  }
  const text = formatSpots();
  const fullIsTrue = props.spots === 0;
  const checkIfTrue = classNames("day-list__item", {"day-list__item--selected":selectIsTrue}, {"day-list__item--full":fullIsTrue});
  return (
    <li onClick={() => {props.setDay(props.name)}} className={checkIfTrue} data-testid="day">
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light" >{text}</h3>
    </li>
  );
}
