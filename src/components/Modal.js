import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { marks } from "./Scheduler";
import { amOrPmTime, getRandomId, valuetext } from "../helper/utility";

const Modal = (props) => {
  const { eventType, currentEvent, addNewEvent, sysId, onClose, show, title } =
    props;

  // Template of new event
  const [newEvent, setNewEvent] = useState({
    id: "",
    nameOfEvent: "Tennis",
    timeInText: "7 a.m - 12 p.m",
    timeSelected: { from: 7, to: 12 },
  });

  const closeOnEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      onClose();
    }
  };

  const handleSelectOption = (e) => {
    const { value } = e.target;
    setNewEvent({
      ...newEvent,
      nameOfEvent: value,
    });
  };

  const handleSelectTimeNewEvent = (event, newValue) => {
    const newTimeInText = `${newValue[0]} ${amOrPmTime(newValue[0])} - ${
      newValue[1]
    } ${amOrPmTime(newValue[1])}`;
    setNewEvent({
      ...newEvent,
      timeSelected: { from: newValue[0], to: newValue[1] },
      timeInText: newTimeInText,
    });
  };

  const handleSubmitCreateEvent = () => {
    addNewEvent(newEvent, sysId);
    onClose();
  };

  useEffect(() => {
    // Set ID when Modal opening
    setNewEvent({ ...newEvent, id: getRandomId() });
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, []);

  return ReactDOM.createPortal(
    <CSSTransition in={show} unmountOnExit timeout={{ enter: 0, exit: 300 }}>
      <div className="modal" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div
            className="modal-header"
            style={{
              marginBottom: 5,
              borderRadius: "5px",
              backgroundColor: "#dedcdc",
            }}
          >
            <h4 className="modal-title">{title}</h4>
          </div>
          <div
            className="modal-body"
            style={{
              marginBottom: 5,
              borderRadius: "5px",
              backgroundColor: "#dedcdc",
            }}
          >
            {/* Create event */}
            {eventType === "create" && (
              <form>
                <label htmlFor="event">Name of event</label>
                <select id="event" name="event" onChange={handleSelectOption}>
                  <option value="tennis">Tennis</option>
                  <option value="squash">Squash</option>
                  <option value="other">Other</option>
                </select>
                <label htmlFor="fname">Time of event</label>
                <Box sx={{ width: "90%" }}>
                  <Slider
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    defaultValue={[7, 12]}
                    step={1}
                    min={6}
                    max={24}
                    marks={marks}
                    onChange={handleSelectTimeNewEvent}
                  />
                </Box>
              </form>
            )}
            {/* End create event */}
            {/* View event */}
            {eventType === "view" && (
              <div>
                <p>Name of event: {currentEvent.nameOfEvent} </p>
                <p> Time: {currentEvent.timeInText}</p>
              </div>
            )}
            {/* End view event */}
          </div>
          <div
            className="modal-footer"
            style={{ borderRadius: "5px", backgroundColor: "#dedcdc" }}
          >
            {eventType === "create" && (
              <input
                type="submit"
                value="Create event"
                onClick={handleSubmitCreateEvent}
                style={{ backgroundColor: "#3176de" }}
              />
            )}
            {eventType === "view" && (
              <input
                type="submit"
                value="Join"
                style={{ backgroundColor: "#3176de" }}
              />
            )}
            <input
              type="submit"
              value="Close"
              onClick={onClose}
              style={{ backgroundColor: "#de3131" }}
            />
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById("root")
  );
};

export default Modal;
