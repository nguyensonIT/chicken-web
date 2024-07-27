const TableCreateCategory = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-[300px] py-[10px] border border-borderColor rounded-md">
        <input
          className="w-full px-[5px] outline-none"
          placeholder="VD: Các món gà..."
          type="input"
        />
      </div>
      <div className="w-[200px] mt-[10px]">
        <button className="w-full text-white uppercase font-bold px-[20px] py-[8px] rounded-md bg-btnColor hover:bg-btnHoverColor transition-all">
          Thêm
        </button>
      </div>
    </div>
  );
};
export default TableCreateCategory;
