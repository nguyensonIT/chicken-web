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
