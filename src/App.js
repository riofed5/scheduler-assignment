import "./App.css";
import React, { useState } from "react";
import Modal from "./components/Modal";
import mockData from "./data";
import Scheduler from "./components/Scheduler";

function App() {
  const [data, setData] = useState(mockData);
  const [show, setShow] = useState(false);
  const [eventType, setEventType] = useState("create");
  const [currentEvent, setCurrentEvent] = useState({});
  const [currentSysId, setCurrentSysId] = useState(null);

  const setCurrentSingleDataId = (value) => {
    setCurrentSysId(value);
  };
  const addNewEvent = (newEvent, id) => {
    // TODO: change the name to be less vague
    const tempData = [...data];
    const selectedSingleData = tempData.find(
      (singleData) => (singleData.sys.id = id)
    );
    const selectedIndex = tempData.findIndex(
      (singleData) => (singleData.sys.id = id)
    );

    // Add new event to selectedSingleData
    const updatedSingleData = {
      ...selectedSingleData,
      data: {
        ...selectedSingleData.data,
        events: [...selectedSingleData.data.events, newEvent],
      },
    };

    // Update the selectedSingleData and data
    tempData[selectedIndex] = updatedSingleData;
    setData(tempData);
  };

  return (
    <div>
      <p>***NOTE: Double click label to view detail of event</p>
      <h1>
        <span>Schedule</span>
      </h1>
      <Modal
        title="Event"
        onClose={() => setShow(false)}
        show={show}
        eventType={eventType}
        currentEvent={eventType === "view" ? currentEvent : null}
        addNewEvent={addNewEvent}
        sysId={currentSysId}
      />
      <>
        {data.map((singleData) => {
          return (
            <Scheduler
              setShow={setShow}
              setEventType={setEventType}
              event={singleData}
              key={singleData.sys.id}
              setCurrentEvent={setCurrentEvent}
              setCurrentSingleDataId={setCurrentSingleDataId}
            />
          );
        })}
      </>
    </div>
  );
}

export default App;
