const BtnQuantity = ({ currentValue, setCurrentValue }) => {
  const handleChangeValue = (e) => {
    setCurrentValue(e.target.value);
  };
  const handleIncrease = () => {
    setCurrentValue((prev) => prev + 1);
  };
  const handleDecrease = () => {
    if (currentValue >= 1) {
      setCurrentValue((prev) => prev - 1);
    }
  };
  return (
    <div className="flex items-center border-gray-100">
      <span
        onClick={handleDecrease}
        className="cursor-pointer select-none rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-btnHoverColor hover:text-blue-50"
      >
        {" "}
        -{" "}
      </span>
      <input
        className="h-8 w-8 border bg-white text-center text-xs outline-none"
        type="number"
        value={currentValue}
        onChange={(e) => handleChangeValue(e)}
        min="1"
      />
      <span
        onClick={handleIncrease}
        className="cursor-pointer select-none rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-btnHoverColor hover:text-blue-50"
      >
        {" "}
        +{" "}
      </span>
    </div>
  );
};
export default BtnQuantity;
