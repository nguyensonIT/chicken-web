import { useRef, useState } from "react";

const BtnStatusToggle = ({
  isActiveExternal = false,
  fncHandle = () => {},
}) => {
  const [isActive, setIsActive] = useState(isActiveExternal);
  const boxBallRef = useRef(null);
  const ballRef = useRef(null);

  const handleBtnToggle = (e) => {
    e.stopPropagation();
    setIsActive((prev) => !prev);
    fncHandle();
  };
  console.log(isActive);

  return (
    <div
      className={`relative h-[24px] w-[44px] rounded-[100px] transition-all duration-400 ease-in-out cursor-pointer ${
        isActive ? "bg-[#0be09b]" : "bg-[#1618231f]"
      } `}
      onClick={(e) => handleBtnToggle(e)}
      ref={boxBallRef}
    >
      <span
        ref={ballRef}
        className={`absolute flex justify-center items-center w-[20px] h-[20px] left-[calc(100%-2px)] top-1/2 rounded-[100px] bg-white shadow-sm transition-all duration-400 ease-in-out ${
          isActive
            ? "translate-x-[-100%] translate-y-[-50%]"
            : "translate-x-[-200%] translate-y-[-50%]"
        } `}
      ></span>
    </div>
  );
};
export default BtnStatusToggle;
