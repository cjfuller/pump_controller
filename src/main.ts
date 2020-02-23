import { app, BrowserWindow } from "electron";

import { windowHeightPx, windowWidthPx } from "./ui/styles";

function createWindow() {
  const win = new BrowserWindow({
    width: windowWidthPx,
    height: windowHeightPx,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: true,
    },
  });
  win.loadFile("../index.html");
  win.removeMenu();
}
app.allowRendererProcessReuse = false;
app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  app.quit();
});

export default createWindow;
