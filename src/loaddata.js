import { faker } from '@faker-js/faker';

const rowsNumber = 4200;
let data = [];

for (let i=0; i<rowsNumber; i++) {
    let row = [faker.person.fullName(), faker.location.city(), faker.date.past(), faker.airline.airline().name];
    data.push(row);

    if (data.length >= 1000) {
        postMessage(data); 
        data = [];            
    }
}

postMessage(data); 