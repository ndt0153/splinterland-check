import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import { main } from "./check-info";
import Table from "./table";
function App() {
  const [data, setData] = useState([]);
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
  //const data2 = React.useMemo(() => getData2(), []);
  useEffect(() => {
    const fetchData = async () => {
      const raw = await main();
      const result = await getData2(raw);
      setData(result);
    };
    fetchData();
  }, []);
  return (
    <div className="container mx-auto">
      <Table data={data} columns={columns} />
    </div>
  );
}

export default App;
