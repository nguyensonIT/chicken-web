import { useEffect, useRef, useState } from "react";
import PopupWrapper from "../../../../components/PopupWrapper";
import PopupCheckInfoOrder from "../PopupCheckInfoOrder";
import { useHandleContext } from "../../../../contexts/UserProvider";

const PopupEnterAddress = ({
  handleCheckOrder,
  priceSaleProduct,
  subTotal,
}) => {
  const { user } = useHandleContext();

  const refDialog = useRef(null);

  const [isFocusName, setIsFocusName] = useState(false);
  const [isFocusPhone, setIsFocusPhone] = useState(false);
  const [isFocusAddress, setIsFocusAddress] = useState(false);
  const [isPopupCheckInfoOrder, setIsPopupCheckInfoOrder] = useState(false);
  const [isFocusNote, setIsFocusNote] = useState(false);

  const [dataUserOrder, setDataUserOrder] = useState({});

  const [name, setName] = useState(user ? user?.name : "");
  const [phone, setPhone] = useState(user ? user?.phoneNumber : "");
  const [address, setAddress] = useState(user ? user?.address : "");
  const [note, setNote] = useState("");

  const [errName, setErrName] = useState("");
  const [errPhone, setErrPhone] = useState("");
  const [errAddress, setErrAddress] = useState("");

  const phoneRegex = /^(086|096|097|098|032|033|034|035|036|037|038|039)\d{7}$/;

  const validateInputs = () => {
    let isValid = true;

    // Validate Name
    if (!name.trim()) {
      setErrName("Bắt buộc");
      isValid = false;
    } else {
      setErrName("");
    }

    // Validate Phone
    if (!phone.trim()) {
      setErrPhone("Bắt buộc");
      isValid = false;
    } else if (!phoneRegex.test(phone)) {
      setErrPhone("Số điện thoại sai");
      isValid = false;
    } else {
      setErrPhone("");
    }

    // Validate Address
    if (!address.trim()) {
      setErrAddress("Nhập địa chỉ nhận hàng");
      isValid = false;
    } else {
      setErrAddress("");
    }

    return isValid;
  };

  const handleCheckInfoOder = () => {
    const data = {
      note,
      nameCustomers: name,
      phoneCustomers: phone,
      addressCustomers: address,
      totalBill: 0,
      priceSaleProduct,
      subTotal,
    };
    if (validateInputs()) {
      setIsPopupCheckInfoOrder(!isPopupCheckInfoOrder);
      setDataUserOrder(data);
    }
  };

  const handleCloseCheckInfoOrder = () => {
    if (isPopupCheckInfoOrder) {
      refDialog.current.classList.add("isClose");
      setTimeout(() => {
        setIsPopupCheckInfoOrder(false);
      }, 300);
    } else {
      setIsPopupCheckInfoOrder(true);
    }
  };

  //Input name
  const handleFocusName = () => {
    setIsFocusName(true);
  };

  const handleBlurName = () => {
    if (name === "") {
      setIsFocusName(false);
    }
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  //Input Phone
  const handleFocusPhone = () => {
    setIsFocusPhone(true);
  };

  const handleBlurPhone = () => {
    if (phone === "") {
      setIsFocusPhone(false);
    }
  };

  const hanldeChangePhone = (e) => {
    setPhone(e.target.value);
  };

  //Input Address
  const handleFocusAddress = () => {
    setIsFocusAddress(true);
  };

  const handleBlurAddress = () => {
    if (address === "") {
      setIsFocusAddress(false);
    }
  };

  const hanldeChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  //Input Note
  const hanldeChangeNote = (e) => {
    setNote(e.target.value);
  };

  const handleBlurNote = () => {
    if (note === "") {
      setIsFocusNote(false);
    }
  };

  const handleFocusNote = () => {
    setIsFocusNote(true);
  };

  useEffect(() => {
    if (name !== "" && phone !== "" && address !== "") {
      setIsFocusAddress(true);
      setIsFocusName(true);
      setIsFocusPhone(true);
    }
  }, [name, phone, address]);

  useEffect(() => {
    isPopupCheckInfoOrder && refDialog.current.classList.add("isDetail");
  }, [isPopupCheckInfoOrder]);

  return (
    <div className="flex flex-col items-center justify-center pt-[60px] pb-[20px] px-[20px] bg-white shadow-lg rounded-lg overflow-hidden">
      <h1 className="text-[20px] uppercase font-bold">Nhập địa chỉ</h1>
      <h1 className="text-[12px] opacity-[0.6]">
        Để đặt hàng, vui lòng thêm địa chỉ nhận hàng
      </h1>

      <div className="max-sm:w-full max-sm:items-start flex flex-col items-center justify-center">
        <div className="max-sm:flex-col max-sm:w-full max-sm:mt-0 max-sm:gap-[0px] mt-[20px] flex gap-4">
          <div className="max-sm:h-smInpHeight inp-login relative h-[35px] mt-[9px] bg-transparent border-[1px] border-solid border-borderColor">
            <input
              onChange={handleChangeName}
              value={name}
              onBlur={handleBlurName}
              onFocus={handleFocusName}
              id="name"
              className="max-sm:text-inputSize h-[100%] w-[100%] text-[12px] placeholder:italic pl-[12px] border-none outline-none bg-transparent"
            />
            {!errName && (
              <label
                className={`absolute cursor-text text-[12px] italic left-[12px] bg-[#ffff] transition-all ${
                  isFocusName
                    ? "top-[-10px] opacity-[1]"
                    : "top-[8px] opacity-[0.3]"
                }`}
                htmlFor="name"
              >
                Họ và Tên
              </label>
            )}
            {errName && (
              <label
                className={`absolute cursor-text text-[12px] text-[red] italic left-[12px] bg-[#ffff] transition-all ${
                  isFocusName ? "top-[-10px] opacity-[1]" : "top-[8px] "
                }`}
                htmlFor="name"
              >
                {`*${errName}`}
              </label>
            )}
          </div>
          <div className="max-sm:h-smInpHeight inp-login relative h-[35px] mt-[9px] bg-transparent border-[1px] border-solid border-borderColor">
            <input
              onChange={hanldeChangePhone}
              value={phone}
              onBlur={handleBlurPhone}
              onFocus={handleFocusPhone}
              id="phone"
              className="max-sm:text-inputSize h-[100%] w-[100%] text-[12px] placeholder:italic pl-[12px] border-none outline-none bg-transparent"
            />
            {!errPhone && (
              <label
                className={`absolute cursor-text text-[12px] italic left-[12px] bg-[#ffff] transition-all ${
                  isFocusPhone
                    ? "top-[-10px] opacity-[1]"
                    : "top-[8px] opacity-[0.3]"
                }`}
                htmlFor="phone"
              >
                Số điện thoại
              </label>
            )}
            {errPhone && (
              <label
                className={`absolute cursor-text text-[12px] text-[red] italic left-[12px] bg-[#ffff] transition-all ${
                  isFocusPhone ? "top-[-10px] opacity-[1]" : "top-[8px] "
                }`}
                htmlFor="phone"
              >
                {`*${errPhone}`}
              </label>
            )}
          </div>
        </div>
        <div className=" max-sm:w-full inp-login w-[70%] relative mt-[9px] bg-transparent border-[1px] border-solid border-borderColor">
          <textarea
            onChange={hanldeChangeAddress}
            value={address}
            onBlur={handleBlurAddress}
            onFocus={handleFocusAddress}
            id="address"
            className="max-sm:text-inputSize h-[100%] w-[100%] pt-[5px] text-[12px] placeholder:italic pl-[12px] border-none outline-none bg-transparent"
          />
          {!errAddress && (
            <label
              className={`absolute cursor-text text-[12px] italic left-[12px] bg-[#ffff] transition-all ${
                isFocusAddress
                  ? "top-[-10px] opacity-[1]"
                  : "top-[8px] opacity-[0.3]"
              }`}
              htmlFor="address"
            >
              Địa chỉ cụ thể
            </label>
          )}
          {errAddress && (
            <label
              className={`absolute cursor-text text-[12px] text-[red] italic left-[12px] bg-[#ffff] transition-all ${
                isFocusAddress ? "top-[-10px] opacity-[1]" : "top-[8px] "
              }`}
              htmlFor="address"
            >
              {`*${errAddress}`}
            </label>
          )}
        </div>
        {/* Ghi chú  */}
        <div className=" max-sm:w-full inp-login w-[70%] relative mt-[9px] bg-transparent border-[1px] border-solid border-borderColor">
          <label
            className={`absolute cursor-text text-[12px] italic left-[12px] bg-[#ffff] transition-all ${
              isFocusNote
                ? "top-[-10px] opacity-[1]"
                : "top-[8px] opacity-[0.3]"
            }`}
            htmlFor="note"
          >
            Ghi chú
          </label>
          <textarea
            onChange={hanldeChangeNote}
            onBlur={handleBlurNote}
            onFocus={handleFocusNote}
            value={note}
            id="note"
            className="max-sm:text-inputSize h-[100%] w-[100%] pt-[5px] text-[12px] placeholder:italic pl-[12px] border-none outline-none bg-transparent"
          />
        </div>
      </div>

      {/* button  */}
      <div className="w-full mt-[20px] text-right">
        <span
          onClick={handleCheckOrder}
          className="text-white uppercase font-bold px-[20px] py-[8px] rounded-md bg-[red] hover:bg-red-400 cursor-pointer transition-all"
        >
          Trở lại
        </span>
        <span
          onClick={handleCheckInfoOder}
          className="ml-[15px] text-white uppercase font-bold px-[20px] py-[8px] rounded-md bg-btnColor hover:bg-btnHoverColor cursor-pointer transition-all"
        >
          Xem lại
        </span>
      </div>
      {isPopupCheckInfoOrder && (
        <PopupWrapper>
          <div
            ref={refDialog}
            className="max-sm:mx-auto max-sm:my-[50px] relative my-[20px] mx-[40px]"
          >
            <PopupCheckInfoOrder
              handleCheckOrder={handleCheckOrder}
              handleCloseCheckInfoOrder={handleCloseCheckInfoOrder}
              dataUserOrder={dataUserOrder}
            />
          </div>
        </PopupWrapper>
      )}
    </div>
  );
};
export default PopupEnterAddress;
