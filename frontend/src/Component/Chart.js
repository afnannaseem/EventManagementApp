import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import * as React from "react";
import {
  Label,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

function createData(time, amount) {
  return { time, amount };
}

const data = [
  createData("12sep", 0),
  createData("13sep", 300),
  createData("14sep", 600),
  createData("15sep", 5000),
  createData("16sep", 3000),
  createData("17sep", 2500),
  createData("18sep", 4000),
];

export default function Chart() {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Typography
        component="div"
        sx={{ ml: 3, mt: 1, mb: 1, color: "#fff", fontSize: 14 }}
      >
        <b>Weekly Sale</b>
      </Typography>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={"#ffff"}
            style={theme.typography.body2}
          />
          <YAxis stroke={"#ffff"} style={theme.typography.body2}>
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: "middle",
                fill: "#adb5bd",
                ...theme.typography.body1,
              }}
            >
              Sales (Rs)
            </Label>
          </YAxis>
          <Line
            isAnimationActive={true}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
