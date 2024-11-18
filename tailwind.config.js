/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "bgMainColor": "#EBDFEB",
        "bgHeaderColor": "#f8fafc",
        "textHoverColor": "#FFD700",
        "btnHoverColor": "#ca8a04",
        "btnColor": "#FFD700",
        "textEmphasizeColor": "#FF0000",
        "bgEmphasizeColor": "#FFD700",
        "bgThemeColor": "#e2e8f0",
        "bgSideBarColor": "#FFFFFF",
        "bgDialogColor": "rgba(204, 204, 204, 0.5)",
        "borderColor": "#FFD700",
        "cartColor": "#FFA500",
        "bgHoverColor": "#c0c0c0",

        "bgHeaderAdminColor": "#ecf0f1",
        "bgSideBarAdminColor": "#2c3e50",

      },
      backgroundImage: {
        'coolProfile': 'linear-gradient(135deg, #FDE68A, #FBBF24)',
      },
      
      
    },
  },
  plugins: [],
}