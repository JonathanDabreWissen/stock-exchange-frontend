import { useState } from "react";
import usePostData from "../../../hooks/usePostData";


const AddStockForm = () => {
  const { addData } = usePostData("/shares/add");
  const [stockData, setStockData] = useState({
    code: "",
    companyName: "",
    minPrice: "",
    maxPrice: "",
    quantity: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStockData({
        ...stockData,
        [name]: name === "minPrice" || name === "maxPrice" || name === "quantity" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stockData.code || !stockData.companyName || !stockData.minPrice || !stockData.maxPrice || !stockData.quantity) {
      alert("Please fill all fields");
      return;
    }
    
    const response = await addData(stockData);
    console.log(response);
    alert("Stock added successfully!");
    setStockData({ code: "", companyName: "", minPrice: "", maxPrice: "", quantity: "" });
  };

  return (
    <div className="mx-auto bg-white p-6 rounded-xl mb-5">
      <h6 className='text-[#344767] font-bold mb-4'>Add Stock</h6>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="code"
          placeholder="Stock Code"
          value={stockData.code}
          onChange={handleChange}
          className="w-full px-5 py-3 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#3A416F] "
        />
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={stockData.companyName}
          onChange={handleChange}
          className="w-full px-5 py-3 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#3A416F] "
        />
        <input
          type="number"
          name="minPrice"
          placeholder="Min Price"
          value={stockData.minPrice}
          onChange={handleChange}
          className="w-full px-5 py-3 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#3A416F] "
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          value={stockData.maxPrice}
          onChange={handleChange}
          className="w-full px-5 py-3 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#3A416F] "
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={stockData.quantity}
          onChange={handleChange}
          className="w-full px-5 py-3 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#3A416F] "
        />
        <button
          type="submit"
          className="w-full bg-[#344767] text-white py-2 rounded-lg text-sm font-semibold "
        >
          Add Stock
        </button>
      </form>
    </div>
  );
};

export default AddStockForm;
