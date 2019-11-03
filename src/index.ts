import { from } from "rxjs";

import { map, catchError } from "rxjs/operators";

const div = document.querySelector("div");

const getDataFromURL = (input: string) =>
  fetch(
    `http://api.weatherstack.com/current?access_key=eacaca2dfa36519a9971955469b53ba1&query=${input}`
  ).then(res => res.json());

const streamFactory = (input: string) =>
  from(getDataFromURL(input)).pipe(map((value: any) => value));

const displayResult = (arr: Array<string>) => {
  for (let i = 0; i < arr.length; i++) {
    const childDiv = document.createElement("div");
    streamFactory(arr[i])
      .pipe(catchError(err => err))
      .subscribe((event: any) => {
        event.location
          ? (childDiv.innerHTML = `<p>Name: ${event.location.name}</p>
              <p>Local Time: ${event.location.localtime.split(" ")[1]}</p>
              <p>Temperature: ${event.current.temperature} &deg;F</p> <br>
              `)
          : (childDiv.innerHTML = `<p>Invalid location nameor postal code for ${arr[i]}</p> <br>`);
        div.appendChild(childDiv);
      });
  }
};
