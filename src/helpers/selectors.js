export function getAppointmentsForDay(state, day) {
  let filterDays = state.days.filter(filterDay => filterDay.name === day);
  if (!filterDays[0]) {
    return [];
  }
  filterDays = filterDays[0].appointments;
  const appointments = [];
  for (const filterDay of filterDays) {
    const appointmentsArr = Object.values(state.appointments);
    const temp = appointmentsArr.filter(appointment => appointment.id === filterDay);
    appointments.push(...temp);
  }
  return appointments;

}

export function getInterview(state, interview) {
  if(!interview) {
    return null;
  }
  const interviewerArr = Object.values(state.interviewers);
  let foundInterviewer = interviewerArr.filter(interviewer => interviewer.id === interview.interviewer);
  foundInterviewer = foundInterviewer[0];
  const upcomingInterview = {"student": interview.student, "interviewer":{...foundInterviewer}};
  return upcomingInterview;

} 
