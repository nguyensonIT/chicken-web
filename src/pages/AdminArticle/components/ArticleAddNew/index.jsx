import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import Toolbar from "./components/Toolbar";
import "./styles.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { showFileImg } from "../../../../components/Function";
import { toast } from "react-toastify";
import { useHandleContext } from "../../../../contexts/UserProvider";
import * as handlePostService from "../../../../services/handlePostService";

const ArticleAddNew = () => {
  const { user } = useHandleContext();

  const [arrImage, setArrIamge] = useState([]);

  const editor = useEditor({
    extensions: [StarterKit], // Cấu hình với StarterKit
    content: "", // Nội dung ban đầu
  });

  const handleSubmit = () => {
    if (!editor) return; // Kiểm tra editor đã được khởi tạo
    const content = JSON.stringify(editor.getHTML()); // Lấy nội dung dưới dạng HTML
    const plainText = editor.getText();
    // Kiểm tra rỗng
    if (!plainText.trim()) {
      toast.warn("Nội dung bị trống!");
      return;
    }
    const dataPosts = {
      content,
      images: arrImage,
      userId: user.id,
    };
    handlePostService
      .createPost(dataPosts)
      .then((res) => console.log(res))
      .catch((err) => console.log("Lỗi API tạo bài viết", err));
  };

  // handle input imageCmt, image
  const handleOnChangeImage = (e) => {
    const file = e.target.files[0];

    showFileImg(file, (err, fileUrl) => {
      if (fileUrl) {
        setArrIamge((prev) => [...prev, fileUrl]);
      } else {
        setArrIamge("");
        toast.error(err);
      }
    });
  };

  const deleteDataImgCmt = (img) => {
    setArrIamge((prev) => prev.filter((item) => item !== img));
  };

  return (
    <div>
      <div className="max-sm:left-[20px] fixed top-[220px] z-10 left-[200px] right-[20px] ">
        <Toolbar handleOnChangeImage={handleOnChangeImage} editor={editor} />
      </div>
      {arrImage.length > 0 && (
        <div className="mt-[65px] w-full overflow-x-auto bg-gray-100">
          <div className="flex items-center gap-[10px] p-2 border-b border-gray-300">
            {arrImage.map((img, index) => {
              return (
                <div key={index} className="relative size-[40px]">
                  <img
                    className="w-full border object-cover"
                    src={img}
                    alt={`img${index}`}
                  />
                  <span
                    onClick={() => deleteDataImgCmt(img)}
                    className="absolute rounded-[50%] top-[-10px] right-[-10px] hover:text-gray-700 cursor-pointer"
                  >
                    {" "}
                    <FontAwesomeIcon icon={faXmark} />
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <EditorContent
        className={`${
          arrImage.length > 0 ? "mt-[30px]" : "mt-[80px]"
        } min-h-[200px] px-[10px] custom-editor`}
        editor={editor}
      />
      <div className="w-full text-end p-[20px]">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-btnColor hover:bg-btnHoverColor text-white rounded"
        >
          Đăng
        </button>
      </div>
    </div>
  );
};

export default ArticleAddNew;
