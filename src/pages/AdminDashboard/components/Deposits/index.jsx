import * as React from "react";
import Typography from "@mui/material/Typography";
import { isEqual, startOfDay } from "date-fns";
import moment from "moment";

import Title from "../Title";
import { useEffect, useState } from "react";
import { useHandleContext } from "../../../../contexts/UserProvider";
import { formatCurrency } from "../../../../components/FormatCurrency";

export default function Deposits({ selectedDate }) {
  const { dataAllOrderContext } = useHandleContext();

  const [dataOrdersSelectDate, setDataOrdersSelectDate] = useState([]);
  const [totalOfTheDay, setTotalOfTheDay] = useState(0);

  const today = startOfDay(new Date());
  const selected = startOfDay(selectedDate);
  const m = moment(selectedDate);
  const datePart = m.format("DD-MM-YYYY");

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
  }, [selectedDate, dataAllOrderContext]);

  useEffect(() => {
    const totalPrice = dataOrdersSelectDate.reduce((total, order) => {
      if (order.totalBill && typeof order.totalBill === "number") {
        return total + order.totalBill;
      }
      return total;
    }, 0);
    setTotalOfTheDay(totalPrice);
  }, [dataOrdersSelectDate]);

  return (
    <React.Fragment>
      <Title>
        Tổng số tiền thu được ngày{" "}
        {`${
          isEqual(selected.getTime(), today.getTime()) ? "hôm nay" : datePart
        }`}
      </Title>
      <Typography component="p" variant="h4">
        {formatCurrency(totalOfTheDay)}
        <span className="mr-[8px] relative top-[-10px] font-normal text-[24px] italic">
          đ
        </span>
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Hôm nay, 04 - 07 - 2024
      </Typography>
    </React.Fragment>
  );
}
