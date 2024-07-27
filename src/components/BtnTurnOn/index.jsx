import { useRef, useState } from "react";

const BtnTurnOn = ({ data }) => {
  const [isActive, setIsActive] = useState(data.isActive);
  const boxBallRef = useRef(null);
  const ballRef = useRef(null);

  const handleDarkMode = (e) => {
    e.stopPropagation();
    if (!isActive) {
      boxBallRef.current.style.backgroundColor = "#0be09b";
      ballRef.current.style.transform = "translate(-100%, -50%)";
      setIsActive(!isActive);
    } else {
      boxBallRef.current.style.backgroundColor = "#1618231f";
      ballRef.current.style.transform = "translate(-200%, -50%)";
      setIsActive(!isActive);
    }
  };
  return (
    <div
      className={`relative left-[45px] h-[24px] w-[44px] rounded-[100px] transition-all duration-400 ease-in-out cursor-pointer ${
        data.isActive ? "bg-[#0be09b]" : "bg-[#1618231f]"
      } `}
      onClick={(e) => handleDarkMode(e)}
      ref={boxBallRef}
    >
      <span
        ref={ballRef}
        className={`absolute flex justify-center items-center w-[20px] h-[20px] left-[calc(100%-2px)] top-1/2 rounded-[100px] bg-white shadow-sm transition-all duration-400 ease-in-out ${
          data.isActive
            ? "translate-x-[-100%] translate-y-[-50%]"
            : "translate-x-[-200%] translate-y-[-50%]"
        } `}
      ></span>
    </div>
  );
};
export default BtnTurnOn;
