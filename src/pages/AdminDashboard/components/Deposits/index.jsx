import * as React from "react";
import Typography from "@mui/material/Typography";
import Title from "../Title";

export default function Deposits() {
  return (
    <React.Fragment>
      <Title>Tổng số tiền thu được ngày hôm nay</Title>
      <Typography component="p" variant="h4">
        11.258.000
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
