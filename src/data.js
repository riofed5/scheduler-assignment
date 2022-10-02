const mockData = [
  {
    sys: {
      id: 1,
    },
    data: {
      date: {
        value: "monday",
      },
      events: [
        {
          id: 1,
          nameOfEvent: "squash",
          timeInText: "15 p.m - 17p.m",
          timeSelected: { from: 15, to: 17 },
        },
        {
          id: 2,
          nameOfEvent: "tennis",
          timeInText: "10 a.m - 12 p.m",
          timeSelected: { from: 12, to: 13 },
        },
      ],
    },
  },
  {
    sys: {
      id: 2,
    },
    data: {
      date: {
        value: "tuesday",
      },
      events: [
        {
          id: 1,
          nameOfEvent: "squash",
          timeInText: "15 p.m - 17p.m",
          timeSelected: { from: 15, to: 17 },
        },
        {
          id: 2,
          nameOfEvent: "tennis",
          timeInText: "10 a.m - 12 p.m",
          timeSelected: { from: 10, to: 12 },
        },
      ],
    },
  },
];

export default mockData;
