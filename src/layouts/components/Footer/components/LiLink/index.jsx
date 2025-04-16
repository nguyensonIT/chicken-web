import { Link } from "react-router-dom";

const LiLink = ({ icon, href, text }) => {
  return (
    <li className="flex items-center mb-2 ">
      {" "}
      <span className="dark:text-textDarkColor">{icon}</span>
      <Link
        className="block text-wrap transition-[2s] p-0 text-blueGray-600 hover:text-textHoverColor font-semibold text-[10px]"
        to={href}
      >
        {text}
      </Link>
    </li>
  );
};
export default LiLink;
