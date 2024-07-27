import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import Chart from "./components/Chart";
import Deposits from "./components/Deposits";

export default function AdminDashboard() {
  return (
    <div className="h-[100vh]">
      <Grid item xs={12} md={8} lg={9}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 240,
          }}
        >
          <Chart />
        </Paper>
      </Grid>
      {/* Deposits */}
      <Grid item xs={12} md={4} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 240,
          }}
        >
          <Deposits />
        </Paper>
      </Grid>
    </div>
  );
}
