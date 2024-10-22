import {
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ItemRowProduct from "../ItemRowProduct";
import { useState } from "react";

const ItemBodyRowCategory = ({ data }) => {
  const [idCollapse, setIdCollapse] = useState(false);

  const handleCollapse = () => {
    setIdCollapse(!idCollapse);
  };
  return (
    <>
      <tr>
        <td colSpan={4} className="px-6 py-3">
          {data.nameCategory}
          {idCollapse ? (
            <FontAwesomeIcon
              onClick={handleCollapse}
              className="ml-[10px] text-[16px] p-[3px] cursor-pointer"
              icon={faChevronDown}
            />
          ) : (
            <FontAwesomeIcon
              onClick={handleCollapse}
              className="ml-[10px] text-[16px] p-[3px] cursor-pointer"
              icon={faChevronRight}
            />
          )}
        </td>
      </tr>
      {idCollapse &&
        data.products.map((products, index) => {
          return <ItemRowProduct key={index} data={products} />;
        })}
    </>
  );
};

export default ItemBodyRowCategory;
