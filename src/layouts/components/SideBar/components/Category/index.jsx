import { Link, useSearchParams } from "react-router-dom";

const Category = ({ name, id, className }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <Link
      className={
        className +
        `${
          searchParams.get("category") == id ? " text-textHoverColor" : ""
        } my-[5px] transition-[2s] hover:text-textHoverColor`
      }
      to={`/products?category=${id}`}
    >
      <span className="ml-[5px]">{name}</span>
    </Link>
  );
};
export default Category;
