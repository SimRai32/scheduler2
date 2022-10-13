import { useState, useEffect } from "react";
import axios from "axios";
export function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {} 
  });

  const setDay = day => setState({ ...state, day });

  // retrieve the data from the database on every page refresh
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then(all => {
      setState(prev => ({...prev, days: all[0].data, appointments:all[1].data, interviewers:all[2].data}));
    });
  }, []);

  // gets the current number of spots when deleting or adding appointments
  const updateSpots = (state, appointments) => {
    let spots = 0;
    const daysNeedUpdate = [...state.days];
    const dayObj = state.days.find(day => day.name === state.day);
    let dayToUpdate = {...dayObj};

    // counts the new number of spots for that day 
    for (const id of dayObj.appointments) {
      const appointment = appointments[id];
      if (appointment.interview === null) {
        spots++;
      }
    }

    dayToUpdate = {...dayToUpdate, spots};

    // creates a new days array with the updated spots data
    const updatedDays = daysNeedUpdate.map(updatedObj => {
      if (updatedObj.id === dayToUpdate.id) {
        return dayToUpdate;
      }
      return updatedObj;
    });

    return updatedDays;
  }

  // saves the user's interview into the database
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
      const days = updateSpots(state, appointments);
      return setState({...state, appointments, days});
    });
  };

  // deletes the identified interview from the database
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then(() => {
      const days = updateSpots(state, appointments);
      return setState({...state, appointments, days});
    });
  };

  return { setDay, cancelInterview, bookInterview, updateSpots, state }
}