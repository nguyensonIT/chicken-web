/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // dùng class để bật/tắt dark mode
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgMainColor: "#EBDFEB",
        bgHeaderColor: "#f8fafc",
        textHoverColor: "#FFD700",
        btnHoverColor: "#ca8a04",
        btnColor: "#FFD700",
        textEmphasizeColor: "#FF0000",
        bgEmphasizeColor: "#FFD700",
        bgThemeColor: "#e2e8f0",
        bgSideBarColor: "#FFFFFF",
        bgDialogColor: "rgba(204, 204, 204, 0.5)",
        borderColor: "#FFD700",
        cartColor: "#FFA500",
        bgHoverColor: "#c0c0c0",

        textDarkColor: "#ffffff",
        textDarkTitleColor: "#FFD700",
        bgDarkHeaderColor: "#2b2b2b",
        bgDarkActiveDoorColor: "#272522",
        bgDarkSideBarColor: "#1a1a1a",
        bgDarkCardProduct: "#44342a",
        bgDarkTitleColor: "#e2712c",
        bgDarkMainColor: "#4a3b31",
        bgDarkFooterColor: "#3b2f27",
        btnDarkColor: "#e2712c",
        borderDarkColor: "#e2712c",

        bgHeaderAdminColor: "#ecf0f1",
        bgSideBarAdminColor: "#2c3e50",
      },
      backgroundImage: {
        coolProfile: "linear-gradient(135deg, #FDE68A, #FBBF24)",
      },
      fontSize: {
        inputSize: "16px",
        sm: "16px",
        smTitle: "18px",
        smDesc: "10px",
        smBtn: "20px",
      },
      height: {
        smInpHeight: "45px",
      },
    },
  },
  plugins: [],
};
