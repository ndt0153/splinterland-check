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
  const url = "http://localhost:2000";
  const [loading, setLoading] = useState(false);
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
    axios.post(`${url}/group`, submit).then((response) => {
      window.location.reload(false);
    });
    // saveData.uploadUser(users);
  };
  const handleSelect = async (e) => {
    if (e.target.value === "all") {
      setData(temp);
      setFilter(e.target.value);
    } else {
      console.log(e.target.value);
      setLoading(true);
      setFilter(e.target.value);
      let data = await getDataFromClient(e.target.value);
      setData(data);

      setLoading(false);
      /* const newData = temp.filter(function (el) {
        return el.group === e.target.value;
      });
      
      setData(newData); */
    }
  };
  const getUsersList = async (filter) => {
    /* const mongo = await app.logIn(Realm.Credentials.anonymous());
    const client = app.currentUser.mongoClient("mongodb-atlas");
    const users = client.db("splinterland").collection("user");
    const rawList = await users.find(); */

    let rawList = await axios.get(`${url}/group?name=${filter}`);
    let userList2 = rawList.data.map((user) => {
      return user.username;
    });

    return userList2;
  };
  const getData2 = async (raw) => {
    const result = raw.map(function (ele, index) {
      return {
        id: index + 1,
        username: ele[0],
        dec: ele[1],
        erc: ele[2],
        rating: ele[3],
        power: ele[4],
        win: ele[5],
        lose: ele[6],
        draw: ele[7],
        total: ele[8],
        winrate: ele[9],
        quest: ele[10],
        lastgame: ele[11],
        lastdec: ele[12],
        lastclaim: ele[13],
        afk: ele[14],
      };
    });

    return result;
  };
  const getDataFromClient = async (filter) => {
    const groupUser = await getUsersList(filter);
    const tableData = await main(groupUser);
    const results = await getData2(tableData);
    return results;
  };
  const fetchData = async () => {
    const userList = await axios.get(`${url}/b`);
    const userGroup = await axios.get(`${url}/group`);
    const totalDEC = await axios.get(`${url}/totalDEC`);
    const totalPower = await axios.get(`${url}/totalPower`);
    const groupRaw = await axios.get(`${url}/group-name`);

    getDECPrice();
    setGroup(groupRaw.data);
    setFilter(group);
    // setData(userGroup.data);
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
            <select value={filter} onChange={handleSelect}>
              {group
                ? group.map((item) => (
                    <option value={item.name}>{item.name}</option>
                  ))
                : ""}
              <option value="all">All</option>
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
        <div>
          {loading ? (
            <p className="text-base px-8 text-left block text-red-500">
              Đang lấy dữ liệu mới nhất, vui lòng chờ trong giây lát
            </p>
          ) : (
            ""
          )}
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
