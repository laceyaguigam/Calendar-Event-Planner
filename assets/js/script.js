var HISTORY_KEY = "colors";
var states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']
var searchEl = document.getElementById("search")
var inputEl = document.getElementById("input")
var ulEl = document.getElementById("history")

var inputs = JSON.parse(localStorage.getItem(HISTORY_KEY)) ?? [];

searchEl.addEventListener("click", function () {
    var input = inputEl.value;
    console.log(input)
    if (input === "" || !states.includes(input)) {
        return;
    } else {
        inputEl.value = "";
    }
    inputs.push(input);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(inputs));
    renderSearchHistory()
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

renderSearchHistory();