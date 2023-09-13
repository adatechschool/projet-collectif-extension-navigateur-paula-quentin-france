// Declaration of variables of the supabase api to extract the data

const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxZnNqdWZzdXV0bW52endpbnVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM5MDE5NTgsImV4cCI6MjAwOTQ3Nzk1OH0.-rasUQus-Zlolv_Q1URFeR8XzMi-isSk5wC7xxCgbNc";

const supaBaseURL = "https://aqfsjufsuutmnvzwinus.supabase.co/rest/v1/birthday";

// creation of a object with the months in a year

let monthOfTheYear = {
  1: "Janvier",
  2: "Février",
  3: "Mars",
  4: "Avril",
  5: "Mai",
  6: "Juin",
  7: "Juillet",
  8: "Août",
  9: "Septembre",
  10: "Octobre",
  11: "Novembre",
  12: "Décembre",
};

// Enter the asynchronous function to extract data from the API

async function getBirthdays() {
  const response = await fetch(supaBaseURL, {
    headers: {
      apiKey: apiKey,
      autorization: "bearer " + apiKey,
    },
  });
  const data = await response.json(); // constant data includes API data

  // variable to have the current month in number

  let monthActual = new Date().getMonth() + 1;

  // function that extracts the birth month of the person for the index "x"

  function getBirthdayMonth(x) {
    let dateOfBirthday = new Date(data[x]["birthday"]);
    let monthOfBirthday = dateOfBirthday.getMonth() + 1;
    return monthOfBirthday;
  }

  // loop that compares the birthday month for the index "i" and the current month "monthActual"------------ACTUAL--------------------------------

  function monthActualBirthday() {
    displayMonth(monthActual);
    let birthdayDiv;
    for (let i = 0; i < data.length; i++) {
      if (getBirthdayMonth(i) === monthActual) {
        let dateFr = data[i]["birthday"];
        let dateSplit = dateFr.split("-");
        let newDate = dateSplit[2] + "/" + dateSplit[1] + "/" + dateSplit[0];
        birthdayDiv = document.createElement("div"); // Create div
        document.querySelector("#birthday").appendChild(birthdayDiv); //indicates that the div is the child of the div "birthday"
        birthdayDiv.innerHTML = data[i]["name"] + " " + newDate; //we write in the div the text with the values that we get out of the loop
        let current = new Date().toLocaleDateString("fr");
        if (current === newDate) {
          alert("C'est l'anniversaire de " + data[i]["name"] + " !");
        }
      }
    }
    return;
  }

  monthActualBirthday();

  // Fonction pour afficher les anniversaires du mois suivant --------------NEXT---------------------------------------------------------------------

  function nextMonthBirthday() {
    let birthdayDiv;
    monthActual++;
    let counter = 0;
    if (limitMonthNext(monthActual) == false) {
      monthActual = 1;
    }
    for (let i = 0; i < data.length; i++) {
      if (getBirthdayMonth(i) === monthActual) {
        counter++;
        let dateFr = data[i]["birthday"];
        let dateSplit = dateFr.split("-");
        let newDate = dateSplit[2] + "/" + dateSplit[1] + "/" + dateSplit[0];
        birthdayDiv = document.createElement("div"); // Create div
        document.querySelector("#birthday").appendChild(birthdayDiv); //indicates that the div is the child of the div "birthday"
        birthdayDiv.innerHTML = data[i]["name"] + " " + newDate; //we write in the div the text with the values that we get out of the loop
      }
    }
    if (counter === 0) {
      birthdayDiv = document.createElement("div"); // Create div
      document.querySelector("#birthday").appendChild(birthdayDiv); //indicates that the div is the child of the div "birthday"
      birthdayDiv.innerHTML = "Pas d'anniversaire à souhaiter"; //we write in the div the text with the values that we get out of the loop
    }
  }

  // Fonction pour mettre à zero la div "#birthday" et lancer la fonction nextMonthBirthday() grâce à un clique sur le bouton next

  function runFunctionNext() {
    let button = document.getElementById("next");
    button.addEventListener("click", clickFunction);
    function clickFunction() {
      document.querySelector("#birthday").innerHTML = "";
      nextMonthBirthday();
      displayMonth(monthActual);
    }
  }
  runFunctionNext();

  function limitMonthNext(x) {
    if (x > 12) {
      return false;
    }
    return true;
  }

  // Fonction pour afficher les anniversaires du mois précédant --------------PREVIOUS---------------------------------------------------------------------

  function previousMonthBirthday() {
    let birthdayDiv;
    monthActual--;
    let counter = 0;
    if (LimitMonthPrevious(monthActual) == false) {
      monthActual = 12;
    }
    for (let i = 0; i < data.length; i++) {
      if (getBirthdayMonth(i) === monthActual) {
        counter++;
        let dateFr = data[i]["birthday"];
        let dateSplit = dateFr.split("-");
        let newDate = dateSplit[2] + "/" + dateSplit[1] + "/" + dateSplit[0];
        birthdayDiv = document.createElement("div"); // Create div
        document.querySelector("#birthday").appendChild(birthdayDiv); //indicates that the div is the child of the div "birthday"
        birthdayDiv.innerHTML = data[i]["name"] + " " + newDate; //we write in the div the text with the values that we get out of the loop
      }
    }
    if (counter === 0) {
      birthdayDiv = document.createElement("div"); // Create div
      document.querySelector("#birthday").appendChild(birthdayDiv); //indicates that the div is the child of the div "birthday"
      birthdayDiv.innerHTML = "Pas d'anniversaire à souhaiter"; //we write in the div the text with the values that we get out of the loop
    }
  }

  // Fonction pour mettre à zero la div "#birthday" et lancer la fonction nextMonthBirthday() grâce à un clique sur le bouton next

  function runFunctionPrevious() {
    let button = document.getElementById("previous");
    button.addEventListener("click", clickFunction);
    function clickFunction() {
      document.querySelector("#birthday").innerHTML = "";
      previousMonthBirthday();
      displayMonth(monthActual);
    }
  }
  runFunctionPrevious();

  function LimitMonthPrevious(x) {
    if (x < 1) {
      return false;
    }
    return true;
  }

  // fonction pour changer le mois affiché en fonction de "monthActual"

  function displayMonth(x) {
    let displayH2 = document.querySelector("h2");
    displayH2.innerHTML = monthOfTheYear[x];
  }
}

