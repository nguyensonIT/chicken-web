import { handleAddCartFnc, handleDecreaseCartFnc } from "../Function";

const BtnQuantity = ({
  setReloadCart,
  currentValue,
  setCurrentValue,
  data = {},
}) => {
  const isEmptyObject = Object.keys(data).length === 0;

  const handleChangeValue = (e) => {
    setCurrentValue(e.target.value);
  };
  const handleIncrease = () => {
    setCurrentValue((prev) => prev + 1);
    if (!isEmptyObject) {
      handleAddCartFnc(data);
      setReloadCart(data.quantity);
    }
  };
  const handleDecrease = () => {
    if (currentValue >= 1) {
      setCurrentValue((prev) => prev - 1);
    }
    if (!isEmptyObject) {
      handleDecreaseCartFnc(data);
      setReloadCart(data.quantity);
    }
  };

  return (
    <div className="flex items-center border-gray-100">
      <span
        onClick={handleDecrease}
        className="max-sm:text-sm cursor-pointer select-none rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-btnHoverColor hover:text-blue-50"
      >
        {" "}
        -{" "}
      </span>
      <input
        className=" max-sm:text-[10px] h-8 w-8 border bg-white text-center text-xs outline-none pointer-events-none"
        value={currentValue}
        onChange={(e) => handleChangeValue(e)}
      />
      <span
        onClick={handleIncrease}
        className="max-sm:text-sm cursor-pointer select-none rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-btnHoverColor hover:text-blue-50"
      >
        {" "}
        +{" "}
      </span>
    </div>
  );
};
export default BtnQuantity;
