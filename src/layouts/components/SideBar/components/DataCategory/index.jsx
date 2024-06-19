import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBowlRice, faCarrot, faDrumstickBite, faFrog } from '@fortawesome/free-solid-svg-icons';

export const category = [
    {
        icon: <FontAwesomeIcon icon={faDrumstickBite}/>,
        href: "/products/category/1",
        name: "Các món về gà"
    },
    {
        icon: <FontAwesomeIcon icon={faFrog }/>,
        href: "/products/category/2",
        name: "Các món về ếch"
    },
    {
        icon: <FontAwesomeIcon icon={faBowlRice}/>,
        href: "/products/category/3",
        name: "Các món xôi"
    },
    {
        icon: <FontAwesomeIcon icon={faCarrot}/>,
        href: "/products/category/4",
        name: "Các món rau"
    },
]