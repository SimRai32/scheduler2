import React from "react";
import DayList from "./DayList";
import "components/Application.scss";
import { useState, useEffect } from "react";
import Appointment from "./Appointment";
import axios from "axios"



export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {}
  });

  const appointmentsRender = Object.values(state.appointments).map(appointment => 
    <Appointment
      key={appointment.id} 
      {...appointment}  
    />
  );
  appointmentsRender.push(<Appointment key="last" time="5pm" />);

  const setDay = day => setState({ ...state, day });
  const setDays = (days) => setState(prev => ({...prev, days}));
  
  useEffect(() => {
    const URL = `http://localhost:8001/api/days`;
    axios.get(URL)
      .then(response => {
        setDays(response.data);
      })
  }, [])
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu"><DayList
          days={state.days}
          value={state.day}
          onChange={setDay}
        />
</nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentsRender}
      </section>
    </main>
  );
}
