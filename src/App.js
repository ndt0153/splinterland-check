import React from "react";
import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { main } from "./check-info";
//import saveData from "./save";
import Table from "./table";

function App() {
  const [data, setData] = useState([]);
  const [users, setUsers] = useState("");
  const [totalAcc, setAcc] = useState(0);
  const [totalDEC, setDEC] = useState(0);
  const [totalPower, setPower] = useState(0);
  const [DECPrice, setDECPrice] = useState(0);
  const [pageCount, setPageCount] = React.useState(0);
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
  const getUsersList = async (pageIndex) => {
    /* const mongo = await app.logIn(Realm.Credentials.anonymous());
    const client = app.currentUser.mongoClient("mongodb-atlas");
    const users = client.db("splinterland").collection("user");
    const rawList = await users.find(); */

    let rawList = await axios.get(
      `http://localhost:2000/b?pageSize=10&page=${pageIndex + 1}`
    );
    let userList2 = rawList.data.products.map((user) => {
      return user.username;
    });
    setPageCount(rawList.data.page);
    setAcc(rawList.data.count);
    return userList2;
  };
  const totalDecCaculator = async (raw) => {
    let totalDEC = 0;
    raw.forEach(function (ele) {
      totalDEC += ele[1];
    });
    return parseInt(totalDEC);
  };
  const totalPowerCaculator = async (raw) => {
    let totalDEC = 0;
    raw.forEach(function (ele) {
      totalDEC += ele[4];
    });
    return parseInt(totalDEC);
  };
  const getDECPrice = async (raw) => {
    let result = await axios.get(
      "https://api.pancakeswap.info/api/v2/tokens/0xe9d7023f2132d55cbd4ee1f78273cb7a3e74f10a"
    );
    //console.log(result);
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
    const userList = await getUsersList(pageIndex);
    const raw = await main(userList);
    const DEC = await totalDecCaculator(raw);
    const Power = await totalPowerCaculator(raw);
    const result = await getData2(raw);
    getDECPrice();
    setData(result);
    setDEC(DEC);
    setPower(Power);
  };
  //const data2 = React.useMemo(() => getData2(), []);
  useEffect(() => {}, []);
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-4 gap-4 text-center my-8  items-center">
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg py-8">
          <p className="text-sm text-gray-500">Total Acc</p>
          <h1 className="text-4xl text-green-500">{totalAcc}</h1>
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
            {parseFloat(totalDEC * DECPrice).toFixed(2)} USD
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
