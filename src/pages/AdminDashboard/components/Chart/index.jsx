import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { LineChart, axisClasses } from "@mui/x-charts";
import moment from "moment";
import { isEqual, startOfDay } from "date-fns";

import Title from "../Title";
import { useHandleContext } from "../../../../contexts/UserProvider";
import { useEffect, useState } from "react";

// Generate Sales Data

export default function Chart({ selectedDate }) {
  const { dataAllOrderContext } = useHandleContext();

  const [dataOrdersSelectDate, setDataOrdersSelectDate] = useState([]);

  const createData = (time, amount) => {
    return { time, amount: amount ?? null };
  };

  const countOrdersByTimeRange = (orders, startHour, endHour) => {
    return orders.filter((order) => {
      const orderTime = new Date(order.orderDate); // Lấy thời gian từ đơn hàng
      const orderHour = orderTime.getHours(); // Chỉ lấy giờ

      // So sánh giờ trong khoảng
      return orderHour >= startHour && orderHour < endHour;
    }).length;
  };

  const data = [
    createData("09:00", 0),
    createData("10:00", countOrdersByTimeRange(dataOrdersSelectDate, 9, 10)),
    createData("11:00", countOrdersByTimeRange(dataOrdersSelectDate, 9, 11)),
    createData("12:00", countOrdersByTimeRange(dataOrdersSelectDate, 9, 12)),
    createData("13:00", countOrdersByTimeRange(dataOrdersSelectDate, 9, 13)),
    createData("14:00", countOrdersByTimeRange(dataOrdersSelectDate, 9, 14)),
    createData("17:00", countOrdersByTimeRange(dataOrdersSelectDate, 9, 17)),
    createData("18:00", countOrdersByTimeRange(dataOrdersSelectDate, 9, 18)),
    createData("19:00", countOrdersByTimeRange(dataOrdersSelectDate, 9, 19)),
    createData("20:00", countOrdersByTimeRange(dataOrdersSelectDate, 9, 20)),
    createData("21:00", countOrdersByTimeRange(dataOrdersSelectDate, 9, 21)),
    createData("22:00", countOrdersByTimeRange(dataOrdersSelectDate, 9, 22)),
  ];

  const theme = useTheme();

  const m = moment(selectedDate);
  const datePart = m.format("DD-MM-YYYY");

  const today = startOfDay(new Date());
  const selected = startOfDay(selectedDate);

  const fncPreparingOrders = (orders) => {
    const preparingOrders = orders.filter(
      (order) => order.statusOrder.isDelivered
    );
    return preparingOrders;
  };

  const fncFillterDateOrders = (data, selected) => {
    const fillterDateOrders = data.filter((order) =>
      isEqual(startOfDay(order.orderDate), selected)
    );
    return fillterDateOrders;
  };

  useEffect(() => {
    const preparingOrders = fncPreparingOrders(dataAllOrderContext);
    const ordersCurrent = fncFillterDateOrders(preparingOrders, selected);

    setDataOrdersSelectDate(ordersCurrent);
  }, [dataAllOrderContext, selectedDate]);

  return (
    <React.Fragment>
      <Title>{`${
        isEqual(selected.getTime(), today.getTime())
          ? "Hôm nay"
          : "Ngày " + datePart
      }`}</Title>
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
