const fs = require("fs");
const path = require("path");
const axios = require("axios");
const stringToDOM = require("./stringToDOM");
const parser = require("./parser");

// MIN businessID found so far = 0
// MAX businessID found so far =

const noDATA = JSON.stringify({
  success: false,
  errorCode: 404,
  errors: ["No more results found"],
});

async function URLextractor(id) {
  const interim_url = `https://retailportal.difc.ae/api/v3/public-register/overviewList?page=1&keywords=&companyName=&registrationNumber=${id}type=&status=&latitude=0&longitude=0&sortBy=&difc_website=1&data_return=true&isAjax=true`;
  try {
    const res = await axios.get(interim_url);

    if (JSON.stringify(res.data) === noDATA) {
      console.log(false);
      return false;
    } else {
      const $ = stringToDOM(res.data.data);
      const companyProfileURL = $("a").eq(0).attr("href");

      return companyProfileURL;
    }
  } catch (error) {
    console.log(error);
  }
}

async function run(id) {
  try {
    const comp_url = await URLextractor(id);

    console.log(comp_url);
    if (comp_url === false) {
      console.log("no data associated with ID: ", id);
    } else {
      const res = await axios.get(comp_url);
      const parsedDATA = parser(res);
      console.log(parsedDATA);

      fs.readFile(
        path.join("../", "data", "parsedData.json"),
        "utf-8",
        (err, content) => {
          if (err) {
            throw err;
          }
          if (content.length === 0) {
            console.log("file is empty");
            fs.writeFile(
              path.join("../", "data", "parsedData.json"),
              "[" + JSON.stringify(parsedDATA) + "]",
              (err) => {
                if (err) {
                  throw err;
                }
                console.log("file was updated");
              }
            );
          } else {
            let jsonData = JSON.parse(content);
            jsonData.push(parsedDATA);
            let backToStringData = JSON.stringify(jsonData);
            fs.writeFile(
              path.join("../", "data", "parsedData.json"),
              backToStringData,
              (err) => {
                if (err) {
                  throw err;
                }
                console.log("file was updated");
              }
            );
          }
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
}
// let identifier = 3;
// run(identifier);

async function workLoop(startID, endID) {
  for (let i = startID; i <= endID; i++) {
    await run(i);
  }
}

workLoop(0, 12);
