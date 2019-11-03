const div = document.querySelector("div");

const getDataFromURL = (input: string) =>
  fetch(
    `http://api.weatherstack.com/current?access_key=eacaca2dfa36519a9971955469b53ba1&query=${input}`
  ).then(res => res.json());
