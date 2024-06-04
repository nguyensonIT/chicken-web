import { NavLink, Link } from 'react-router-dom'

import logo from "../../../assets/img/Logo.png"

const menus = [
    {
        name: "Trang chủ",
        href: "/"
    },
    {
        name: "Sản phẩm",
        href: "/products"
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
                <div className="">
                    {menus.map((menu,index)=>{
                        return(
                            <a className="mr-[8px] p-[2px] hover:text-[#FFD700]" href={menu.href} key={index}>{menu.name}</a>
                        )
                    })}
                </div>
                <div> 
                    <input type="text" />
                </div>
            </div>
            <div className="right w-[25%]"></div>
        </div>
    )
}

export default Header