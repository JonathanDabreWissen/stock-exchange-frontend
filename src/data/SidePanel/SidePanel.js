import { AiFillHome } from "react-icons/ai";
import { PiBuildingApartmentFill } from "react-icons/pi";
import { PiHandbagFill } from "react-icons/pi";
import { FaBookmark } from "react-icons/fa6";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";


import { HiCreditCard } from "react-icons/hi";
import { RiBox2Fill } from "react-icons/ri";
import { FaTools } from "react-icons/fa";
import { BsBoxFill } from "react-icons/bs";


const sidePanelData = [
  {
    id: 1,
    icon: AiFillHome, // Store the component reference
    optionName: "Dashboard",
    path: "/dashboard"
  },
  {
    id: 2,
    icon: BsBoxFill,
    optionName: "Orders",
    path: "/orders"
  },
  {
    id: 3,
    icon: PiHandbagFill,
    optionName: "Holdings",
    path: "/holdings    "
  },
  {
    id: 4,
    icon: FaBookmark,
    optionName: "Watchlist",
    path: "/watchlist"
  },
  {
    id: 5,
    icon: RiMoneyRupeeCircleFill,
    optionName: "Funds",
    path: "/funds"
  }
];

export default sidePanelData;
