import { FaceBookIcon, GoogleIcon, TwisterIcon, UserIcon } from "../Icon";

import { loginGoogle } from "../Login/component/LoginWithGoogle";
import LoginWithEmail from "../Login/component/LoginWithEmail";
import SignupWithEmail from "../SignUp/component/SignupWithEmail";

export const dataForm = [
  {
    footer_des: "Bạn không có tài khoản?",
    footer_link: "Đăng ký",
    title: "Đăng nhập",
    data: [
      {
        icon: <UserIcon />,
        name: "Số điện thoại / Tên người dùng / email",
        detail: {
          footer_des: "Bạn không có tài khoản?",
          footer_link: "Đăng ký",
          title: "Đăng nhập",
          data: <LoginWithEmail />,
        },
      },
      {
        icon: <GoogleIcon />,
        name: "Tiếp tục với Google",
        disable: false,
        handle: loginGoogle,
      },
      {
        icon: <FaceBookIcon />,
        name: "Tiếp tục với Facebook",
        disable: true,
      },
      {
        icon: <TwisterIcon />,
        name: "Tiếp tục với Twitter",
        disable: true,
      },
    ],
  },
  {
    footer_des: "Bạn đã có tài khoản?",
    footer_link: "Đăng nhập",
    title: "Đăng ký tài khoản",
    data: [
      {
        icon: <UserIcon />,
        name: "Số điện thoại hoặc email",
        detail: {
          footer_des: "Bạn đã có tài khoản?",
          footer_link: "Đăng nhập",
          title: "Đăng ký",
          data: <SignupWithEmail />,
        },
      },
      {
        icon: <GoogleIcon />,
        name: "Tiếp tục với Google",
        disable: false,
        handle: loginGoogle,
      },
      {
        icon: <FaceBookIcon />,
        name: "Tiếp tục với Facebook",
        disable: true,
      },
    ],

    isSignUp: true,
  },
];
