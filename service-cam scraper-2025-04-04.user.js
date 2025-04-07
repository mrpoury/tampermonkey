// ==UserScript==
// @name         service-cam scraper
// @namespace    http://tampermonkey.net/
// @version      2025-04-04
// @description  try to take over the world!
// @author       You
// @match        https://service-cam.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=chatgpt.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function downloadCSV(rows, filename = "data.csv") {
        const csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

//     function scrapePage() {
//         const data = [];
//         const items = document.querySelectorAll(".vv-views-contents"); // Adjust to your HTML
//         data.push(["vehicle-id","surname", "first-name"]); // Header row

//         items.forEach(item => {
//             const title = item.querySelector(".surname")?.innerText.trim() || "";
//             const price = item.querySelector(".first-name")?.innerText.trim() || "";
//             const vehicle_id = item.querySelector(".vehicle-id")?.innerText.trim() || "";
//             data.push([vehicle_id,title, price]);
//         });

//         downloadCSV(data);
//     }

    function scrapePage() {
        const data = [];
        data.push(["arbetsorder", "efternamn", "namn", "email"]); // Header row

        const container = document.querySelector(".vv-views-contents");
        if (!container) {
            alert("Container .vv-views-contents not found!");
            return;
        }

        const rows = container.querySelectorAll(".views-row");
        rows.forEach(row => {
            const vehicleId = row.querySelector(".vehicle-id .value")?.innerText.trim() || "";
            const surname = row.querySelector(".surname .value")?.innerText.trim() || "";
            const firstName = row.querySelector(".first-name .value")?.innerText.trim() || "";
            const email = row.querySelector(".email .value")?.innerText.trim() || "";
            data.push([vehicleId, surname, firstName, email]);
        });

        if (data.length <= 1) {
            alert("No data found in rows.");
            return;
        }

        downloadCSV(data);
    }


    // Add a button to run the scrape
    const btn = document.createElement("button");
    btn.innerText = "Ladda ner kunduppgifter";
    btn.style.position = "fixed";
    btn.style.top = "10px";
    btn.style.right = "10px";
    btn.style.zIndex = "9999";
    btn.style.padding = "10px";
    btn.style.background = "#33667C";
    btn.style.color = "#FFF";
    btn.style.border = "none";
    btn.style.cursor = "pointer";

    btn.onclick = scrapePage;
    document.body.appendChild(btn);
})();
