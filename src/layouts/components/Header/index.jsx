import { NavLink, Link } from 'react-router-dom'

import logo from "../../../assets/img/Logo.png"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

import Tippy from "@tippyjs/react/headless";

const menus = [
    {
        name: "Trang chủ",
        href: "/"
    },
    {
        name: "Sản phẩm",
        href: "/products",
        children: [
            {
                name: "Sản phẩm mới",
                href: "/products-new"
            },
            {
                name: "Sản phẩm hot",
                href: "/products-hot"
            },
            {
                name: "Sản phẩm khuyến mãi",
                href: "/products-sale"
            },
        ]
    },
    {
        name: "Tin tức",
        href: "/news"
    },
    {
        name: "Giới thiệu",
        href: "/introduce"
    },
]
function Header() {
    return (
        <div className="h-[120px] w-full flex bg-slate-50">
            <div className="left w-[25%] flex justify-center items-center ">
                <div className="logo w-[50px] h-[50px] ">
                    <img className="w-full h-full rounded-[8px]" src={logo} alt="logo" />
                </div>
                <p className="brand ml-[20px] text-[#FFD700] font-bold text-[20px]">VUA GÀ TƯƠI</p>
            </div>
            <div className="middle w-[50%] flex flex-col justify-center items-center">
                <div className="flex">
                    {menus.map((menu, index) => {

                        if (menu.children) {
                            return (
                                <div className="relative">
                                    <div className="popup absolute bg-[green] bottom-[-20px] ">
                                        <h1>popup</h1>
                                    </div>
                                    <a 
                                        onMouseEnter={() => document.querySelector('.popup').classList.remove('hidden')}
                                        onMouseLeave={() => document.querySelector('.popup').classList.add('hidden')}
                                        className="mr-[8px] p-[2px] hover:text-[#FFD700]" 
                                        href={menu.href} key={index}>
                                        {menu.name}
                                        <FontAwesomeIcon icon={faCaretDown} className="ml-[5px] text-[12px]" />
                                    </a>
                                </div>
                            )
                        }
                        return (
                            <div><a className="mr-[8px] p-[2px] hover:text-[#FFD700]" href={menu.href} key={index}>{menu.name}</a></div>
                        )
                    })}
                </div>
                <div>
                    <div className="mt-[20px] border focus:border-yellow-500 rounded-md flex items-center overflow-hidden">
                        <input
                            type="text"
                            placeholder="Tìm kiếm..."
                            className="py-2 px-3 focus:outline-none flex-1  "
                        />
                        <button className="bg-yellow-500 text-white px-4 py-2 ">
                            Tìm kiếm
                        </button>
                    </div>

                </div>
            </div>
            <div className="right w-[25%]"></div>
        </div>
    )
}

export default Header