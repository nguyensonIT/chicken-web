import { jwtDecode } from "jwt-decode";
import moment from "moment";

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

// function add cart
export const handleAddCartWithQuantityFnc = (data, quantity, note) => {
  const cartData = JSON.parse(localStorage.getItem("productsInCart")) || [];

  // Tìm chỉ số của sản phẩm trong giỏ hàng
  const productIndex = cartData.findIndex(
    (item) => item.idProduct === data.idProduct
  );

  if (productIndex !== -1) {
    // Sản phẩm đã tồn tại trong giỏ hàng, cập nhật số lượng
    cartData[productIndex].quantity += quantity;
    cartData[productIndex].note = note;
    cartData[productIndex].currentPriceProduct =
      cartData[productIndex].quantity * cartData[productIndex].priceProduct;
  } else {
    // Sản phẩm chưa tồn tại, thêm sản phẩm mới vào giỏ hàng
    const newProduct = {
      idProduct: data.idProduct,
      nameProduct: data.nameProduct,
      note: note,
      imgProduct: data.imgProduct,
      priceProduct: data.priceProduct,
      currentPriceProduct: data.priceProduct * quantity,
      sale: data.sale,
      quantity: quantity,
    };
    cartData.push(newProduct);
  }

  // Lưu giỏ hàng đã cập nhật vào localStorage
  localStorage.setItem("productsInCart", JSON.stringify(cartData));
};

// function add cart
export const handleAddCartFnc = (data) => {
  const cartData = JSON.parse(localStorage.getItem("productsInCart")) || [];

  // Tìm chỉ số của sản phẩm trong giỏ hàng
  const productIndex = cartData.findIndex(
    (item) => item.idProduct === data.idProduct
  );

  if (productIndex !== -1) {
    // Sản phẩm đã tồn tại trong giỏ hàng, cập nhật số lượng
    cartData[productIndex].quantity += 1;
    cartData[productIndex].currentPriceProduct =
      cartData[productIndex].quantity * cartData[productIndex].priceProduct;
  } else {
    // Sản phẩm chưa tồn tại, thêm sản phẩm mới vào giỏ hàng
    const newProduct = {
      idProduct: data.idProduct,
      nameProduct: data.nameProduct,
      note: "",
      imgProduct: data.imgProduct,
      priceProduct: data.priceProduct,
      currentPriceProduct: data.priceProduct,
      sale: data.sale,
      quantity: 1,
    };
    cartData.push(newProduct);
  }
  // Lưu giỏ hàng đã cập nhật vào localStorage
  localStorage.setItem("productsInCart", JSON.stringify(cartData));
};

//fcn Decrease cart
export const handleDecreaseCartFnc = (data) => {
  // Lấy dữ liệu giỏ hàng hiện tại từ localStorage
  let cartData = JSON.parse(localStorage.getItem("productsInCart")) || [];

  // Tìm chỉ số của sản phẩm trong giỏ hàng
  const productIndex = cartData.findIndex(
    (item) => item.idProduct === data.idProduct
  );

  if (productIndex !== -1) {
    // Sản phẩm tồn tại trong giỏ hàng
    if (cartData[productIndex].quantity > 1) {
      // Nếu số lượng sản phẩm lớn hơn 1, giảm số lượng
      cartData[productIndex].quantity -= 1;
      cartData[productIndex].currentPriceProduct =
        cartData[productIndex].quantity * cartData[productIndex].priceProduct;
    }

    // Lưu giỏ hàng đã cập nhật vào localStorage
    localStorage.setItem("productsInCart", JSON.stringify(cartData));
  }
};

//fnc Remove cart
export const handleRemoveProduct = (productId) => {
  // Lấy dữ liệu giỏ hàng hiện tại từ localStorage
  let cartData = JSON.parse(localStorage.getItem("productsInCart")) || [];

  // Tìm chỉ số của sản phẩm trong giỏ hàng
  const productIndex = cartData.findIndex(
    (item) => item.idProduct === productId
  );

  if (productIndex !== -1) {
    // Xóa sản phẩm khỏi giỏ hàng
    cartData.splice(productIndex, 1);

    // Lưu giỏ hàng đã cập nhật vào localStorage
    localStorage.setItem("productsInCart", JSON.stringify(cartData));
  }
};

//fnc đếm thời gian đăng bài, comment
export const timeAgo = (createdAt) => {
  const now = moment();
  const created = moment(createdAt);
  const duration = moment.duration(now.diff(created));

  const hours = duration.hours();
  const days = duration.days();
  const minutes = duration.minutes();

  if (days > 0) {
    return `${days} ngày trước`;
  } else if (hours > 0) {
    return `${hours} tiếng trước`;
  } else if (minutes > 0) {
    return `${minutes} phút trước`;
  } else {
    return "Vừa mới xong";
  }
};
