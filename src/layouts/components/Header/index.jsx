import { NavLink, Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCaretDown,
  faCaretRight,
  faCartShopping,
  faChevronLeft,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";

import { listMenuAvatar, menus } from "./DataMenu";
import logo from "../../../assets/img/Logo.png";
import "./index.css";
import Login from "../../../components/Login";
import { useHandleContext } from "../../../contexts/UserProvider";
import DialogQuestionYesNo from "../../../components/DialogQuestionYesNo";
import PopupWrapper from "../../../components/PopupWrapper";
import FindProduct from "./components/FindProduct";
import BtnActiveDoor from "./components/BtnActiveDoor";
import { toast } from "react-toastify";

function Header() {
  const navigate = useNavigate();
  const { user, quantityProductInCartContext, dataLogoContext } =
    useHandleContext();

  const refDialog = useRef(null);
  const refMenu = useRef(null);
  const refNavbar = useRef(null);
  const refChild = useRef(null);

  const [token, setToken] = useState(localStorage.getItem("authToken") || "");
  const [isDialog, setIsDialog] = useState(false);
  const [isDialogLogout, setIsDialogLogout] = useState(false);
  const [isListOptionBoxAvatar, setIsListOptionBoxAvatar] = useState(false);
  const [quantityProductInCart, setQuantityProductInCart] = useState(0);

  const [isNavChild, setIsNavChild] = useState(false);
  const [isNavbar, setIsNavbar] = useState(false);
  const [isInpFind, setIsInpFind] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const [menuAvatar, setMenuAvatar] = useState(listMenuAvatar);

  //mobile nav
  const handleClickNavbar = () => {
    setIsNavbar((prev) => !prev);
  };

  const handleTurnInpFind = () => {
    if (isInpFind) {
      refChild.current.classList.add("isNotFind");
      setTimeout(() => {
        setIsInpFind((prev) => !prev);
      }, 300);
    } else {
      setIsInpFind((prev) => !prev);
      setTimeout(() => {
        refChild.current.classList.add("isFind");
      }, 300);
    }
  };

  const handleClickLinkNav = () => {
    setIsNavChild((prev) => !prev);
  };
  // data function action

  const handleClickBoxAvatar = () => {
    if (isListOptionBoxAvatar) {
      setMenuAvatar(listMenuAvatar);
      setIsListOptionBoxAvatar(!isListOptionBoxAvatar);
    } else {
      setIsListOptionBoxAvatar(!isListOptionBoxAvatar);
    }
  };

  const handleClickOutside = (event) => {
    if (refMenu.current && !refMenu.current.contains(event.target)) {
      setIsListOptionBoxAvatar(false);
    } else if (refNavbar.current && !refNavbar.current.contains(event.target)) {
      refNavbar.current.classList.add("isFadeOutNav");
      setTimeout(() => {
        setIsNavbar(false);
      }, 200);
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

  //hnadle dark light
  const handleDarkMode = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("isThemeDark", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("isThemeDark", "false");
    }
  };
  //

  const handleLanguage = (data) => {
    setMenuAvatar(data.children);
  };
  const handleEnglish = () => {
    toast.warn("In the process of development");
  };
  const handleVietnamese = () => {
    toast.warn("Đang trong chế độ tiếng việt");
  };
  const handleNavigateProfile = () => {
    navigate("/profile");
  };
  const handleNavigateAdmin = () => {
    navigate("/admin");
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
    {
      id: 7,
      handle: handleNavigateAdmin,
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

  //HAndle Find product
  const handleFindProduct = () => {
    console.log("Tìm kiếm!");
  };

  // Đọc từ localStorage key: isThemeDark
  useEffect(() => {
    const storedTheme = localStorage.getItem("isThemeDark");
    const isDarkStored = storedTheme === "true"; // vì localStorage lưu kiểu string
    setIsDark(isDarkStored);

    if (isDarkStored) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);
  // end THEME

  useEffect(() => {
    setQuantityProductInCart(quantityProductInCartContext);
  }, [quantityProductInCartContext]);

  useEffect(() => {
    isDialogLogout && refDialog.current.classList.add("isDetail");
  }, [isDialogLogout]);

  useEffect(() => {
    isNavbar && refNavbar.current.classList.add("isNavMobile");
  }, [isNavbar]);

  useEffect(() => {
    isInpFind && refChild.current.classList.add("isFind");
  }, [isInpFind]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="max-sm:p-[10px] max-sm:h-auto h-[120px] w-full flex bg-bgHeaderColor dark:text-textDarkColor dark:bg-bgDarkHeaderColor ">
        {/* LEFT HEADR */}

        <Link
          to="/"
          className="max-sm:w-[35%] max-sm:justify-start w-[25%] flex justify-center items-center gap-[20px]"
        >
          <div className="logo max-sm:size-[75px] size-[50px] ">
            <img
              className="w-full h-full rounded-[8px]"
              src={dataLogoContext?.logoUrl || logo}
              alt="logo"
            />
          </div>
          <p className="max-sm:hidden text-sm text-center brand text-[#FFD700] font-bold">
            VUA GÀ TƯƠI
          </p>
        </Link>

        {/* MIDDLE HEADER */}

        <div className="max-sm:w-[10%] w-[50%] flex flex-col justify-center items-center">
          {/* menu */}
          <ul className="max-sm:hidden flex">
            {/* map 1 */}
            {menus.map((menu, index) => {
              if (menu.children) {
                return (
                  <li key={index} className="relative nav-parent">
                    <NavLink
                      className="nav-link transition-[2s] block mr-[8px] p-[2px] hover:text-textHoverColor  "
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
                    <ul className="active-nav absolute bg-[white] dark:bg-bgDarkSideBarColor mt-[20px] p-[10px] shadow-md z-10">
                      <li className="absolute h-[27px] w-full bg-[transparent]  top-[-26px] left-0"></li>
                      <li className="absolute top-[-5px] left-[30px] border-solid border-x-[5px] border-x-[transparent] border-b-[5px] border-b-[white] dark:border-b-bgDarkSideBarColor"></li>
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
            <FindProduct
              className="max-sm:hidden mt-[20px]"
              handleFindProduct={handleFindProduct}
            />
          </div>
        </div>

        {/* RIGHT HEADER  */}

        <div className="max-sm:w-[55%] max-sm:flex-col max-sm:gap-[20px] w-[25%] flex justify-around items-center ">
          <div className=" max-sm:w-full max-sm:justify-end max-sm:gap-[15px] flex justify-around items-center gap-[20px]">
            <Link
              to={"/cart"}
              className="relative pr-[8px] text-[18px] cursor-pointer text-cartColor"
            >
              <FontAwesomeIcon
                className="max-sm:text-smBtn"
                icon={faCartShopping}
              />
              {/* quantity in cart */}
              {quantityProductInCart > 0 && (
                <span className="max-sm:text-[8px] max-sm:min-w-[17px] max-sm:min-h-[17px] max-sm:right-[-3px] max-sm:top-[-8px] absolute block top-[-10px] right-[-8px] min-w-[20px] min-h-[20px] text-white text-[12px] flex justify-center items-center rounded-[50%] bg-textEmphasizeColor">
                  {quantityProductInCart}
                </span>
              )}
            </Link>
            {/* login  */}
            <div className="">
              {token ? (
                <div className="relative ">
                  <div
                    onClick={handleClickBoxAvatar}
                    className="flex justify-center items-center cursor-pointer"
                  >
                    <p className="max-sm:hidden w-[80px] font-bold text-[12px] mr-[10px] truncate">
                      {user?.name}
                    </p>
                    <img
                      className="w-[40px] h-[40px] rounded-[50%] border object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = logo;
                      }}
                      src={user?.image || logo}
                      alt="avatar"
                    />
                  </div>
                  {isListOptionBoxAvatar && (
                    <ul
                      ref={refMenu}
                      className="py-[10px] absolute bg-white dark:bg-bgDarkSideBarColor dark:border-bgDarkSideBarColor shadow-md min-w-[150px] top-full right-0 border border-solid z-20"
                    >
                      {menuAvatar[0].prev && (
                        <li
                          onClick={handlePrevOption}
                          className="bg-slate-200 hover:bg-bgHoverColor dark:bg-bgDarkSideBarColor pl-[8px] cursor-pointer"
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
                            <div className="block">
                              {item?.icon &&
                                item.icon({
                                  isActiveExternal: isDark,
                                  fncHandle: handleDarkMode,
                                })}
                            </div>
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
                  className="max-sm:py-[5px] max-sm:px-[4px] max-sm:text-smBtn text-sm transition-[2s] rounded-md bg-btnColor hover:bg-btnHoverColor text-white px-4 py-2 "
                >
                  Đăng nhập
                </button>
              )}
            </div>
          </div>
          {/* menu  icon nav mobile*/}
          <div className="sm:hidden flex w-full justify-end gap-[20px]">
            <div
              onClick={handleTurnInpFind}
              className=" flex justify-center items-center size-[20px] "
            >
              <FontAwesomeIcon
                className="max-sm:text-smBtn"
                icon={faMagnifyingGlass}
              />
            </div>
            <div
              onClick={handleClickNavbar}
              className=" flex justify-center items-center size-[20px] "
            >
              <FontAwesomeIcon className="max-sm:text-smBtn" icon={faBars} />
            </div>
            {isNavbar && (
              <PopupWrapper>
                <div
                  ref={refNavbar}
                  className=" absolute right-0 bg-white dark:bg-bgDarkSideBarColor w-[200px] h-full "
                >
                  <ul className="flex flex-col w-full dark:text-textDarkColor">
                    {menus.map((menu, index) => {
                      if (menu.children) {
                        return (
                          <li
                            onClick={handleClickLinkNav}
                            key={index}
                            className="relative"
                          >
                            <span
                              className="transition-[2s] text-sm block pl-[20px] py-[10px] border-b"
                              key={index}
                            >
                              {menu.name}
                              <FontAwesomeIcon
                                icon={faCaretDown}
                                className="text-sm ml-[5px] text-[12px]"
                              />
                            </span>
                            {isNavChild && (
                              <ul className=" bg-[white] dark:bg-bgDarkSideBarColor transition-all">
                                {menu.children.map((menu, index) => {
                                  return (
                                    <li
                                      className="whitespace-nowrap"
                                      key={index}
                                    >
                                      <Link
                                        className="pl-[40px] py-[6px] text-[14px] border-b block transition-[2s] transition-all"
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
                            )}
                          </li>
                        );
                      }
                      return (
                        <NavLink
                          className="nav-link block text-sm transition-[2s] pl-[20px] py-[10px] border-b "
                          style={navLinkStyle}
                          to={menu.href}
                          key={index}
                        >
                          {menu.name}
                        </NavLink>
                      );
                    })}
                  </ul>
                </div>
              </PopupWrapper>
            )}
          </div>
        </div>
      </div>
      <div className="sm:hidden shadow-sm mt-[-1px]">
        {!isInpFind && <BtnActiveDoor />}
        {isInpFind && (
          <FindProduct ref={refChild} handleFindProduct={handleFindProduct} />
        )}
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
