import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapPin,
  faLocationCrosshairs,
} from "@fortawesome/free-solid-svg-icons";

const QUAN_LAT = 21.006047;
const QUAN_LNG = 105.936548;

const LocationChecker = ({
  distance = 0,
  isValidDistance = false,
  onCheckDistance = () => {},
  errDistance = "",
}) => {
  const [loading, setLoading] = useState(false);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Trình duyệt của bạn không hỗ trợ định vị.");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const d = calculateDistance(latitude, longitude, QUAN_LAT, QUAN_LNG);
        onCheckDistance(parseFloat(d.toFixed(2)));
        setLoading(false);
      },
      () => {
        alert("Không thể lấy vị trí. Hãy bật định vị.");
        setLoading(false);
      }
    );
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (v) => (v * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
  };

  return (
    <div className="w-full mt-[10px] px-4 py-[4px] border border-borderColor dark:border-borderDarkColor">
      {errDistance && (
        <span className="text-[12px] text-textEmphasizeColor">
          *{errDistance}
        </span>
      )}
      <div className="flex items-center gap-2 mb-2">
        <FontAwesomeIcon icon={faMapPin} className="text-xl text-red-600" />
        <span className="text-[16px] font-medium">
          Kiểm tra vị trí giao hàng
        </span>
      </div>

      <p className="text-[10px] italic mb-[4px]">
        Bán kính giao hàng tối đa: <strong>5km ( &lt; 5km )</strong> từ quán
        (Trâu Quỳ)
      </p>

      <button
        className="w-full py-[4px] rounded text-white text-[14px] bg-btnColor dark:bg-btnDarkColor border-borderColor dark:border-borderDarkColor font-semibold flex justify-center items-center gap-2 transition"
        onClick={handleGetLocation}
        onMouseOver={(e) =>
          e.currentTarget.classList.add("hover:bg-btnHoverColor")
        }
        onMouseOut={(e) =>
          e.currentTarget.classList.remove("hover:bg-btnColor")
        }
      >
        <FontAwesomeIcon icon={faLocationCrosshairs} />
        {loading ? "Đang xác định vị trí..." : "Kiểm tra vị trí hiện tại"}
      </button>

      {distance !== null && (
        <p
          className={`mt-3 text-smDesc font-medium ${
            isValidDistance ? "text-green-600" : "text-red-600"
          }`}
        >
          📍 Khoảng cách đến quán: <strong>{distance} km</strong> –{" "}
          {isValidDistance
            ? "Trong phạm vi giao hàng"
            : "Ngoài phạm vi giao hàng"}
        </p>
      )}
    </div>
  );
};

export default LocationChecker;
