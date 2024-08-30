import { jwtDecode } from "jwt-decode";

export const showFileImg = (file, callback) => {
  let fileType = file.type;
  let validExtensions = ["image/jpeg", "image/jpg", "image/png"];

  if (validExtensions.includes(fileType)) {
    let fileReader = new FileReader();
    fileReader.onload = () => {
      let fileUrl = fileReader.result;
      callback(null, fileUrl); // Gọi callback và trả về fileUrl khi đọc thành công
    };
    fileReader.readAsDataURL(file); // Đọc file dưới dạng Data URL
  } else {
    callback("Đây không phải file ảnh. Vui lòng thử lại!", null); // Trả về lỗi nếu không phải file ảnh
  }
};

export const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    const exp = decoded.exp;
    if (!exp) {
      throw new Error("Token does not have an expiration claim");
    }

    const currentTime = Math.floor(Date.now() / 1000);

    return exp < currentTime;
  } catch (err) {
    console.error("Error decoding token:", err.message);
    return true; // Nếu có lỗi khi giải mã, coi như token không hợp lệ
  }
};
