import { HiCurrencyDollar } from "react-icons/hi2";
import { FaGlobeAmericas } from "react-icons/fa";
import { FaTrophy } from "react-icons/fa";

const growthData = [
    {
        title: "Sensex",
        number: "76,020",
        growth: 1.5,
        icon: HiCurrencyDollar // Store function, not JSX element
    },
    {
        title: "Nifty",
        number: "21300",
        growth: 3,
        icon: FaGlobeAmericas
    },
    {
        title: "Nifty Bank",
        number: "48462",
        growth: -2,
        icon: FaTrophy
    }
];

export default growthData;
