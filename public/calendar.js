document.addEventListener('DOMContentLoaded', () => {
    const convertButton = document.getElementById('convert-button');
    const indianYearInput = document.getElementById('indian-year');
    const indianMonthSelect = document.getElementById('indian-month');
    const indianDayInput = document.getElementById('indian-day');
    const gregorianResultDiv = document.getElementById('gregorian-result');
    const dayHelperSpan = document.querySelector('.day-helper');

    // Update the maximum day based on the selected month
    indianMonthSelect.addEventListener('change', () => {
        const selectedMonth = parseInt(indianMonthSelect.value);
        let maxDays = 30; // Default
        if ([1, 2, 3, 4, 5, 6].includes(selectedMonth)) {
            maxDays = 30; // Assuming a common pattern, adjust based on actual Panchang rules
        } else if ([7, 8, 9, 10, 11, 12].includes(selectedMonth)) {
            maxDays = 30; // Assuming a common pattern, adjust based on actual Panchang rules
        }
        indianDayInput.max = maxDays;
        dayHelperSpan.textContent = `(Max: ${maxDays})`;
        if (parseInt(indianDayInput.value) > maxDays) {
            indianDayInput.value = maxDays;
        }
    });

    convertButton.addEventListener('click', () => {
        const year = parseInt(indianYearInput.value);
        const month = parseInt(indianMonthSelect.value);
        const day = parseInt(indianDayInput.value);

        const gregorianDate = convertIndianToGregorian(day, month, year);

        if (gregorianDate) {
            gregorianResultDiv.textContent = `Gregorian Date: ${gregorianDate.toLocaleDateString()}`;
        } else {
            gregorianResultDiv.textContent = "Conversion failed. Please check the input.";
        }
    });

    function convertIndianToGregorian(day, month, year) {
        try {
            // Use the provided conversion logic
            const gregorianDate = Calculate(day, month, year);
            return gregorianDate;

        } catch (error) {
            console.error("Conversion error:", error);
            return null;
        }
    }

    function Calculate(day, month, year) {
        var mon = Number(month);
        var y = year + 78;
        var fd = getFixed(getFirstDay(y));
        var dd = 0;
        for (var i = 1; i < mon; ++i) {
            if (i < 7 && (i != 1 || isLeap(y))) {
                dd += 31;
            } else {
                dd += 30;
            }
        }
        fd += dd + day - 1;
        return getGregorian(fd);
    }

    function isLeap(y) {
        var d = new Date(y, 1, 29);
        if (y < 100) {
            d.setFullYear(y);
        }
        return d.getDate() == 29;
    }

    function getFirstDay(y) {
        var d = new Date(y, 2, isLeap(y) ? 21 : 22);
        return d;
    }

    function getFixed(d) {
        return calculateFixed(d); // Replace with your Planetcalc equivalent
    }

    function getGregorian(f) {
        return calculateGregorian(f); // Replace with your Planetcalc equivalent
    }

    // Dummy functions to simulate Planetcalc's fixed date calculations.
    // Replace these with your actual Planetcalc implementations or alternatives.

    function calculateFixed(date) {
      // Very basic simulation, replace with real logic
      return Math.floor(date.getTime() / (1000 * 60 * 60 * 24)) + 719528;
    }

    function calculateGregorian(fixed) {
      // Very basic simulation, replace with real logic
      return new Date((fixed - 719528) * (1000 * 60 * 60 * 24));
    }
});