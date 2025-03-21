import React from "react";
import { DonutChart } from "@tremor/react";

const chartdata = [
    { "name": "Métaux précieux", "amount": 1.5 },
    { "name": "Métaux de base", "amount": 1650 },
    { "name": "Alliages et métaux industriels", "amount": 1585 },
    { "name": "Semi-conducteurs", "amount": 16.5 },
    { "name": "Polymères", "amount": 850 },
    { "name": "Matériaux vitreux", "amount": 35 },
    { "name": "Encres", "amount": 30 }
];

export const DonutChartOnValueChangeExample = () => {
  const [value, setValue] = React.useState(null);

  return (
    <>
      <DonutChart
        className="mx-auto"
        data={chartdata}
        category="amount" // La propriété contenant les valeurs numériques
        index="name" // La propriété contenant les noms des segments
        onValueChange={(v) => setValue(v)}
      />
      <pre className="mt-8 rounded-md bg-gray-950 p-3 text-sm text-white dark:bg-gray-800">
        {JSON.stringify(value, null, 2)}
      </pre>
    </>
  );
};

export default DonutChartOnValueChangeExample;