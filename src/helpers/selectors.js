export function getAppointmentsForDay(state, day) {
  // get the object data for the given day
  let filterDays = state.days.filter(filterDay => filterDay.name === day);
  // if no data was found for that day return an empty array
  if (!filterDays[0]) {
    return [];
  }
  // only the appointment id data from the object is needed
  filterDays = filterDays[0].appointments;
  const appointments = [];
  for (const filterDay of filterDays) {
    // converts object into an array
    const appointmentsArr = Object.values(state.appointments);
    // finds the appointment data based on the retrieved id from filterDay
    const temp = appointmentsArr.filter(appointment => appointment.id === filterDay);
    appointments.push(...temp);
  }
  return appointments;
};

export function getInterview(state, interview) {
  if(!interview) {
    return null;
  }
  const interviewerArr = Object.values(state.interviewers);
  // finds interviewer data
  const foundInterviewer = interviewerArr.find(interviewer => interviewer.id === interview.interviewer);
  // put student and interviewer data into an object
  const upcomingInterview = {"student": interview.student, "interviewer":{...foundInterviewer}};
  return upcomingInterview;
};

export function getInterviewersForDay(state, day) {
  let filterDays = state.days.filter(filterDay => filterDay.name === day);
  const interviewerObj = {};
  if (!filterDays[0]) {
    return [];
  }
  filterDays = filterDays[0].interviewers;
  for (const interviewer of filterDays) {
    let interviewCheck = state.interviewers[interviewer];
    // checks if interviewer data exists
    if(interviewCheck) {
      interviewerObj[interviewer] = interviewCheck;
    }
  }
  const interviewerArr = Object.values(interviewerObj);
  return interviewerArr;
};
