import { menus } from "./DataMenu"
import logo from "../../../assets/img/Logo.png"

import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

import "./index.css"

function Header() {

  // style active-nav function  
  const navLinkStyle = ({ isActive }) => ({
    color: isActive ? '#FFD700' : '',
  })

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
                    <li
                      className=
                      "absolute top-[-5px] left-[30px] border-solid border-x-[5px] border-x-[transparent] border-b-[5px] border-b-[white] ">
                    </li>
                    {/* map 2 */}
                    {menu.children.map((menu, index) => {
                      return (
                        <li className="whitespace-nowrap" key={index}>
                          <Link className="block transition-[2s] hover:text-textHoverColor" to={menu.href}>
                            {menu.name}
                          </Link>
                        </li>
                      )
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

      <div className="right w-[25%] flex justify-center items-center ">
        <button className="transition-[2s] rounded-md bg-btnColor hover:bg-btnHoverColor text-white px-4 py-2 ">Đăng nhập</button>
      </div>
    </div>
  );
}

export default Header;
