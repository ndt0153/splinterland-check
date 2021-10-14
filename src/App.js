import React from "react";
import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { main } from "./check-info";
//import saveData from "./save";
import Table from "./table";

function App() {
  const [data, setData] = useState([]);
  const [pageCount, setPage] = useState(0);
  const [acc, setAcc] = useState(0);
  const [DECPrice, setDECPrice] = useState(0);
  const [totalDEC, setDEC] = useState(0);
  const [totalPower, setPower] = useState(0);

  const getDECPrice = async (raw) => {
    let result = await axios.get(
      "https://api.pancakeswap.info/api/v2/tokens/0xe9d7023f2132d55cbd4ee1f78273cb7a3e74f10a"
    );
    return result !== undefined
      ? setDECPrice(parseFloat(result.data.data.price))
      : 0;
  };
  const columns = React.useMemo(
    () => [
      {
        Header: "#",
        accessor: "id", // accessor is the "key" in the data
      },
      {
        Header: "Username",
        accessor: "username",
      },
      {
        Header: "DEC",
        accessor: "dec",
      },
      {
        Header: "ERC",
        accessor: "erc",
      },
      {
        Header: "Rating",
        accessor: "rating",
      },
      {
        Header: "Power",
        accessor: "power",
      },
      {
        Header: "Win",
        accessor: "win",
      },
      {
        Header: "Lose",
        accessor: "lose",
      },
      {
        Header: "Draw",
        accessor: "draw",
      },
      {
        Header: "Total",
        accessor: "total",
      },
      {
        Header: "Win Rate",
        accessor: "winrate",
      },
      {
        Header: "Quest",
        accessor: "quest",
      },
      {
        Header: "Lastest game",
        accessor: "lastgame",
      },
      {
        Header: "Lastest DEC quest",
        accessor: "lastdec",
      },
      {
        Header: "Lastest claim quest",
        accessor: "lastclaim",
      },
      {
        Header: "AFK",
        accessor: "afk",
      },
    ],
    []
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    // saveData.uploadUser(users);
  };
  const fetchData = async (pageIndex) => {
    const userList = await axios.get("http://localhost:2000/b");
    const totalDEC = await axios.get("http://localhost:2000/totalDEC");
    const totalPower = await axios.get("http://localhost:2000/totalPower");
    getDECPrice();

    setData(userList.data.products);
    setPage(userList.data.page);
    setAcc(userList.data.count);
    setDEC(totalDEC.data.total);
    setPower(totalPower.data.total);
  };
  //const data2 = React.useMemo(() => getData2(), []);
  useEffect(() => {}, []);
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-4 gap-4 text-center my-8  items-center">
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg py-8">
          <p className="text-sm text-gray-500">Total Acc</p>
          <h1 className="text-4xl text-green-500">{acc}</h1>
        </div>
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg py-8">
          <p className="text-sm text-gray-500">Total DEC</p>
          <h1 className="text-4xl text-green-500">{totalDEC}</h1>
        </div>
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg py-8">
          <p className="text-sm text-gray-500">Total Power</p>
          <h1 className="text-4xl text-green-500">{totalPower}</h1>
        </div>
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg py-8">
          <p className="text-sm text-gray-500">Total USD</p>
          <h1 className="text-4xl text-green-500">
            {parseFloat(DECPrice * totalDEC).toFixed(2)} USD
          </h1>
        </div>
      </div>
      <Table
        data={data}
        columns={columns}
        pageCount={pageCount}
        fetchData={fetchData}
      />
    </div>
  );
}

export default App;
