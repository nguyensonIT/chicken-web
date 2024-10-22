import { useState } from "react";
import chef from "../../../assets/img/chef.png";
import { dataSideBarAdmin } from "./components/DataSideBar";

import { Link } from "react-router-dom";
const AdminSideBar = () => {
  const [href, setHref] = useState(location.pathname);
  const handleClick = (data) => {
    setHref(data.href);
  };

  return (
    <div className="h-[100%] bg-gradient-to-r from-[#2c3e50] to-[#34495e] text-white">
      <div className="relative h-[200px] pt-[20px] flex flex-col justify-center items-center border-b-2">
        <div className="absolute top-[20px]">
          <p className="text-[30px] font-bold z-10">ADMIN</p>
          <img
            className="h-[120px] w-full object-contain opacity-[0.6]"
            src={chef}
            alt="chef"
          />
        </div>
      </div>
      <div className="pt-[20px]">
        {dataSideBarAdmin.map((data, index) => {
          return (
            <Link
              onClick={() => handleClick(data)}
              key={index}
              className={`${
                data.href === href ? "bg-[#0f1318]" : ""
              } nav-link block p-[8px] hover:bg-[#0f1318]`}
              to={data.href}
            >
              {data.icon}
              <p className="inline-block ml-[7px]">{data.name}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default AdminSideBar;
