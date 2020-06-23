import React, { useState } from "react";
import { useIntervalWithInitial } from "../tools/hooks";
import { fetchSugar, fetchLast24 } from "../tools/fetch";

import SugarValue from "./SugarValue";
import DailyGraph from "./DailyGraph";
import DailyPie from "./DailyPie";

function calcAverage(newData) {
  const newAverage =
    newData.reduce((sum, current) => sum + current.sgv, 0) / newData.length;
  console.log(newAverage);
  return newAverage;
}

function calcTimeInRange(newData) {
  const lowMark = 70;
  const highMark = 180;

  const values = newData.map((d) => d.sgv);
  const low = (values.filter((v) => v < lowMark).length / values.length) * 100;
  const good =
    (values.filter((v) => v >= lowMark && v <= highMark).length /
      values.length) *
    100;
  const high =
    (values.filter((v) => v > highMark).length / values.length) * 100;

  const result = [
    { value: low, name: "low" },
    { value: good, name: "good" },
    { value: high, name: "high" },
  ];
  console.log(values, result);
  return result;
}

const Main = function () {
  const [glucose, setGlucose] = useState({ sgv: 0 });
  const [glucoseValues, setGlucoseValues] = useState([{ sgv: 0 }]);

  useIntervalWithInitial(async () => {
    const data = await fetchSugar();
    setGlucose(data);
  }, 2 * 60 * 1000);

  useIntervalWithInitial(async () => {
    const data = await fetchLast24();
    setGlucoseValues(data);
  }, 2 * 60 * 1000);

  return (
    <div>
      <SugarValue {...glucose} />
      <DailyGraph data={glucoseValues} />
      <div>Average: {calcAverage(glucoseValues).toFixed(0)}</div>
      <DailyPie data={calcTimeInRange(glucoseValues)} />
    </div>
  );
};

export default Main;
