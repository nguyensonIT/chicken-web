import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useSearchParams } from "react-router-dom";

const Category = ({ sideTop = false, name, id, className }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <Link
      className={
        className +
        `${
          searchParams.get("category") === id ? " text-textHoverColor" : ""
        } flex items-center font-bold my-[5px] transition-[2s] hover:text-textHoverColor border-b-[1px] border-b-borderColor dark:border-borderDarkColor`
      }
      to={`/products?category=${id}`}
    >
      {searchParams.get("category") === id && sideTop && (
        <FontAwesomeIcon className="mr-[3px]" icon={faCaretRight} />
      )}
      <span className="ml-[5px] inline-block max-w-full overflow-hidden whitespace-nowrap text-ellipsis">
        {name}
      </span>
    </Link>
  );
};
export default Category;
