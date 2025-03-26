import React, { useContext, useEffect, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { HiMiniChartPie } from "react-icons/hi2";
import { BsArrowClockwise } from "react-icons/bs";
import { IoAdd } from "react-icons/io5";
import useGetData from "../../hooks/useGetData";
import { AuthContext } from "../../context/AuthContext";
import useUpdateData from "../../hooks/useUpdateData";
import { Toaster, toast } from 'sonner'

const FundsInvoice = () => {
  const { user } = useContext(AuthContext);
  const userId = String(user.id);

  const [balance, setBalance] = useState(0);
  

  const { data: balanceData, refetch:refetchBalanceData } = useGetData(`/api/auth/${userId}/balance`);
  const { updateData } = useUpdateData(`/api/auth/updateAmount`);


  useEffect(() => {
    setBalance(balanceData);
  }, [balanceData]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState("");
  const [amountInput, setAmountInput] = useState("");

  const openModal = (type) => {
    setTransactionType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setAmountInput("");
  };

  const handleSubmit = async () => {
    console.log(`${transactionType} amount:`, amountInput);

    let updatedFunds;
    if(transactionType=== "Add Funds"){
        updatedFunds = { userId: Number(userId), updateAmount: Number(amountInput) };
        
    }
    else if(transactionType === "Withdraw"){
        updatedFunds = { userId: Number(userId), updateAmount: -Number(amountInput) };
        
    }
    
    const response = await updateData(updatedFunds);
    if(response){
      toast.info("Funds updated successfully")
    }
    else{
      toast.info("Insufficient balance");
    }

    refetchBalanceData();
    closeModal();
  };

  return (
    <div className="flex justify-center">
      <Toaster/>
      <div className="flex flex-col items-center w-[600px]">
        <div className="balance flex flex-col items-center p-5 rounded-2xl bg-white w-full">
          <p className="text-xs text-gray-500 mb-2">Available margin (Cash)</p>
          <div className="amount flex space-x-1 text-4xl font-semibold mb-3 text-[#3A416F]">
            <span className="rupee-icon text-3xl pt-2">
              <FaRupeeSign />
            </span>
            <span>{balance}</span>
          </div>
          <button className="text-xs flex space-x-1">
            <span className="pt-0.5 text-[#3A416F]">
              <HiMiniChartPie />
            </span>
            <span className="font-semibold text-[#17C1E8]">View Statement</span>
          </button>
        </div>
        <div className="action-buttons mt-5 mb-10 flex space-x-4 w-full">
          <button
            className="w-full flex justify-center text-white space-x-2 px-5 py-3 bg-[#62e667] rounded-lg font-semibold text-sm"
            onClick={() => openModal("Add Funds")}
          >
            <IoAdd className="text-xl font-extrabold" />
            <span>Add funds</span>
          </button>
          <button
            className="w-full flex justify-center text-white space-x-2 px-5 py-3 bg-[#558be3] rounded-lg font-semibold text-sm"
            onClick={() => openModal("Withdraw")}
          >
            <BsArrowClockwise className="pt-1 text-[18px] font-extrabold" />
            <span>Withdraw</span>
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-2xl w-96">
            <h2 className="text-lg font-semibold mb-4 text-[#3A416F]">{transactionType}</h2>
            <input
              type="number"
              placeholder="Enter amount"
              className="w-full px-5 py-3 border focus:outline-none focus:ring-1 focus:ring-[#3A416F] text-sm rounded-lg mb-4"
              value={amountInput}
              onChange={(e) => setAmountInput(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <button className="px-4 py-2 bg-[#3A416F] text-white rounded-lg" onClick={closeModal}>Cancel</button>
              <button className="px-4 py-2 bg-[#17C1E8] text-white rounded-lg" onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FundsInvoice;