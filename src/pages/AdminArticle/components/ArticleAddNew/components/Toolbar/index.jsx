import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBold,
  faImage,
  faItalic,
  faList,
  faUnderline,
} from "@fortawesome/free-solid-svg-icons";

const Toolbar = ({ editor, handleOnChangeImage }) => {
  if (!editor) return null;

  const insertEmoji = (emoji) => {
    editor.chain().focus().insertContent(emoji).run();
  };

  return (
    <div className="w-full overflow-x-auto bg-gray-100">
      <div className="toolbar flex gap-2 p-2 border-b border-gray-300">
        {/* In đậm */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-4 py-2 rounded text-sm ${
            editor.isActive("bold")
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          <FontAwesomeIcon icon={faBold} />
        </button>

        {/* In nghiêng */}
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-4 py-2 rounded text-sm ${
            editor.isActive("italic")
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          <FontAwesomeIcon icon={faItalic} />
        </button>

        {/* Gạch ngang */}
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`px-4 py-2 rounded text-sm ${
            editor.isActive("strike")
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          <FontAwesomeIcon icon={faUnderline} />
        </button>

        {/* Tiêu đề H1 */}
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`px-4 py-2 rounded text-sm ${
            editor.isActive("heading", { level: 1 })
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          H1
        </button>

        {/* Tiêu đề H2 */}
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`px-4 py-2 rounded text-sm ${
            editor.isActive("heading", { level: 2 })
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          H2
        </button>

        {/* Tiêu đề H3 */}
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={`px-4 py-2 rounded text-sm ${
            editor.isActive("heading", { level: 3 })
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          H3
        </button>

        {/* Danh sách Bullet */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-4 py-2 rounded text-sm ${
            editor.isActive("bulletList")
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          <FontAwesomeIcon icon={faList} />
        </button>

        {/* Hình ảnh  */}
        <button className="rounded text-sm bg-gray-200 hover:bg-gray-300">
          <label className="p-4 w-full h-full cursor-pointer" htmlFor="imgNews">
            <FontAwesomeIcon icon={faImage} />
          </label>
          <input
            className="hidden"
            onChange={handleOnChangeImage}
            type="file"
            id="imgNews"
          />
        </button>

        {/* icon  */}
        <div className="flex space-x-2 bg-gray-100 p-2">
          <button
            onClick={() => insertEmoji("😊")}
            className="p-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            😊
          </button>
          <button
            onClick={() => insertEmoji("😍")}
            className="p-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            😍
          </button>
          <button
            onClick={() => insertEmoji("😂")}
            className="p-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            😂
          </button>
          <button
            onClick={() => insertEmoji("🤤")}
            className="p-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            🤤
          </button>
          <button
            onClick={() => insertEmoji("🍗")}
            className="p-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            🍗
          </button>
          <button
            onClick={() => insertEmoji("🥗")}
            className="p-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            🥗
          </button>
          <button
            onClick={() => insertEmoji("🍺")}
            className="p-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            🍺
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
