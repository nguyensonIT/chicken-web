import { useState } from "react";

const ArticleAddNew = () => {
  const [title, setTitle] = useState("");

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  return (
    <div className="px-[30px] py-[40px]">
      <form action="">
        <div className="flex items-center gap-[20px]">
          <label htmlFor="">Tiêu đề</label>
          <div className="w-[300px] py-[10px] border border-borderColor rounded-md">
            <textarea
              className="w-full px-[5px] outline-none placeholder:text-[12px]"
              placeholder="VD: Thông báo nghỉ lễ, Hôm nay có món mới..."
              onChange={handleChangeTitle}
              value={title}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ArticleAddNew;
