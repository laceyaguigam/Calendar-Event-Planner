var HISTORY_KEY = "colors";
var months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "01", "02", "03", "04", "05", "06", "07", "08", "09"]
var searchEl = document.getElementById("search")
var inputEl = document.getElementById("input")
var ulEl = document.getElementById("history")
var monthInput = ""
var inputs = JSON.parse(localStorage.getItem(HISTORY_KEY)) ?? [];

var options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'b7e73c266amsha418824a9f705d8p16aecdjsn811a27cd84c5',
        'X-RapidAPI-Host': 'working-days.p.rapidapi.com'
    }
};

searchEl.addEventListener("click", function () {
    monthInput = inputEl.value
    var input = inputEl.value;
    if (input === "" || !months.includes(input)) {
        return;
    } else {
        inputEl.value = "";
    }

    inputs.push(input);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(inputs));
    renderSearchHistory()
    renderCalendar()
})

var renderSearchHistory = function () {
    ulEl.innerHTML = ""
    for (let i = 0; i < inputs.length; i += 1) {
        let input = inputs[i];
        let liEl = document.createElement("li");
        liEl.textContent = input;
        liEl.addEventListener("click", function () {
            console.log(i, input);
        });
        ulEl.appendChild(liEl);
    }
};

var getDaysOfMonth = function (date) {
    var currentDate = new Date(date);
    currentDate.setDate(0)
    return currentDate.getDate()
}

var renderTodaysInfo = function () {
    var dateSectionEl = document.querySelector(".todays-date")
    var dateEl = document.createElement("h2")
    var dayOfWeekSectionEl = document.querySelector(".todays-day-of-week")
    var dayOfWeekEl = document.createElement("h2")
    var eventSectionEl = document.querySelector(".todays-event")
    var eventEl = document.createElement("h2")

    dateEl.textContent = moment().format('YYYY-MM-DD')

    dayOfWeekEl.textContent = moment().format('dddd')

    fetch('https://working-days.p.rapidapi.com/get_info_day?country_code=US&date=' + moment().format('YYYY-MM-DD'), options)
        .then(response => response.json())
        .then((data) => {
            var yourVariableName = data.result.public_holiday_description;
            eventEl.innerHTML = yourVariableName;
        });

    eventSectionEl.appendChild(eventEl)
    dayOfWeekSectionEl.appendChild(dayOfWeekEl)
    dateSectionEl.appendChild(dateEl)
}

var renderCalendar = function () {
    var calendarEl = document.querySelector(".calendar")
    var child = calendarEl.lastElementChild
    while (child) {
        calendarEl.removeChild(child)
        child = calendarEl.lastElementChild
    }

    var currentDate = new Date()
    var daysInMonth = getDaysOfMonth(currentDate)

    if (!monthInput.length) {
        month = moment().set({ 'month': moment().format("M") - 1 })
    } else {
        month = moment().set({ 'month': monthInput - 1 })
    }

    for (let day = 1; day <= daysInMonth; day++) {
        let dayEl = document.createElement("section")
        dayEl.classList.add("day")
        let dayOfWeekEl = document.createElement("p")
        dayOfWeekEl.classList.add("day-of-week")
        let dateEl = document.createElement("p")
        dateEl.classList.add("date")
        let eventEl = document.createElement("p")
        eventEl.classList.add("event")

        if (day < 8) {
            dayOfWeekEl.textContent = month.startOf('month').add(day - 1, 'days').format('dddd')
        }

        dateEl.textContent = month.startOf('month').add(day - 1, 'days').format('YYYY-MM-DD')

        fetch('https://working-days.p.rapidapi.com/get_info_day?country_code=US&date=' + month.startOf('month').add(day - 1, 'days').format('YYYY-MM-DD'), options)
            .then(response => response.json())
            .then((data) => {
                var yourVariableName = data.result.public_holiday_description;
                eventEl.innerHTML = yourVariableName;
            });

        calendarEl.appendChild(dayEl)
        dayEl.appendChild(dayOfWeekEl)
        dayEl.appendChild(dateEl)
        dayEl.appendChild(eventEl)
    }
}

renderTodaysInfo();
renderSearchHistory();
renderCalendar();