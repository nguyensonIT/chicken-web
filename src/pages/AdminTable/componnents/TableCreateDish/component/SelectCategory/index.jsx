import { dataProducts } from "../../../../../../components/FakeDataProducts";

const SelectCategory = ({ onChange, optionCategory }) => {
  return (
    <select
      value={optionCategory}
      onChange={(e) => onChange(e)}
      className="outline-none cursor-pointer"
    >
      <option value="">---Chọn danh mục---</option>
      {dataProducts ? (
        dataProducts.map((item, index) => {
          return (
            <option key={index} value={item?.nameCategory}>
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
