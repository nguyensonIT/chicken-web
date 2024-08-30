import { useEffect, useState } from "react";
import * as handleCategoryService from "../../../../../../services/handleCategoryService";

const SelectCategory = ({ onChange, categoryID }) => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    handleCategoryService.getAllCategory().then((res) => setCategory(res.data));
  }, []);

  return (
    <select
      value={categoryID}
      onChange={(e) => onChange(e)}
      className="outline-none cursor-pointer"
    >
      <option value="">---Chọn danh mục---</option>
      {category ? (
        category.map((item, index) => {
          return (
            <option key={index} value={item._id}>
              {item.nameCategory}
            </option>
          );
        })
      ) : (
        <option value="">---Vui lòng tạo danh mục trước---</option>
      )}
    </select>
  );
};

export default SelectCategory;
