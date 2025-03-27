import React, { useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import useGetData from '../../../hooks/useGetData';
import LoadingContainer from '../../utils/LoadingContainer';
import UserTableItem from './UserTableItem';
import { RiDeleteBin6Fill, RiEditBoxFill } from 'react-icons/ri';

const UserTable = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [usersData, setUsersData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const { data: allUsersData, loading:allUsersLoading} = useGetData(`/api/auth/allUsers`);

  useEffect(() => {
    setUsersData(allUsersData)
  }, [allUsersData])

  const filteredUsersData = (usersData||[]).filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  

  // Toggle User selection
  const toggleUserSelection = (code) => {
    setSelectedUser(selectedUser === code ? null : code);
  };

  
  if(allUsersLoading){
    return (<LoadingContainer/>)
  }
  
  return (
    <div className='rounded-xl my-7 py-5 bg-white h-[100%]'>
      <div className='flex justify-between px-4'>
        <h6 className='text-[#344767] font-bold'>Users List</h6>
        <input
          className='px-4 py-2 border border-gray-300 rounded-lg text-sm'
          type='text'
          placeholder='Search stock'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className='flex justify-between pt-2'>
        <div className='w-[100%]'>
          <div className='row px-4 flex py-4 space-x-2 text-[13px] font-bold'>
            <div className='text-xs w-[50%] md:w-[10%] text-[#A8B2C4] flex justify-start items-center'>ID</div>
            <div className='text-xs w-[25%] md:w-[25%] text-[#A8B2C4] flex justify-start'>NAME</div>
            <div className='text-xs w-[25%] md:w-[25%] text-[#A8B2C4] flex justify-start'>PASSWORD</div>
            <div className='hidden text-xs w-[20%] text-[#A8B2C4] md:flex justify-start'>BIRTHDATE</div>
            <div className='hidden text-xs w-[20%] text-[#A8B2C4] md:flex justify-center'>BALANCE</div>
          </div>
          <div>
            {filteredUsersData.map((user, index) => (
              <div key={index} onClick={() => toggleUserSelection(user.id)} className="cursor-pointer">
                <UserTableItem
                  id={user.id}
                  name={user.name}
                  password={user.password}
                  birthdate = {user.dob}
                  balance = {user.balance}             
                />
                {/* Show buttons if the stock is selected */}
                {selectedUser === user.id && (
                    <div className="flex gap-2 my-4 px-4">
                    <button className="flex space-x-2 px-4 py-2 bg-[#17C1E8] text-white text-xs font-semibold rounded-md">
                        <div className="icon pt-0.5"><RiEditBoxFill/></div>
                        <div className="btn-name">EDIT</div>
                    </button>
                    <button  className="flex space-x-2 px-4 py-2 bg-[#eb5860] text-white text-xs font-semibold  rounded-md">
                        <div className="icon pt-0.5 "><RiDeleteBin6Fill/></div>
                        <div className="btn-name">DELETE</div>
                    </button>
                    </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
