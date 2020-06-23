import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const COLOURS = ["#FF0000", "#00C49F", "#fbab48"];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if (!percent) return null
  
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const DailyGraph = function({ data = [] }) {
  return (
    <PieChart width={400} height={400}>
      <Legend verticalAlign="middle" align="left" layout="vertical"/>
      <Pie
        data={data}
        dataKey="value"
        startAngle={180}
        endAngle={0}
        cx={200}
        cy={200}
        outerRadius={80}
        label={renderCustomizedLabel}
        labelLine={false}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLOURS[index]} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default DailyGraph;
