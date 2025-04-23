import moment from "moment";
import { useState } from "react";

import logo from "../../../../assets/img/Logo.png";

const ItemUserRow = ({ data = [], setIdUser = () => {} }) => {
  const m = moment(data?.createdAt);
  const createdAt = m.format("DD-MM-YYYY");

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(data._id);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500); // Reset sau 1.5s
  };

  const handleDeleteUser = () => {
    setIdUser({ email: data.email, name: data.name, id: data._id });
  };

  return (
    <>
      <tr className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
        <th
          className="max-sm:px-[5px] max-sm:py-[12px] px-6 py-4"
          onClick={handleCopy}
        >
          <p
            className="max-sm:w-[80px] w-[120px] truncate overflow-hidden whitespace-nowrap"
            title="Click để sao chép"
          >
            {data._id}
          </p>
        </th>

        <td className="max-sm:px-[5px] max-sm:py-[12px] px-6 py-4">
          <span className="block size-[40px]">
            {data.image ? (
              <img
                className=" w-full h-full object-cover"
                src={data.image}
                alt="img"
              />
            ) : (
              <img
                className=" w-full h-full object-cover"
                src={logo}
                alt="img"
              />
            )}
          </span>
        </td>
        <td className="max-sm:px-[5px] max-sm:py-[12px] px-6 py-4">
          {data.name}
        </td>
        <td className="max-sm:px-[5px] max-sm:py-[12px] px-6 py-4 text-right">
          {data.email}
        </td>
        <td className="max-sm:px-[5px] max-sm:py-[12px] px-6 py-4 text-right">
          {data.address}
        </td>
        <td className="max-sm:px-[5px] max-sm:py-[12px] px-6 py-4 text-right">
          {data.phoneNumber}
        </td>
        <td className="max-sm:px-[5px] max-sm:py-[12px] px-6 py-4 text-right">
          {data.orders}
        </td>
        <td className="max-sm:px-[5px] max-sm:py-[12px] px-6 py-4 text-right">
          {createdAt}
        </td>
        <td className="max-sm:px-[5px] max-sm:py-[12px] px-6 py-4 text-right">
          <p className="size-[14px] rounded-[50%] bg-[#16a34a]"></p>
        </td>
        <td className="max-sm:px-[5px] max-sm:py-[12px] px-6 py-4 text-right">
          <span
            className="px-[10px] py-[5px] bg-red-500 text-white rounded-md"
            onClick={handleDeleteUser}
          >
            Xóa
          </span>
        </td>
      </tr>
    </>
  );
};

export default ItemUserRow;
