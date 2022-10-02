import React from "react";
import Slider from "@mui/material/Slider";
import { valuetext } from "../helper/utility";

export const marks = [
  {
    value: 6,
    label: "6",
  },
  {
    value: 12,
    label: "12",
  },
  {
    value: 18,
    label: "18",
  },
  {
    value: 24,
    label: "24",
  },
];

const colorFilter = (text) => {
  switch (text) {
    case "tennis":
      return "pink";
    case "squash":
      return "#4CAF50";
    case "other":
      return "yellow";
    default:
      return "pink";
  }
};

export default function Scheduler({
  setShow,
  setEventType,
  event,
  setCurrentEvent,
  setCurrentSingleDataId,
}) {
  const { data } = event;
  const { events } = data;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <h3>{data.date.value}</h3>
      <div style={{ width: "80%" }}>
        {events.map((event, index) => {
          const { id, nameOfEvent, timeSelected } = event;
          const colorOfLabel = colorFilter(nameOfEvent);
          const editedTimeSelected = [timeSelected.from, timeSelected.to];
          return (
            <Slider
              style={{ marginLeft: `${index > 0 ? "-100%" : "0"}` }}
              key={id}
              getAriaValueText={valuetext}
              defaultValue={editedTimeSelected}
              marks={marks}
              step={1}
              valueLabelDisplay="on"
              min={6}
              max={24}
              sx={{
                ".MuiSlider-valueLabel": {
                  backgroundColor: colorOfLabel,
                  padding: "0 0",
                  borderRadius: "10px",
                },
              }}
              valueLabelFormat={(value) => (
                <button
                  onDoubleClick={() => {
                    setCurrentEvent(event);
                    setEventType("view");
                    setShow(true);
                  }}
                  style={{
                    border: "solid 1px black",
                    textDecoration: "none",
                    padding: "5px 10px",
                    height: "50px",
                    borderRadius: "10px",
                    backgroundColor: colorOfLabel,
                  }}
                >
                  <span>{nameOfEvent}</span>
                </button>
              )}
            />
          );
        })}
      </div>
      <div>
        <button
          onClick={() => {
            setCurrentSingleDataId(event.sys.id);
            setEventType("create");
            setShow(true);
          }}
          style={{
            backgroundColor: "white",
            border: "2px solid #696a6b",
            color: "black",
            textAlign: "center",
            textDecoration: "none",
            display: "inline-block",
            fontSize: "16px",
          }}
        >
          <span>Add</span>
        </button>
      </div>
    </div>
  );
}
