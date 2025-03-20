import { MdLibraryAdd } from "react-icons/md";
import { RiEditBoxFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { RiFileList3Fill } from "react-icons/ri";




const accountPagesData = [
    {
        id: 1,
        icon: RiFileList3Fill,  // ✅ Pass reference, not JSX
        optionName: "List Stock",
        path: "/add-stock"
    },
    {
        id: 2,
        icon: MdLibraryAdd,  // ✅ Pass reference, not JSX
        optionName: "Add Stock",
        path: "/add-stock"
    },
    {
        id: 3,
        icon: RiEditBoxFill, // ✅ Pass reference, not JSX
        optionName: "Edit Stock",
        path: "/edit-stock"
    },
    {
        id: 4,
        icon: MdDelete, // ✅ Pass reference, not JSX
        optionName: "Delete Stock",
        path: "/delete-stock"
    }
];

export default accountPagesData;
