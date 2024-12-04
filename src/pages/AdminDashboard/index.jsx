import * as React from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { toast } from "react-toastify";

//Thư viện date
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import vi from "date-fns/locale/vi";

import Chart from "./components/Chart";
import Deposits from "./components/Deposits";
import BtnStatusToggle from "../../components/BtnStatusToggle";
import useSocket from "../../hooks/useSocket";

export default function AdminDashboard() {
  const { statusOpenDoor, toggleOpenDoorStatus, connected } = useSocket();

  const [selectedDate, setSelectedDate] = useState(new Date());
  registerLocale("vi", vi);

  const handleOpenDoor = () => {
    if (connected) {
      toggleOpenDoorStatus(!statusOpenDoor);
    } else {
      toast.warn("Đang kết nối Socket IO");
    }
  };

  const handleClickToday = () => {
    setSelectedDate(new Date());
  };

  return (
    <div className="h-[100vh]">
      <Grid item xs={12} md={8} lg={9}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 400,
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
          {/* Chọn ngày  */}
          <div className="flex flex-col items-end p-4">
            <h3 className="text-[14px] font-semibold mb-2">Chọn ngày:</h3>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              locale="vi"
              dateFormat="dd/MM/yyyy"
              className="p-2 mb-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              calendarClassName="bg-white shadow-lg rounded-lg border border-gray-200"
            />
            <span
              onClick={handleClickToday}
              className="px-[10px] py-[5px] rounded-md bg-btnColor hover:bg-btnHoverColor text-white transition-all cursor-pointer"
            >
              Hôm nay
            </span>
          </div>
          {/* chart  */}
          <Chart selectedDate={selectedDate} />
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
          <Deposits selectedDate={selectedDate} />
        </Paper>
      </Grid>
    </div>
  );
}
