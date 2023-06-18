import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import { Chart } from "react-google-charts";
import { getClientD, getProductD } from "../../http/DiagramAPI";

const Analytics = observer(() => {
  const [dataProduct, setDataProduct] = useState([]);
  const [dataClient, setDataClient] = useState([]);

  useEffect(() => {
    getProductD().then((data) =>
      setDataProduct([
        ["Дата", ...data.map((item) => item.name)],
        [data[0].dataSale.substr(0, 7), data[0].total, null, null, null, null],
        [data[1].dataSale.substr(0, 7), null, data[1].total, null, null, null],
        [data[2].dataSale.substr(0, 7), null, null, data[2].total, null, null],
        [data[3].dataSale.substr(0, 7), null, null, null, data[3].total, null],
        [data[4].dataSale.substr(0, 7), null, null, null, null, data[4].total],
      ])
    );

    getClientD().then((data) =>
      setDataClient([
        ["Пользователь", "Количество покупок"],
        [data[0].name, data[0].total],
        [data[1].name, data[1].total],
        [data[2].name, data[2].total],
      ])
    );
  }, []);

  const optionsProduct = {
    title: "Наиболее продаваемый товар за месяц",
    hAxis: { title: "Год/месяц" },
    vAxis: { title: "Количество покупок товара" },
    seriesType: "bars",
  };

  const optionsClient = {
    title: "3 важных клиента, которые часто делают покупки",
  };

  return (
    <>
      <Chart
        chartType="ComboChart"
        width="100%"
        height="400px"
        data={dataProduct}
        options={optionsProduct}
      />
      <Chart
        chartType="PieChart"
        width="100%"
        height="400px"
        data={dataClient}
        options={optionsClient}
      />
    </>
  );
});

export default Analytics;
