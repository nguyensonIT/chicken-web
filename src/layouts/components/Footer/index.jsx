import { usefullinks, contact, social } from "../Footer/components/DataLink";
import BtnSocial from "./components/BtnSocial";
import LiLink from "./components/LiLink";
import logo from "../../../assets/img/Logo.png";

const Footer = () => {
  return (
    <footer className="relative w-full bg-bgThemeColor pt-8 pb-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap text-left lg:text-left">
          <div className="w-full flex justify-center items-center flex-col lg:w-4/12 px-4">
            <div className="w-[100px] h-[100px]">
              <img className="rounded-md" src={logo} alt="logo" />
            </div>
            <div className="mt-6 lg:mb-0 mb-6">
              {social.map((item, index) => {
                return <BtnSocial key={index} icon={item.icon} />;
              })}
            </div>
          </div>
          <div className="w-full lg:w-8/12 px-4">
            <div className="flex flex-wrap items-top mb-6">
              <div className="w-full lg:w-6/12 px-4 ml-auto">
                <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                  Liên kết
                </span>
                <ul className="list-unstyled">
                  {usefullinks.map((item, index) => {
                    return (
                      <LiLink key={index} href={item.href} text={item.text} />
                    );
                  })}
                </ul>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                  Liên hệ
                </span>
                <ul className="list-unstyled">
                  {contact.map((item, index) => {
                    return (
                      <LiLink
                        key={index}
                        icon={item.icon}
                        href={item.href}
                        text={item.text}
                      />
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-[#cbd5e1]" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm text-blueGray-500 font-semibold py-1">
              Copyright © <span id="get-current-year">2024 </span>
              <span className="text-textEmphasizeColor font-bold">
                Nguyễn Sơn
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
