import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

export const usefullinks = [
  {
    href: "/",
    text: "Trang chủ",
  },
  {
    href: "/news",
    text: "Tin tức",
  },
  {
    href: "/products?category=alls",
    text: "Sản phẩm",
  },
  {
    href: "/introduce",
    text: "Giới thiệu",
  },
];
export const contact = [
  {
    icon: (
      <FontAwesomeIcon
        icon={faPhone}
        className="mr-[8px] text-[#8C8C8C] text-[12px]"
      />
    ),
    href: "tel:0398337879",
    text: "Di động: 0398.33.7879",
  },
  {
    icon: (
      <FontAwesomeIcon
        icon={faEnvelope}
        className="mr-[8px] text-[#8C8C8C] text-[12px]"
      />
    ),
    href: "mailto:vuagatuoi106nguyenkhiemich@gmail.com",
    text: "vuagatuoi106nguyenkhiemich@gmail.com",
  },
  {
    icon: (
      <FontAwesomeIcon
        icon={faLocationDot}
        className="mr-[8px] text-[#8C8C8C] text-[12px]"
      />
    ),
    href: "#",
    text: "106 Nguyễn Khiêm Ích, Gia Lâm",
  },
];
export const social = [
  {
    icon: <FontAwesomeIcon icon={faFacebookF} />,
    href: "#",
  },
  {
    icon: <FontAwesomeIcon icon={faTwitter} />,
    href: "#",
  },
  {
    icon: <FontAwesomeIcon icon={faInstagram} />,
    href: "#",
  },
];
