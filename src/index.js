import Grid from './grid/grid.js';
import { faker } from '@faker-js/faker';

'use strict';
{
    const getData = () => {
        const rowsNumber = 42;

        let columnNames = ["Name", "Location", "Date", "qqq"];
        let data = [];
    
        for (let i=0; i<rowsNumber; i++) {
            let row = [faker.person.fullName(), faker.location.city(), faker.date.past(), faker.airline.airline().name];
            data.push(row);
        }
    
        return data;
    };

    const grid = new Grid(document.getElementById("grid"));
    grid.init();
    grid.showColumns(["Name", "Location", "Date", "qqq"]);
    grid.showData(getData());
}