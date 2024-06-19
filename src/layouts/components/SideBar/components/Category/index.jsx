import { NavLink } from "react-router-dom"

const Category = ({ icon, name, href, className }) => {
    // style active-nav function  
    const navLinkStyle = ({ isActive }) => ({
        color: isActive ? '#FFD700' : '',
    })
    return (
        <NavLink className={className +" nav-link my-[5px] transition-[2s] hover:text-textHoverColor"} to={href} style={navLinkStyle}>
            <span>{icon}</span>
            <span className="ml-[5px]">{name}</span>
        </NavLink>
    )
}
export default Category