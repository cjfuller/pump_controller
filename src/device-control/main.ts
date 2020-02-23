import { promisify } from "util";

import Firmata from "firmata";

const board = new Firmata("COM3");

const ready = promisify(cb => board.on("ready", cb));

export async function initialize() {
  await ready();
  board.pinMode(7, board.MODES.OUTPUT);
  board.digitalWrite(7, 0);
  board.pinMode(9, board.MODES.OUTPUT);
  board.digitalWrite(9, 0);
}

export const setPump = (pump: "pump1" | "pump2", on: boolean) => {
  const pin = pinMapping[pump];
  board.digitalWrite(pin, on ? 1 : 0);
};

export const pinMapping = {
  pump1: 7,
  pump2: 9,
};
