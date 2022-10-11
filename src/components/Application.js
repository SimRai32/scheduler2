import React from "react";
import DayList from "./DayList";
import "components/Application.scss";
import { useState, useEffect } from "react";
import Appointment from "./Appointment";
import axios from "axios"
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";


export default function Application() {

  // Initial data
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {} 
  });


  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const sendIntData = {...interview};
    return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview: sendIntData})
    .then(() => {
      return setState({...state, appointments});
    });
  };

  function cancelInterview(id) {
    console.log("here");
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then(() => {
      return setState({...state, appointments});
    });
  }
  
  const setDay = day => setState({ ...state, day });
  
  // Get data from the listed websites and store them in state
  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then(all => {
      setState(prev => ({...prev, days: all[0].data, appointments:all[1].data, interviewers:all[2].data}));
    });
  }, []);

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);

  // creates the template for the schedule of the given day
  const appointmentsRender = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id} 
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
});
  
  // renders the template + rest of the page
  appointmentsRender.push(<Appointment key="last" time="5pm" />);
    return (
      <main className="layout">
        <section className="sidebar">
          <img
            className="sidebar--centered"
            src="images/logo.png"
            alt="Interview Scheduler"
          />
          <hr className="sidebar__separator sidebar--centered" />
          <nav className="sidebar__menu">
            <DayList
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
