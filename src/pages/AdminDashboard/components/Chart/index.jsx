import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { LineChart, axisClasses } from "@mui/x-charts";

import Title from "../Title";

// Generate Sales Data
function createData(time, amount) {
  return { time, amount: amount ?? null };
}

const data = [
  createData("09:00", 0),
  createData("10:00", 3),
  createData("11:00", 8),
  createData("12:00", 10),
  createData("13:00", 16),
  createData("14:00", 17),
  createData("17:00", 19),
  createData("18:00", 19),
  createData("19:00", 21),
  createData("20:00", 25),
  createData("21:00", 30),
  createData("22:00", 30),
  createData("23:00"),
];

export default function Chart() {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>Hôm nay</Title>
      <div style={{ width: "100%", flexGrow: 1, overflow: "hidden" }}>
        <LineChart
          dataset={data}
          margin={{
            top: 16,
            right: 20,
            left: 70,
            bottom: 30,
          }}
          xAxis={[
            {
              scaleType: "point",
              dataKey: "time",
              tickNumber: 2,
              tickLabelStyle: theme.typography.body2,
            },
          ]}
          yAxis={[
            {
              label: "Chart (đơn hàng)",
              labelStyle: {
                ...theme.typography.body1,
                fill: theme.palette.text.primary,
              },
              tickLabelStyle: theme.typography.body2,
              max: 99,
              tickNumber: 5,
            },
          ]}
          series={[
            {
              dataKey: "amount",
              showMark: false,
              color: theme.palette.primary.light,
            },
          ]}
          sx={{
            [`.${axisClasses.root} line`]: {
              stroke: theme.palette.text.secondary,
            },
            [`.${axisClasses.root} text`]: {
              fill: theme.palette.text.secondary,
            },
            [`& .${axisClasses.left} .${axisClasses.label}`]: {
              transform: "translateX(-25px)",
            },
          }}
        />
      </div>
    </React.Fragment>
  );
}
