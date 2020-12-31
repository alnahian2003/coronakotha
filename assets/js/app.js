/*!
 * Corona Kotha v1.5 (https://github.com/coronakotha)
 * Copyright 2020 Abdullah Al Nahian
 * Developed by Abdullah Al Nahian
 * All Rights Reserved
 */

/*!
 * Get In Touch:
 * https://alnahian.xyz
 * https://github.com/alnahian2003
 * https://facebook.com/alnahian2003
 * https://twitter.com/alnahian2003
 * https://behance.net/alnahian2003
 * mail me at: a.alnahian2003@gmail.com
 
 */

$(document).ready(function () {

  // Search Box Functions

  // Search Box0 Functions
  $("#table0Input").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#table0 tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });

  // Search Button0 Function

  $("#searchBtn0").on("click", function () {
    $("#table0InputFormField").toggle("fast");
  });

  // Search Box1 Functions
  $("#table1Input").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#table1 tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });

  // Search Button1 Function

  $("#searchBtn1").on("click", function () {
    $("#table1InputFormField").toggle("fast");
  });

  // Search Box2 Functions
  $("#table2Input").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#table2 tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });

  // Search Button2 Function

  $("#searchBtn2").on("click", function () {
    $("#table2InputFormField").toggle("fast");
  });

  // Search Box3 Functions
  $("#table3Input").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#table3 tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });

  // Search Button3 Function

  $("#searchBtn3").on("click", function () {
    $("#table3InputFormField").toggle("fast");
  });

  // Search Box4 Functions
  $("#table4Input").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#table4 tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });

  // Search Button4 Function

  $("#searchBtn4").on("click", function () {
    $("#table4InputFormField").toggle("fast");
  });

  // Search Box5 Functions
  $("#table5Input").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#table5 tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });

  // Search Button5 Function

  $("#searchBtn5").on("click", function () {
    $("#table5InputFormField").toggle("fast");
  });

  // End of Search Box0 Functions

  // API Integration
  var url = "https://api.covid19api.com/summary";

  $.get(url, function (data) {
    console.log(data);

    // Remove Preloader After All API Data Loades
    document.querySelector(".preloader").classList.add("opacity-0");
    setTimeout(function () {
      document.querySelector(".preloader").style.display = "none";
    }, 1000);

    // console.log (data["Countries"].length);

    // variables of global data for at a glance cards
    var sumTotalCases, sumNewCases, sumTotalRecov, sumTotalDeath;

    // At A Glance Section Live Data. sum is stand for Summary.
    sumTotalCases = Number(data.Global.TotalConfirmed).toLocaleString();
    sumTotalRecov = Number(data.Global.TotalRecovered).toLocaleString();
    sumNewCases = Number(data.Global.NewConfirmed).toLocaleString();
    sumTotalDeath = Number(data.Global.TotalDeaths).toLocaleString();

    $("#sumTotalCases").html(sumTotalCases + "+");
    $("#sumTotalRecov").html(sumTotalRecov + "+");
    $("#sumNewCases").html(sumNewCases + "+");
    $("#sumTotalDeath").html(sumTotalDeath + "+");
    // End of At A Glance Section

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
    for (var i = 0; i < (data["Countries"].length); i++) {

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
      const flagUrl = "<img src =" + "\"https://www.countryflags.io/" + (data["Countries"][i]["CountryCode"] + "/shiny/16.png\">") + " ";

      // Country Names

      // ###New Case Tables
      newCasesTable.rows[i].cells[0].innerHTML = flagUrl + data["Countries"][i]["Country"];
      // Country Data
      var nCdata = data["Countries"][i]["NewConfirmed"];
      newCasesTable.rows[i].cells[1].innerHTML = nCdata.toLocaleString() + "+";

      // ###New Recovered Table
      newRecoveredTable.rows[i].cells[0].innerHTML = flagUrl + data["Countries"][i]["Country"];
      // Country Data
      var nRdata = data["Countries"][i]["NewRecovered"];
      newRecoveredTable.rows[i].cells[1].innerHTML = nRdata.toLocaleString() + "+";

      // ###New Death Table
      newDeathTable.rows[i].cells[0].innerHTML = flagUrl + data["Countries"][i]["Country"];
      // Country Data
      var nDdata = data["Countries"][i]["NewDeaths"];
      newDeathTable.rows[i].cells[1].innerHTML = nDdata.toLocaleString() + "+";

      // ###Total Cases Table
      totalCasesTable.rows[i].cells[0].innerHTML = flagUrl + data["Countries"][i]["Country"];
      // Country Data
      var tCdata = data["Countries"][i]["TotalConfirmed"];
      totalCasesTable.rows[i].cells[1].innerHTML = tCdata.toLocaleString() + "+";

      // ###Total Recovered Table
      totalRecoveredTable.rows[i].cells[0].innerHTML = flagUrl + data["Countries"][i]["Country"];
      // Country Data
      var tRdata = data["Countries"][i]["TotalRecovered"];
      totalRecoveredTable.rows[i].cells[1].innerHTML = tRdata.toLocaleString() + "+";

      // ###Total Deaths Table
      totalDeathTable.rows[i].cells[0].innerHTML = flagUrl + data["Countries"][i]["Country"];
      // Country Data
      var tDdata = data["Countries"][i]["TotalDeaths"];
      totalDeathTable.rows[i].cells[1].innerHTML = tDdata.toLocaleString() + "+";
    }
    // Last Update Time Function
    var lastUpdate = data.Date;
    $("#lastUpdate").html("Last Update: " + lastUpdate);

    // Main Chart Functions

    // Variables for chart data from API
    var NewConfirmed = data.Global.NewConfirmed;
    var NewDeaths = data.Global.NewDeaths;
    var NewRecovered = data.Global.NewRecovered;
    var TotalConfirmed = data.Global.TotalConfirmed;
    var TotalDeaths = data.Global.TotalDeaths;
    var TotalRecovered = data.Global.TotalRecovered;

    var ctx = document.getElementById("mainChart").getContext("2d");
    var chart = new Chart(ctx, {
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
        datasets: [{
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
        }, ],
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
            },
          }, ],
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