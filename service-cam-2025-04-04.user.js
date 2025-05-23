// ==UserScript==
// @name         service-cam
// @namespace    http://tampermonkey.net/
// @version      2025-04-04
// @description  try to take over the world!
// @author       You
// @match        https://service-cam.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=chatgpt.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    window.addEventListener('load', () => {
        // Add upload button
        const uploadBtn = document.createElement('button');
        uploadBtn.textContent = 'Kunduppgifter';
        Object.assign(uploadBtn.style, {
            position: 'fixed',
            top: '100px',
            right: '200px',
            zIndex: 9999,
            padding: '10px',
            background: '#ffc107',
            color: 'black',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
        });

        document.body.appendChild(uploadBtn);

        // Hidden file input
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.csv';
        fileInput.style.display = 'none';
        document.body.appendChild(fileInput);

        uploadBtn.addEventListener('click', () => fileInput.click());


            fileInput.addEventListener('change', async () => {
            const file = fileInput.files[0];
            if (!file) return;

            const text = await file.text();
            const lines = text.trim().split('\n');
            const headers = lines[0].split(',').map(h => h.trim());
            const values = lines.slice(1).map(line => {
                return line.split(',').map(val => val.trim());
            });

            const firstRow = values[0];
            const data = Object.fromEntries(headers.map((h, i) => [h, firstRow[i]]));

            console.log("✅ First Row Data:", data);

            // Example: auto-fill a field if header is "first_name"
            const field = document.querySelector('[name="customer[details][first_name]"]');
            if (field && data.first_name) {
                field.value = data.first_name;
                field.dispatchEvent(new Event('input', { bubbles: true }));
            }

            // Fill last_name
            const lastNameField = document.querySelector('[name="customer[details][surname]"]');
            if (lastNameField && data.last_name) {
                lastNameField.value = data.last_name;
                lastNameField.dispatchEvent(new Event('input', { bubbles: true }));
            }
            // Fill email customer[details][email]
            const emailField = document.querySelector('[name="customer[details][email]"]');
            if (emailField && data.email) {
                emailField.value = data.email;
                emailField.dispatchEvent(new Event('input', { bubbles: true }));
            }
            // Fill mobil customer[details][mobile]
            const mobilField = document.querySelector('[name="customer[details][mobile]"]');
            if (mobilField && data.mobil) {
                mobilField.value = data.mobil;
                mobilField.dispatchEvent(new Event('input', { bubbles: true }));
            }

            // Fill arbetsorder details[job_number]
            const arbetsorderField = document.querySelector('[name="details[job_number]"]');
            if (arbetsorderField && data.arbetsorder) {
                arbetsorderField.value = data.arbetsorder;
                arbetsorderField.dispatchEvent(new Event('input', { bubbles: true }));
            }

            //details[vehicle_reg]
            const regnrField = document.querySelector('[name="details[vehicle_reg]"]');
            if (regnrField && data.regnr) {
                regnrField.value = data.regnr;
                regnrField.dispatchEvent(new Event('input', { bubbles: true }));
            }
        });
    });
})();
