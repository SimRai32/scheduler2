import React from "react";
import axios from "axios";
import { render, cleanup, waitForElement, fireEvent, prettyDOM, getByText, getAllByTestId, queryByText, getByAltText, getByPlaceholderText } from "@testing-library/react";
import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"));
  
    fireEvent.click(getByText("Tuesday"));
  
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async() => {
    // renders the application
    const { container } = render(<Application />);
    // waits until the page has been loaded
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    // clicks the add button 
    fireEvent.click(getByAltText(appointment, "Add"));
    // writes the student name
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: {value: "Lydia Miller-Jones"}
    });
    // selects the interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));
    // checks if "SAVING" appears on the page
    expect(getByText(appointment, "SAVING")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    // finds all elements that have the test id day
    const day = getAllByTestId(container, "day").find(day =>
      // finds the one that contains Monday if it exists
      queryByText(day, "Monday")
    );
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // renders the application
    const { container } = render(<Application />);
    // waits until the page has been loaded
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment")[1];
    // clicks the delete button 
    fireEvent.click(getByAltText(appointment, "Delete"));
    // checks if "Delete the appointment?" appears on the page
    expect(getByText(appointment, "Delete the appointment?")).toBeInTheDocument();
    fireEvent.click(getByText(appointment, "Confirm"));
    // checks if "DELETING" appears on the page
    expect(getByText(appointment, "DELETING")).toBeInTheDocument();
    await waitForElement(() => getByAltText(appointment, "Add"));
    // finds all elements that have the test id day
    const day = getAllByTestId(container, "day").find(day => 
      // finds the one that contains Monday if it exists
      queryByText(day, "Monday")
      );
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // renders the application
    const { container } = render(<Application />);
    // waits until the page has been loaded
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment")[1];
    // clicks the edit button 
    fireEvent.click(getByAltText(appointment, "Edit"));
    expect(getByPlaceholderText(appointment, "Enter Student Name")).toBeInTheDocument();
    // rewrites the student name
    fireEvent.change(getByPlaceholderText(appointment,/enter student name/i),{
      target: {value: "Sim Rai"}
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));
    // checks if "SAVING" appeats on the page
    expect(getByText(appointment, "SAVING")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Sim Rai"));
    // finds all elements that have the test id day
    const day = getAllByTestId(container, "day").find(day =>
      // finds the one that contains Monday if it exists
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("shows the save error when failing to save an appointment", async() => {
    // renders the application
    const { container } = render(<Application />);
    // waits until the page has been loaded
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    // clicks the add button 
    fireEvent.click(getByAltText(appointment, "Add"));
    // adds the student name
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: {value: "Please do not add"}
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    // makes the save reject
    axios.put.mockRejectedValueOnce();
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "SAVING")).toBeInTheDocument();
    // waits until "Unable to save appointment" loads on to the page
    await waitForElement(() => getByText(appointment, "Unable to save appointment"));
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    // renders the application
    const { container } = render(<Application />);
    // waits until the page has been loaded
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment")[1];
    // clicks the delete button 
    fireEvent.click(getByAltText(appointment, "Delete"));
    expect(getByText(appointment, "Delete the appointment?")).toBeInTheDocument();
    axios.delete.mockRejectedValueOnce();
    fireEvent.click(getByText(appointment, "Confirm"));
    expect(getByText(appointment, "DELETING")).toBeInTheDocument();
        // waits until "Unable to delete appointment" loads on to the page
    await waitForElement(() => getByText(appointment, "Unable to delete appointment"));
  });
})
