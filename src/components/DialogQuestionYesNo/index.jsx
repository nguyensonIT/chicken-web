import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PopupWrapper from "../PopupWrapper";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
const DialogQuestionYesNo = ({
  refDialog,
  title,
  textNo,
  textYes,
  handleYes,
  handleNo,
  isLoading = false,
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
              className={`${
                isLoading ? "bg-red-400 pointer-events-none" : ""
              } text-white uppercase font-bold px-[20px] py-[8px] rounded-md bg-[red] hover:bg-red-400 cursor-pointer transition-all`}
            >
              {isLoading ? (
                <FontAwesomeIcon className="loading" icon={faSpinner} />
              ) : (
                textYes
              )}
            </button>
          </div>
        </div>
      </div>
    </PopupWrapper>
  );
};
export default DialogQuestionYesNo;
