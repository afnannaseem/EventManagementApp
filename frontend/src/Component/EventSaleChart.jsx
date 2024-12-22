import { Skeleton, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useQuery } from '@tanstack/react-query';
import * as React from "react";
import {
  Label,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import sendRequest from '../Api Call/apiCalls';

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
  createData("12sep", 0),
  createData("13sep", 300),
  createData("14sep", 600),
  createData("15sep", 5000),
  createData("16sep", 3000),
  createData("17sep", 2500),
  createData("18sep", 4000),
];
export default function EventChart(props) {
  const theme = useTheme();
  const { data: eventSale, isLoading, isError } = useQuery({
    queryKey: ['eventSale'],
    queryFn: () => sendRequest(process.env.REACT_APP_Base_URL2 + "/getEvents", 'GET'),
    staleTime: 0,
  })
  if (eventSale?.events?.length === 0) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Typography component="div" sx={{ mt: 10, color: '#ffff', fontSize: 16 }}>
          <b>Not any sale</b>
        </Typography>
      </div>
    )
  }
  if (isError) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Typography component="div" sx={{ mt: 10, color: '#ffff', fontSize: 16 }}>
          <b>Something Went Wrong</b>
        </Typography>
      </div>
    )
  }
  if (isLoading) {
    return (
      <>
        <Skeleton animation="wave" variant="rectangular" height={"100%"} width={"100%"} style={{ backgroundColor: '#444A52', color: "white", borderRadius: '8px', marginBottom: "20px" }} />
      </>
    )
  }

  return (
    <React.Fragment>
      <Typography
        component="div"
        sx={{ ml: 3, mt: 1, mb: 1, color: "#fff", fontSize: 14 }}
      >
        <b>Total Sale</b>
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
          <XAxis dataKey="time" stroke="#ffff" style={{ ...theme.typography.body2 }} />
          <YAxis stroke="#ffff" style={{ ...theme.typography.body2 }}>
            <Label
              angle={-90}
              position="insideLeft"
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