getBirthdays();

//------------------------------------------- Second API---------------------------------------------------------
const apiKey2 = "pKGo3gtGvxbS06C39uchqA==oAIvCQ0AmA5bbnRE";

const dayActual = new Date().getDate();
const actualMonth = new Date().getMonth() + 1;
let randomId = generateRandomId(1, 10);

async function history() {
  const response = await fetch(
    "https://api.api-ninjas.com/v1/historicalevents?day=" +
      dayActual +
      "&month=" +
      actualMonth, // +
    // "&year=" +
    // randomYear,
    {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        "X-Api-Key": apiKey2,
      },
    }
  );
  const myJson = await response.json();

  let oneObject = myJson[randomId];
  let event = oneObject["event"];
  let year = oneObject["year"];

  document.querySelector("#historicalFact").innerHTML = event;
  document.querySelector("#yearH2").innerHTML =
    "Fait du jour en : " + " " + year;
}

// fonction pour generer un nombre aléatoire

function generateRandomId(min, max) {
  let randomNumber = Math.random() * (max - min) + min;
  return parseInt(randomNumber);
}

history();

// -------------------------------------------------------------------------------

// function hoverConfetti() {
//   let button = document.getElementById("previous");

//   button.addEventListener("click", function () {
//     function random(max) {
//       return Math.random() * (max - 0) + 0;
//     }

//     var c = document.createDocumentFragment();
//     for (var i = 0; i < 100; i++) {
//       var styles =
//         "transform: translate3d(" +
//         (random(500) - 250) +
//         "px, " +
//         (random(200) - 150) +
//         "px, 0) rotate(" +
//         random(360) +
//         "deg);\
//                   background: hsla(" +
//         random(360) +
//         ",100%,50%,1);\
//                   animation: bang 700ms ease-out forwards;\
//                   opacity: 0";

//       var e = document.createElement("i");
//       e.style.cssText = styles.toString();
//       c.appendChild(e);
//     }
//     document.body.append(c);
//     // $(this).append(c);
//   });
// }

// hoverConfetti();

// async function translation() {
//   const url =
//     "https://google-translate1.p.rapidapi.com/language/translate/v2";
//   const options = {
//     method: "POST",
//     headers: {
//       "content-type": "application/x-www-form-urlencoded",
//       "Accept-Encoding": "application/gzip",
//       "X-RapidAPI-Key": "dfe9c37adfmsh370c8103505c689p1ed9a2jsnf5832dfb604e",
//       "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
//     },
//     body: new URLSearchParams({
//       q: event,
//       target: "fr",
//       source: "en",
//     }),
//   };

//   try {
//     const response = await fetch(url, options);
//     const result = await response.text();
//     console.log(result);
//     console.log(result[2]);
//     document.querySelector("#historicalFact").innerHTML = result;
//   } catch (error) {
//     console.error(error);
//   }
// }

// translation();
