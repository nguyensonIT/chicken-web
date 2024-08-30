import PopupWrapper from "../PopupWrapper";
const DialogQuestionYesNo = ({
  refDialog,
  title,
  textNo,
  textYes,
  handleYes,
  handleNo,
}) => {
  return (
    <PopupWrapper>
      <div ref={refDialog} className="relative w-[400px] my-[40px] mx-auto">
        <div className=" pt-[60px] pb-[20px] px-[20px] bg-white shadow-lg rounded-lg overflow-hidden">
          <p className=" mb-[50px] text-[28px]">{title}</p>
          <div className="flex justify-end">
            <button
              onClick={handleNo}
              className="mr-[15px] text-white uppercase font-bold px-[20px] py-[8px] rounded-md bg-btnColor hover:bg-btnHoverColor cursor-pointer transition-all"
            >
              {textNo}
            </button>
            <button
              onClick={handleYes}
              className=" text-white uppercase font-bold px-[20px] py-[8px] rounded-md bg-[red] hover:bg-red-400 cursor-pointer transition-all"
            >
              {textYes}
            </button>
          </div>
        </div>
      </div>
    </PopupWrapper>
  );
};
export default DialogQuestionYesNo;
