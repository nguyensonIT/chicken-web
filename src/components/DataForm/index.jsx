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
        name: "Đăng nhập với Email",
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
        disable: true,
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
        name: "Đăng ký với Email",
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
        disable: true,
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
