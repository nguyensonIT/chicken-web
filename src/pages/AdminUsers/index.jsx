import { useEffect, useRef, useState } from "react";
import ItemUserRow from "./components/ItemUserRow";
import * as handleUsersAdmin from "../../services/handleUsersAdmin";
import DialogQuestionYesNo from "../../components/DialogQuestionYesNo";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [idUser, setIdUser] = useState({});
  const [renderApi, setRenderApi] = useState("");

  const isEmpty = (obj) => Object.keys(obj).length > 0;

  const [isDialog, setIsDialog] = useState(isEmpty(idUser));
  const [isLoading, setIsLoading] = useState(false);

  const refDialog = useRef();

  const handleOffDialog = () => {
    setIsDialog(false);
  };

  const handleDeleteUserApi = () => {
    setIsLoading(true);
    handleUsersAdmin
      .deleteUser(idUser.id)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Xóa thành công!");
          setRenderApi(res.data.data._id);
        } else if (res.response.status === 400) {
          toast.warn(res.response.data.message);
        } else {
          toast.warn("Lỗi gì đó");
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
        setIsDialog(false);
      });
  };

  useEffect(() => {
    handleUsersAdmin.getAllUsers().then((res) => {
      if (res.status === 200) {
        setUsers(res.data.data);
      } else {
        setUsers([]);
      }
    });
  }, [renderApi]);

  useEffect(() => {
    setIsDialog(isEmpty(idUser));
  }, [idUser]);

  useEffect(() => {
    isDialog && refDialog.current.classList.add("isDetail");
  }, [isDialog]);

  return (
    <div className="max-w-full">
      <h1 className="text-[32px] font-bold text-center">Khách hàng</h1>
      <div className="px-[10px] py-[20px] shadow-md sm:rounded-lg overflow-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Ảnh</th>
              <th className="px-6 py-3">Tên</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Địa chỉ</th>
              <th className="px-6 py-3">Số điện thoại</th>
              <th className="px-6 py-3">Số lượng đơn hàng trong tháng</th>
              <th className="px-6 py-3">Tham gia</th>
              <th className="px-6 py-3">Hoạt động</th>
              <th className="px-6 py-3">Xóa</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && (
              <tr className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                <td></td>
                <td>
                  <FontAwesomeIcon icon={faSpinner} className="loading" />
                </td>
              </tr>
            )}
            {users.length > 0 &&
              users.map((item, index) => {
                return (
                  <ItemUserRow data={item} key={index} setIdUser={setIdUser} />
                );
              })}
          </tbody>
        </table>
      </div>
      {/* Dialog  */}
      {isDialog && (
        <DialogQuestionYesNo
          refDialog={refDialog}
          title={`
                Email: ${idUser.email}, Name: ${idUser.name}, Bạn có chắc muốn xóa người dùng này?
                `}
          textNo={"Nghĩ lại"}
          textYes={"Vâng"}
          handleYes={handleDeleteUserApi}
          handleNo={handleOffDialog}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default AdminUsers;
