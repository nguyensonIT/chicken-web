import { menus } from "./DataMenu";
import logo from "../../../assets/img/Logo.png";

import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCartShopping } from "@fortawesome/free-solid-svg-icons";

import "./index.css";
import { useState } from "react";
import Login from "../../../components/Login";

function Header() {
  const [isDialog, setIsDialog] = useState(false);
  // style active-nav function
  const navLinkStyle = ({ isActive }) => ({
    color: isActive ? "#FFD700" : "",
  });

  const handleDialogLogin = () => {
    setIsDialog(true);
  };

  return (
    <div className="h-[120px] w-full flex bg-bgHeaderColor ">
      {/* LEFT HEADR */}

      <div className="left w-[25%] flex justify-center items-center ">
        <div className="logo w-[50px] h-[50px] ">
          <img className="w-full h-full rounded-[8px]" src={logo} alt="logo" />
        </div>
        <p className="brand ml-[20px] text-[#FFD700] font-bold text-[20px]">
          VUA GÀ TƯƠI
        </p>
      </div>

      {/* MIDDLE HEADER */}

      <div className="middle w-[50%] flex flex-col justify-center items-center">
        <ul className="flex">
          {/* map 1 */}
          {menus.map((menu, index) => {
            if (menu.children) {
              return (
                <li key={index} className="relative nav-parent">
                  <NavLink
                    className="nav-link transition-[2s] block mr-[8px] p-[2px] hover:text-textHoverColor"
                    style={navLinkStyle}
                    to={menu.href}
                    key={index}
                  >
                    {menu.name}
                    <FontAwesomeIcon
                      icon={faCaretDown}
                      className="ml-[5px] text-[12px]"
                    />
                  </NavLink>
                  <ul className="active-nav absolute bg-[white] mt-[20px] p-[10px] shadow-md">
                    <li className="absolute h-[27px] w-full bg-[transparent]  top-[-26px] left-0"></li>
                    <li className="absolute top-[-5px] left-[30px] border-solid border-x-[5px] border-x-[transparent] border-b-[5px] border-b-[white] "></li>
                    {/* map 2 */}
                    {menu.children.map((menu, index) => {
                      return (
                        <li className="whitespace-nowrap" key={index}>
                          <Link
                            className="block transition-[2s] hover:text-textHoverColor"
                            to={menu.href}
                          >
                            {menu.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            }
            return (
              <NavLink
                className="nav-link block transition-[2s] mr-[8px] p-[2px] hover:text-[#FFD700]"
                style={navLinkStyle}
                to={menu.href}
                key={index}
              >
                {menu.name}
              </NavLink>
            );
          })}
        </ul>
        <div>
          <div className="mt-[20px] border focus:border-yellow-500 rounded-md flex items-center overflow-hidden">
            <input
              type="text"
              placeholder="Tìm kiếm món ăn..."
              className="py-2 px-3 focus:outline-none flex-1  "
            />
            <button className="transition-[2s] bg-btnColor hover:bg-btnHoverColor text-white px-4 py-2 ">
              Tìm kiếm
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT HEADER  */}

      <div className="right w-[25%] flex justify-around items-center ">
        <Link
          to={"/cart"}
          className="relative pr-[8px] text-[18px] cursor-pointer text-cartColor"
        >
          <FontAwesomeIcon icon={faCartShopping} />
          <span className="absolute block top-[-10px] right-[-8px] min-w-[20px] min-h-[20px] text-white text-[12px] flex justify-center items-center rounded-[50%] bg-textEmphasizeColor">
            1
          </span>
        </Link>
        <button
          type="button"
          onClick={handleDialogLogin}
          className="transition-[2s] rounded-md bg-btnColor hover:bg-btnHoverColor text-white px-4 py-2 "
        >
          Đăng nhập
        </button>
      </div>

      {/* Dialog Login  */}

      {isDialog && <Login setIsDialog={setIsDialog} />}
    </div>
  );
}

export default Header;
