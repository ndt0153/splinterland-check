import React from "react";
import "./App.css";

import axios from "axios";
import { useState, useEffect } from "react";
import { main } from "./check-info";
//import saveData from "./save";
import Table from "./table";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import NewTable from "./newTable";
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
  const [checked, setChecked] = useState([]);
  const [newAcc, setNewAcc] = useState([]);
  const [tempAcc, setTempAcc] = useState("");
  const [haveData, setHaveData] = useState(false);
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
    ],
    []
  );
  const handleNewAccSubmit = (e) => {
    e.preventDefault();

    const arrayAcc = newAcc.split("\n");

    axios.post(`${url}/c`, arrayAcc).then((response) => {
      window.location.reload(false);
    });
    // saveData.uploadUser(users);
  };
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
  const handleDeleteSubmit = (e) => {
    e.preventDefault();
    let myArray = checked;

    axios.post(`${url}/delete-group`, checked).then((res) => {
      window.location.reload(false);
    });
    /* const arrayAcc = listAccCreate.split("\n");
    let submit = {
      name: listNameCreate,
      array: arrayAcc,
    };
    axios.post(`${url}/group`, submit).then((response) => {
      window.location.reload(false);
    }); */
    // saveData.uploadUser(users);
  };
  const onChangeCheckbox = (id) => {
    let arr = checked;
    if (id.target.checked) {
      arr.push(id.target.value);
    } else {
      console.log(id.target.value);
      arr = arr.filter((e) => e !== id.target.value);
    }
    setChecked(arr);
  };

  const handleSelect = async (e) => {
    if (e.target.value === "all") {
      setData(temp);
      setFilter(e.target.value);
    } else if (e.target.value === "Xin chon list") {
      setAcc(tempAcc);
      setData([]);
      setFilter(e.target.value);
    } else {
      setLoading(true);
      setFilter(e.target.value);
      setData([]);
      let data = await getDataFromClient(e.target.value);
      if (data) {
        setLoading(false);
      }
      /* const newData = temp.filter(function (el) {
        return el.group === e.target.value;
      });
      
      setData(newData); */
    }
  };
  const totalFromlist = async (data) => {
    let total = 0;
    data.forEach((data2, index) => {
      total += parseInt(data2[2]);
    });
    return setDEC(total);
  };
  function calTotalDEC(result) {
    setDEC(result);
  }
  function calTotalPower(result) {
    setPower(result);
  }
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
      };
    });

    return result;
  };

  const getDataFromClient = async (filter) => {
    const groupUser = await getUsersList(filter);
    for (let user of groupUser) {
      let result = await main(user);
      const results = await getData2(result);
      setData((old) => [...old, ...results]);

      setHaveData(true);
    }
    // const tableData = await main(groupUser);

    return true;
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
    //setData(userGroup.data);
    setTemp(userList.data.products);
    setPage(userList.data.page);
    setTempAcc(userList.data.count);
    setAcc(userList.data.count);
    setDEC(totalDEC.data.total);
    setPower(totalPower.data.total);
  };
  //const data2 = React.useMemo(() => fetchData(), []);
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-4 gap-4 text-center my-8  items-center">
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg py-8">
          <p className="text-sm text-gray-500">Total Acc</p>
          <h1 className="text-4xl text-green-500">
            {haveData ? data.length : acc}
          </h1>
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
              <option value="none">None</option>
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
                  Tạo List
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
                      <label className="block text-2xl text-gray-800 py-2">
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
                        className="block text-base text-white py-3 bg-green-500 text-white"
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
          <div>
            <Popup
              trigger={
                <button className="button px-10 py-2 bg-red-500 hover:bg-blue-400 text-white rounded-lg ml-5">
                  Xóa List
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
                  <div className="header">Xóa group </div>
                  <div className="content">
                    <form
                      className="flex flex-col"
                      onSubmit={handleDeleteSubmit}
                    >
                      <label className="block text-2xl text-gray-800 py-2">
                        Danh sách account:
                        {group
                          ? group.map((item) => (
                              <div key={item._id} className="">
                                <input
                                  className="form-checkbox p-2 mr-3 rounded text-pink-500 appearance-none checked:bg-blue-600 checked:border-transparent"
                                  type="checkbox"
                                  onChange={onChangeCheckbox}
                                  value={item.name}
                                  name={item.name}
                                />
                                <label className="h-60 text-base text-gray-800">
                                  {item.name}
                                </label>
                              </div>
                            ))
                          : ""}
                      </label>
                      <input
                        className="block text-base text-gray-800 py-3 bg-green-500 text-white"
                        type="submit"
                        value="Xóa danh sách"
                      />
                    </form>
                  </div>
                  <div className="actions"></div>
                </div>
              )}
            </Popup>
          </div>
          <div>
            <Popup
              trigger={
                <button className="button px-10 py-2 bg-blue-500 hover:bg-red-400 text-white rounded-lg ml-5">
                  Thêm User
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
                  <div className="header">Thêm User </div>
                  <div className="content">
                    <form
                      className="flex flex-col"
                      onSubmit={handleNewAccSubmit}
                    >
                      <label className="block text-2xl text-gray-800 py-2">
                        Danh sách account:
                        <textarea
                          type="textarea"
                          className="block w-full h-60 text-sm text-gray-800 mb-6 border-0 rounded-lg bg-gray-200 "
                          required
                          value={newAcc}
                          onChange={(e) => setNewAcc(e.target.value)}
                        />
                      </label>
                      <input
                        className="block text-base text-white py-3 bg-green-500 text-white"
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
        <div className="flex ml-40">
          {loading ? (
            <p className="text-base px-8 text-left block text-red-500">
              Đang lấy dữ liệu mới nhất, vui lòng chờ trong giây lát
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
      {/* <Table
        data={data}
        columns={columns}
        pageCount={pageCount}
        fetchData={fetchData}
      /> */}
      <NewTable
        data={data}
        haveData={haveData}
        passValue={calTotalDEC}
        passPower={calTotalPower}
      />
    </div>
  );
}

export default App;
