import { MdLibraryAdd } from "react-icons/md";
import { RiEditBoxFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { RiFileList3Fill } from "react-icons/ri";
import { PiUsersFill } from "react-icons/pi";




const adminPagesData = [
    {
        id: 1,
        icon: RiFileList3Fill,  // ✅ Pass reference, not JSX
        optionName: "List Stocks",
        path: "/list-stocks"
    },
    {
        id: 2,
        icon: MdLibraryAdd,  // ✅ Pass reference, not JSX
        optionName: "Add Stock",
        path: "/add-stock"
    },
    {
        id: 3,
        icon: PiUsersFill, // ✅ Pass reference, not JSX
        optionName: "Users List",
        path: "/list-users"
    },
    {
        id: 4,
        icon: MdDelete, // ✅ Pass reference, not JSX
        optionName: "Delete Stock",
        path: "/delete-stock"
    }
];

export default adminPagesData;
