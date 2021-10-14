import React from "react";
import "./App.css";

import axios from "axios";
import { useState, useEffect } from "react";
import { main } from "./check-info";
//import saveData from "./save";
import Table from "./table";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
function App() {
  const [data, setData] = useState([]);
  const [temp, setTemp] = useState([]);
  const [pageCount, setPage] = useState(0);
  const [acc, setAcc] = useState(0);
  const [DECPrice, setDECPrice] = useState(0);
  const [totalDEC, setDEC] = useState(0);
  const [totalPower, setPower] = useState(0);
  const [group, setGroup] = useState([]);
  const [filter, setFilter] = useState("");
  const [listNameCreate, setCreateListName] = useState("");
  const [listAccCreate, setCreateAcc] = useState("");
  const option = [{ value: "nhom1", label: "Nhóm 1" }];
  const getDECPrice = async () => {
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
    const arrayAcc = listAccCreate.split("\n");
    let submit = {
      name: listNameCreate,
      array: arrayAcc,
    };
    axios.post("http://localhost:2000/group", submit).then((response) => {
      window.location.reload(false);
    });
    // saveData.uploadUser(users);
  };
  const handleSelect = (e) => {
    if (e.target.value === "all") {
      setData(temp);
    } else {
      const newData = temp.filter(function (el) {
        return el.group === e.target.value;
      });
      setData(newData);
    }
  };
  const fetchData = async () => {
    const userList = await axios.get("http://localhost:2000/b");
    const totalDEC = await axios.get("http://localhost:2000/totalDEC");
    const totalPower = await axios.get("http://localhost:2000/totalPower");
    const groupRaw = await axios.get("http://localhost:2000/group");
    getDECPrice();
    setGroup(groupRaw.data);
    setData(userList.data.products);
    setTemp(userList.data.products);
    setPage(userList.data.page);
    setAcc(userList.data.count);
    setDEC(totalDEC.data.total);
    setPower(totalPower.data.total);
  };
  //const data2 = React.useMemo(() => fetchData(), []);
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
        <div className="flex flex-row">
          <div>
            <select onChange={handleSelect}>
              <option value="all" selected>
                All
              </option>
              {group
                ? group.map((item) => (
                    <option value={item.name}>{item.name}</option>
                  ))
                : ""}
            </select>
          </div>
          <div>
            <Popup
              trigger={
                <button className="button px-10 py-2 bg-blue-500 hover:bg-red-400 text-white rounded-lg ml-5">
                  {" "}
                  Tạo List{" "}
                </button>
              }
              modal
              nested
            >
              {(close) => (
                <div className="modal">
                  <button className="close" onClick={close}>
                    &times;
                  </button>
                  <div className="header">Tạo group </div>
                  <div className="content">
                    <form className="flex flex-col" onSubmit={handleSubmit}>
                      <label className="block text-base text-gray-800 py-2">
                        Tên danh sách:
                        <input
                          type="text"
                          className="block w-full  text-sm text-gray-800 mb-6 border-0 rounded-lg bg-gray-200 "
                          required
                          value={listNameCreate}
                          onChange={(e) => setCreateListName(e.target.value)}
                        />
                      </label>
                      <label className="block text-base text-gray-800 py-2">
                        Danh sách account:
                        <textarea
                          type="textarea"
                          className="block w-full h-60 text-sm text-gray-800 mb-6 border-0 rounded-lg bg-gray-200 "
                          required
                          value={listAccCreate}
                          onChange={(e) => setCreateAcc(e.target.value)}
                        />
                      </label>
                      <input
                        className="block text-base text-gray-800 py-3 bg-green-500 text-white"
                        type="submit"
                        value="Tạo danh sách"
                      />
                    </form>
                  </div>
                  <div className="actions"></div>
                </div>
              )}
            </Popup>
          </div>
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
