export function FormatCurrency(amount) {
    // Chuyển đổi số thành chuỗi và đảm bảo là chuỗi
    let strAmount = String(amount);
    
    // Tạo biểu thức chính quy để chia dấu phẩy ngăn cách hàng nghìn
    let regex = /\B(?=(\d{3})+(?!\d))/g;
    
    // Thêm dấu phẩy ngăn cách hàng nghìn và thêm ký tự 'đ' vào cuối
    let formattedAmount = strAmount.replace(regex, ".") + "đ";
    
    return formattedAmount;
}