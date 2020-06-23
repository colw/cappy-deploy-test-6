import React from "react";

const directionGlyph = {
  NONE: "⇼",
  TripleUp: "⤊",
  DoubleUp: "⇈",
  SingleUp: "↑",
  FortyFiveUp: "↗",
  Flat: "→",
  FortyFiveDown: "↘",
  SingleDown: "↓",
  DoubleDown: "⇊",
  TripleDown: "⤋",
  "NOT COMPUTABLE": "-",
  "RATE OUT OF RANGE": "⇕"
};

const SugarValue = function({ sgv = 0, direction = "NONE" }) {
  return (
    <div className="main-sugar-display">
      <span className="sugar">{sgv}</span>
      <span className="direction">{directionGlyph[direction]}</span>
    </div>
  );
};

export default SugarValue;
