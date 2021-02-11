import "../styles/index.scss";
import { Calendar } from "./components";

if (process.env.NODE_ENV === "development") {
  require("../index.html");
}

const appElement = document.querySelector("#appRoot");
const calendar = new Calendar(appElement);

calendar.render();
