import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { toast } from "react-toastify";

import Chart from "./components/Chart";
import Deposits from "./components/Deposits";
import BtnStatusToggle from "../../components/BtnStatusToggle";
import useSocket from "../../hooks/useSocket";

export default function AdminDashboard() {
  const { statusOpenDoor, toggleOpenDoorStatus, connected } = useSocket();
  const handleOpenDoor = () => {
    if (connected) {
      toggleOpenDoorStatus(!statusOpenDoor);
    } else {
      toast.warn("Đang kết nối Socket IO");
    }
  };

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
          {/* btn turn on  */}
          <div className="w-full flex justify-end gap-[5px]">
            <p className="font-bold text-[14px]">
              Trạng thái <span className="text-[10px]">(Đóng/ Mở cửa)</span>
            </p>
            <BtnStatusToggle
              isActiveExternal={statusOpenDoor}
              fncHandle={handleOpenDoor}
            />
          </div>
          {/* chart  */}
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
