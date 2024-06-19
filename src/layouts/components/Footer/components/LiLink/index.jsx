const LiLink = ({icon, href, text}) => {
    return (
        <li className="flex items-center mb-2"> {icon}
            <a className="block transition-[2s] p-0 text-blueGray-600 hover:text-textHoverColor font-semibold text-[10px]" href={href}>{text}</a>
        </li>
    )
}
export default LiLink