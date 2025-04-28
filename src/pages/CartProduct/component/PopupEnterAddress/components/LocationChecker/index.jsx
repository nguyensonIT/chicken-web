import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";
import { useHandleContext } from "../../../../../../contexts/UserProvider";

const LocationChecker = ({ onCheckArea = () => {}, errText }) => {
  const { dataLocationsContext } = useHandleContext();

  const [selectedArea, setSelectedArea] = useState("");
  const [isValid, setIsValid] = useState(null); // null: chưa chọn, true/false: đã chọn

  const handleSelectArea = (e) => {
    const area = e.target.value;
    setSelectedArea(area);

    if (area === "Khác") {
      setIsValid(false);
      onCheckArea(area, false);
      return;
    }

    const valid = dataLocationsContext.includes(area);
    setIsValid(valid);
    onCheckArea(area, valid);
  };

  return (
    <div className="w-full mt-[10px] px-4 py-[8px] border border-borderColor dark:border-borderDarkColor rounded">
      {errText && (
        <p className="text-textEmphasizeColor italic text-smDesc">*{errText}</p>
      )}
      <div className="flex items-center gap-2 mb-[8px]">
        <FontAwesomeIcon
          icon={faMapPin}
          className="text-xl text-red-600 dark:text-bgDarkTitleColor"
        />
        <span className="text-[16px] font-medium">Chọn khu vực giao hàng</span>
      </div>

      <select
        value={selectedArea}
        onChange={handleSelectArea}
        className="w-full px-3 py-2 rounded border border-borderColor dark:border-borderDarkColor text-[14px] bg-white dark:bg-bgDarkMainColor dark:bg-darkColor"
      >
        <option value="">-- Chọn khu vực --</option>
        {dataLocationsContext.map((area) => (
          <option key={area} value={area}>
            {area}
          </option>
        ))}
        <option value="Khác">Khác</option>
      </select>

      {isValid !== null && (
        <p
          className={`mt-3 text-smDesc font-medium ${
            isValid ? "text-green-600" : "text-red-600"
          }`}
        >
          {isValid
            ? `✅ Khu vực ${selectedArea} được hỗ trợ giao hàng.`
            : selectedArea === "Khác"
            ? "❌ Khu vực của bạn không nằm trong phạm vi giao hàng."
            : `❌ Khu vực ${selectedArea} không hỗ trợ giao hàng.`}
        </p>
      )}
    </div>
  );
};

export default LocationChecker;
