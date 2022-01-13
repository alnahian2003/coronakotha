/*!
 * Corona Kotha v1.5 (https://github.com/coronakotha)
 * Copyright 2020 Abdullah Al Nahian
 * Developed by Abdullah Al Nahian
 * All Rights Reserved
 */

/*!
 * Get In Touch:
 * https://alnahian2003.github.io
 * https://github.com/alnahian2003
 * https://facebook.com/alnahian2003
 * https://twitter.com/alnahian2003
 * https://behance.net/alnahian2003
 * mail me at: a.alnahian2003@gmail.com
 
 */

$(document).ready(function () {
  // Search Box Function
  function searchBoxFilter(tableInputId, tableTr) {
    $(tableInputId).on("keyup", function () {
      var value = $(this).val().toLowerCase();
      $(tableTr).filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      });
    });
  }

  // Search Button Function
  function searchBtnFunc(searchBtnId, tableInputFieldId) {
    $(searchBtnId).on("click", function () {
      $(tableInputFieldId).toggle("fast");
    });
  }

  // Automate the functions for all the Search Boxes and Buttons
  for (let i = 0; i <= 5; i++) {
    searchBoxFilter(`#table${i}Input`, `#table${i} tr`);
    searchBtnFunc(`#searchBtn${i}`, `#table${i}InputFormField`);
  }

  // End of Search Box Functions

  // API Integration
  var url = "https://api.covid19api.com/summary";

  $.get(url, function (data) {
    console.log(data);

    // Remove Preloader After All API Data Loaded Successfully
    document.querySelector(".preloader").classList.add("opacity-0");
    setTimeout(function () {
      document.querySelector(".preloader").style.display = "none";
    }, 1000);

    // variables of global data for at a glance cards
    var sumTotalCases, sumNewCases, sumTotalRecov, sumTotalDeath;

    // At A Glance Section Live Data. sum is stand for Summary.
    sumTotalCases = Number(data.Global.TotalConfirmed).toLocaleString();
    sumTotalRecov = Number(data.Global.TotalRecovered).toLocaleString();
    sumNewCases = Number(data.Global.NewConfirmed).toLocaleString();
    sumTotalDeath = Number(data.Global.TotalDeaths).toLocaleString();

    $("#sumTotalCases").text(sumTotalCases + "+");
    $("#sumTotalRecov").text(sumTotalRecov + "+");
    $("#sumNewCases").text(sumNewCases + "+");
    $("#sumTotalDeath").text(sumTotalDeath + "+");
    // End of At A Glance Section {changed .html() to simply .text()}

    // Table 0
    var newCasesTable = document.getElementById("table0");

    // Table 1
    var newRecoveredTable = document.getElementById("table1");

    // Table 2
    var newDeathTable = document.getElementById("table5");

    // Table 3
    var totalCasesTable = document.getElementById("table3");

    // Table 4
    var totalRecoveredTable = document.getElementById("table4");

    // Table 5
    var totalDeathTable = document.getElementById("table2");

    // Countries Data from API

    /*
     * Tc stands for TotalConfirmed
     * Nc stands for NewConfirmed
     * Tr stands for TotalRecovered
     * Nr stands for NewRecovered
     * Td stands for TotalDeaths
     * Nd stands for NewDeaths
     */

    // Get Countries Name and Value Using For Loop
    for (var i = 0; i < data["Countries"].length; i++) {
      // Insert a New Row in New Case Table
      var nC = newCasesTable.insertRow();
      nC.insertCell(0);
      nC.insertCell(1);

      // Insert a New Row in New Recovered Table
      var nR = newRecoveredTable.insertRow();
      nR.insertCell(0);
      nR.insertCell(1);

      // Insert a New Row in New Deaths Table
      var nD = newDeathTable.insertRow();
      nD.insertCell(0);
      nD.insertCell(1);

      // Insert a New Row in Total Cases Table
      var tC = totalCasesTable.insertRow();
      tC.insertCell(0);
      tC.insertCell(1);

      // Insert a New Row in Total Recovered Table
      var tR = totalRecoveredTable.insertRow();
      tR.insertCell(0);
      tR.insertCell(1);

      // Insert a New Row in Total Death Table
      var tD = totalDeathTable.insertRow();
      tD.insertCell(0);
      tD.insertCell(1);

      // Country Flags URL
      let countrySlug = data["Countries"][i]["CountryCode"].toLowerCase();

      const flagUrl = `<img
  src="https://flagcdn.com/w20/${countrySlug}.png" alt="${countrySlug}"> `;

      // Country Names
      let countryNames = data["Countries"][i]["Country"];

      // ###New Case Tables
      newCasesTable.rows[i].cells[0].innerHTML = flagUrl + countryNames;
      // Country Data
      var nCdata = data["Countries"][i]["NewConfirmed"];
      newCasesTable.rows[i].cells[1].innerHTML = nCdata.toLocaleString() + "+";

      // ###New Recovered Table
      newRecoveredTable.rows[i].cells[0].innerHTML = flagUrl + countryNames;
      // Country Data
      var nRdata = data["Countries"][i]["NewRecovered"];
      newRecoveredTable.rows[i].cells[1].innerHTML =
        nRdata.toLocaleString() + "+";

      // ###New Death Table
      newDeathTable.rows[i].cells[0].innerHTML = flagUrl + countryNames;
      // Country Data
      var nDdata = data["Countries"][i]["NewDeaths"];
      newDeathTable.rows[i].cells[1].innerHTML = nDdata.toLocaleString() + "+";

      // ###Total Cases Table
      totalCasesTable.rows[i].cells[0].innerHTML = flagUrl + countryNames;
      // Country Data
      var tCdata = data["Countries"][i]["TotalConfirmed"];
      totalCasesTable.rows[i].cells[1].innerHTML =
        tCdata.toLocaleString() + "+";

      // ###Total Recovered Table
      totalRecoveredTable.rows[i].cells[0].innerHTML = flagUrl + countryNames;
      // Country Data
      var tRdata = data["Countries"][i]["TotalRecovered"];
      totalRecoveredTable.rows[i].cells[1].innerHTML =
        tRdata.toLocaleString() + "+";

      // ###Total Deaths Table
      totalDeathTable.rows[i].cells[0].innerHTML = flagUrl + countryNames;
      // Country Data
      var tDdata = data["Countries"][i]["TotalDeaths"];
      totalDeathTable.rows[i].cells[1].innerHTML =
        tDdata.toLocaleString() + "+";
    }
    // Last Update Time
    var lastUpdate = data.Date;
    let formattedTime = new Date(lastUpdate);
    $("#lastUpdate").html(
      `<b>Last Update</b> <br>
      <b>Time:</b> ${
        formattedTime.getUTCHours() % 12
      }:${formattedTime.getUTCMinutes()} | 
      <b>Date:</b> ${formattedTime.getDate()}/${
        formattedTime.getMonth() + 1
      }/${formattedTime.getFullYear()}`
    );

    // Main Chart Functions

    // Variables for chart data from API
    var NewConfirmed = data.Global.NewConfirmed;
    var NewDeaths = data.Global.NewDeaths;
    var NewRecovered = data.Global.NewRecovered;
    var TotalConfirmed = data.Global.TotalConfirmed;
    var TotalDeaths = data.Global.TotalDeaths;
    var TotalRecovered = data.Global.TotalRecovered;

    var ctx = document.getElementById("mainChart").getContext("2d");
    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "New Confirmed",
          "New Deaths",
          "New Recovered",
          "Total Confirmed",
          "Total Deaths",
          "Total Recovered",
        ],
        datasets: [
          {
            label: "Cases",
            data: [
              NewConfirmed,
              NewDeaths,
              NewRecovered,
              TotalConfirmed,
              TotalDeaths,
              TotalRecovered,
            ],
            backgroundColor: [
              "rgba(47, 172, 255, 0)",
              "rgba(73, 79, 86, 0)",
              "rgba(0, 191, 108,0)",
              "rgba(141, 71, 254, 0)",
              "rgba(255, 78, 159, 0)",
              "rgba(255, 55, 24, 0)",
            ],
            borderColor: [
              "rgba(255, 55, 24, 1)",
              "rgba(73, 79, 86, 1)",
              "rgba(0, 191, 108,1)",
              "rgba(141, 71, 254, 1)",
              "rgba(255, 55, 24, 1)",
              "rgba(255, 78, 159, 1)",
            ],
            borderWidth: 3,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
        maintainAspectRatio: false,
      },
      options: {
        title: {
          display: true,
          text: "Latest Update (WorldWide)",
          fontSize: 25,
        },
      },
    });
  });
});
