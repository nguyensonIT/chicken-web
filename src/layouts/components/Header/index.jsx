import { NavLink, Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretRight,
  faCartShopping,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";

import { listMenuAvatar, menus } from "./DataMenu";
import logo from "../../../assets/img/Logo.png";
import "./index.css";
import Login from "../../../components/Login";
import { useHandleContext } from "../../../contexts/UserProvider";
import DialogQuestionYesNo from "../../../components/DialogQuestionYesNo";

function Header() {
  const navigate = useNavigate();
  const { user, quantityProductInCartContext } = useHandleContext();

  const refDialog = useRef(null);

  const [token, setToken] = useState(localStorage.getItem("authToken") || "");
  const [isDialog, setIsDialog] = useState(false);
  const [isDialogLogout, setIsDialogLogout] = useState(false);
  const [isListOptionBoxAvatar, setIsListOptionBoxAvatar] = useState(false);
  const [quantityProductInCart, setQuantityProductInCart] = useState(0);

  const [menuAvatar, setMenuAvatar] = useState(listMenuAvatar);

  // data function action

  const handleClickBoxAvatar = () => {
    if (isListOptionBoxAvatar) {
      setMenuAvatar(listMenuAvatar);
      setIsListOptionBoxAvatar(!isListOptionBoxAvatar);
    } else {
      setIsListOptionBoxAvatar(!isListOptionBoxAvatar);
    }
  };

  const handlePrevOption = () => {
    setMenuAvatar(listMenuAvatar);
  };

  const handleDialogLogout = () => {
    if (isDialogLogout) {
      refDialog.current.classList.add("isClose");
      setTimeout(() => {
        setIsDialogLogout(false);
      }, 300);
    } else {
      setIsDialogLogout(true);
    }
  };

  const handleDarkMode = (data) => {
    console.log(data);
  };

  const handleLanguage = (data) => {
    setMenuAvatar(data.children);
  };
  const handleEnglish = () => {
    console.log("Tiếng anh");
  };
  const handleVietnamese = () => {
    console.log("Tiếng việt");
  };
  const handleNavigateProfile = () => {
    navigate("/profile");
  };

  // action handle
  const action = [
    {
      id: 1,
      handle: handleDialogLogout,
    },
    {
      id: 2,
      handle: handleDarkMode,
    },
    {
      id: 3,
      handle: handleLanguage,
    },
    {
      id: 4,
      handle: handleEnglish,
    },
    {
      id: 5,
      handle: handleVietnamese,
    },
    {
      id: 6,
      handle: handleNavigateProfile,
    },
  ];

  // style active-nav function
  const navLinkStyle = ({ isActive }) => ({
    color: isActive ? "#FFD700" : "",
  });

  const handleClickOption = (data) => {
    action.forEach((item) => {
      if (item.id === data.id) {
        return item.handle(data);
      }
    });
  };

  const handleDialogLogin = () => {
    setIsDialog(true);
  };

  const handleLogout = () => {
    refDialog.current.classList.add("isClose");
    setTimeout(() => {
      setIsDialogLogout(false);
    }, 400);
    localStorage.clear();
    window.location.reload();
  };

  useEffect(() => {
    setQuantityProductInCart(quantityProductInCartContext);
  }, [quantityProductInCartContext]);

  useEffect(() => {
    isDialogLogout && refDialog.current.classList.add("isDetail");
  }, [isDialogLogout]);

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
                            className="tag-link block transition-[2s] hover:text-textHoverColor"
                            to={menu.href}
                          >
                            <FontAwesomeIcon
                              className="icon-right text-[12px] mr-[5px]"
                              icon={faCaretRight}
                            />
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
          {/* quantity in cart */}
          {quantityProductInCart > 0 && (
            <span className="absolute block top-[-10px] right-[-8px] min-w-[20px] min-h-[20px] text-white text-[12px] flex justify-center items-center rounded-[50%] bg-textEmphasizeColor">
              {quantityProductInCart}
            </span>
          )}
        </Link>
        {/* login  */}
        <div>
          {token ? (
            <div className="relative ">
              <div
                onClick={handleClickBoxAvatar}
                className="flex justify-center items-center cursor-pointer"
              >
                <p className="w-[80px] font-bold text-[12px] mr-[10px] truncate">
                  {user?.name}
                </p>
                <img
                  className="w-[40px] h-[40px] rounded-[50%] border"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = logo;
                  }}
                  src={user?.image || logo}
                  alt="avatar"
                />
              </div>
              {isListOptionBoxAvatar && (
                <ul className="py-[10px] absolute bg-white shadow-md min-w-[150px] top-full right-0 border border-solid">
                  {menuAvatar[0].prev && (
                    <li
                      onClick={handlePrevOption}
                      className="bg-slate-200 hover:bg-bgHoverColor pl-[8px] cursor-pointer"
                    >
                      <FontAwesomeIcon icon={faChevronLeft} />
                    </li>
                  )}
                  {menuAvatar.map((item, index) => {
                    return (
                      <li
                        key={index}
                        className="flex justify-between items-center my-[5px] py-[5px] px-[10px] hover:bg-bgHoverColor cursor-pointer"
                        onClick={() => handleClickOption(item)}
                      >
                        <p className="text-[12px] mr-[10px] text-nowrap">
                          {item.option}
                        </p>
                        <div className="block">{item?.icon}</div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={handleDialogLogin}
              className="transition-[2s] rounded-md bg-btnColor hover:bg-btnHoverColor text-white px-4 py-2 "
            >
              Đăng nhập
            </button>
          )}
        </div>
      </div>

      {/* Dialog Login  */}
      {isDialog && <Login setIsDialog={setIsDialog} />}
      {/* Dialog Logout  */}
      {isDialogLogout && (
        <DialogQuestionYesNo
          refDialog={refDialog}
          title="Bạn có chắc muốn đăng xuất không"
          textNo="Hủy"
          textYes="Đăng xuất"
          handleYes={handleLogout}
          handleNo={handleDialogLogout}
        />
      )}
    </div>
  );
}

export default Header;
