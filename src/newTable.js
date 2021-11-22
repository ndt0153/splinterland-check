import React, { useEffect } from "react";

export default function NewTable(props) {
  const hello = (data) => {
    var result = 0;
    var power = 0;
    props.data.map((d) => {
      result += d.dec;
      power += d.power;
    });
    if (props.haveData) {
      props.passValue(parseFloat(result).toFixed(2));
      props.passPower(power);
    }
  };
  useEffect(() => {
    hello(props.data);
  }, [props.data]);
  return (
    <div className="mt-4 flex flex-col">
      <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center justify-between">#</div>
                  </th>
                  <th className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center justify-between">
                      UserName
                    </div>
                  </th>
                  <th className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center justify-between">DEC</div>
                  </th>
                  <th className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center justify-between">ECR</div>
                  </th>
                  <th className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center justify-between">
                      Rating
                    </div>
                  </th>
                  <th className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center justify-between">
                      Power
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {props.haveData
                  ? props.data.map((item, i = 1) => (
                      <tr>
                        <td role="cell" className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {(i = i + 1)}
                          </div>
                        </td>
                        <td role="cell" className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {item.username}
                          </div>
                        </td>
                        <td role="cell" className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {item.dec}
                          </div>
                        </td>
                        <td role="cell" className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {item.erc}
                          </div>
                        </td>
                        <td role="cell" className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {item.rating}
                          </div>
                        </td>
                        <td role="cell" className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {item.power}
                          </div>
                        </td>
                      </tr>
                    ))
                  : "Khong co user"}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
