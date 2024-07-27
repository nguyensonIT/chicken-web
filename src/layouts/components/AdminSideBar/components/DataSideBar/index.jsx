import {
  faGauge,
  faMehBlank,
  faTable,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const dataSideBarAdmin = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: <FontAwesomeIcon icon={faGauge} />,
  },
  {
    name: "Table",
    href: "/admin/table",
    icon: <FontAwesomeIcon icon={faTable} />,
  },
  {
    name: "Blank",
    href: "/admin/blank",
    icon: <FontAwesomeIcon icon={faMehBlank} />,
  },
];
