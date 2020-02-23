import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { StyleSheet, css } from "aphrodite";
import { initialize, setPump } from "../device-control/main";

type PumpSwitch = "on" | "off";

type AppState = {
  pump1Status: PumpSwitch;
  pump2Status: PumpSwitch;
};

const Strut = (props: { size?: number }) => (
  <div
    className={css(styles.strut)}
    style={{ flexBasis: props.size ?? 16 }}
  ></div>
);

const Button = (props: { onClick: () => void; text: string }) => {
  const { onClick, text } = props;
  return (
    <button onClick={onClick} className={css(styles.button)}>
      {text}
    </button>
  );
};

const switchStatus = (curr: PumpSwitch): PumpSwitch =>
  curr === "on" ? "off" : "on";

const StatusIndicator = (props: { name: string; status: PumpSwitch }) => (
  <div className={css(styles.indicator)}>
    <div className={css(styles.indicatorLabel)}>{props.name}</div>
    <div className={css(styles.indicatorStatus)}>
      <div className={css(styles.indicatorText)}>{props.status}</div>
      <Strut size={8} />
      <div
        className={css(
          styles.indicatorCircle,
          props.status === "on" ? styles.greenIndicator : styles.redIndicator,
        )}
      ></div>
    </div>
  </div>
);

const App = () => {
  const [state, setState] = useState<AppState>({
    pump1Status: "off",
    pump2Status: "off",
  });

  useEffect(() => {
    setPump("pump1", state.pump1Status === "on");
    setPump("pump2", state.pump2Status === "on");
  }, [state, setState, setPump]);

  return (
    <div className={css(styles.base)}>
      Perfusion pump controls
      <Strut />
      <div className={css(styles.buttonGroup)}>
        <Button
          text="Toggle pump 1"
          onClick={() =>
            setState({ ...state, pump1Status: switchStatus(state.pump1Status) })
          }
        />
        <Strut />
        <Button
          text="Toggle pump 2"
          onClick={() =>
            setState({ ...state, pump2Status: switchStatus(state.pump2Status) })
          }
        />
        <Strut />
        <Button
          text="Toggle both pumps"
          onClick={() =>
            setState({
              ...state,
              pump1Status: switchStatus(state.pump1Status),
              pump2Status: switchStatus(state.pump2Status),
            })
          }
        />
      </div>
      <Strut size={32} />
      Pump status
      <Strut />
      <div className={css(styles.buttonGroup)}>
        <StatusIndicator name="Pump 1" status={state.pump1Status} />
        <Strut />
        <StatusIndicator name="Pump 2" status={state.pump2Status} />
      </div>
    </div>
  );
};

const render = () => {
  initialize().then(() =>
    ReactDOM.render(<App />, document.getElementById("main")),
  );
};

const styles = StyleSheet.create({
  base: {
    fontFamily: "Oxygen",
    fontSize: 24,
    padding: 16,
    backgroundColor: "#000",
    color: "#ddd",
    display: "flex",
    flexDirection: "column",
  },
  buttonGroup: {
    paddingLeft: 16,
    display: "flex",
    flexDirection: "inherit",
  },
  button: {
    border: "1px solid #ddd",
    borderRadius: 3,
    fontFamily: "Oxygen",
    backgroundColor: "#000",
    color: "#ddd",
    minHeight: 32,
    fontSize: 16,
    flexShrink: 1,
    ":hover": {
      backgroundColor: "#555",
      cursor: "pointer",
    },
    ":active": {
      backgroundColor: "#aaa",
    },
  },
  indicator: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  indicatorLabel: {
    fontSize: 16,
  },
  indicatorText: {
    fontSize: 16,
    textTransform: "uppercase",
  },
  indicatorCircle: {
    height: 10,
    width: 10,
    borderRadius: 10,
    flexGrow: 0,
    flexShrink: 0,
  },
  indicatorStatus: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  greenIndicator: {
    backgroundColor: "#0f0",
  },
  redIndicator: {
    backgroundColor: "#f00",
  },
  strut: { flexGrow: 0, flexShrink: 0 },
});
export default render;
