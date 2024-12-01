import Grid from './grid/grid.js';
import './style.css';

'use strict';
{
    const grid = new Grid(document.getElementById("grid"));
    grid.init();
    grid.showColumns(["Name", "Location", "Date", "qqq"]);

    const dataloader = new Worker(new URL("loaddata.js", import.meta.url));
    dataloader.onmessage = (m) => grid.addData(m.data);
}