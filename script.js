const display = document.getElementById("display");

/* Add value to display */
function appendValue(value) {
    const lastChar = display.value.slice(-1);
    const operators = ["+", "-", "*", "/", "%"];

    // Prevent starting with invalid operators
    if (display.value === "" && ["+", "*", "/"].includes(value)) return;

    // Prevent double operators
    if (operators.includes(value) && operators.includes(lastChar)) return;

    // Prevent multiple decimals in one number
    if (value === ".") {
        const parts = display.value.split(/[\+\-\*\/%]/);
        if (parts[parts.length - 1].includes(".")) return;
    }

    display.value += value;
}

/* Clear display */
function clearDisplay() {
    display.value = "";
}

/* Remove last character */
function backspace() {
    display.value = display.value.slice(0, -1);
}

/* Calculate result */
function calculate() {
    try {
        const expression = display.value;
        const result = eval(expression);
        const finalResult = Number.isInteger(result) ? result : result.toFixed(2);

        display.value = finalResult;
        saveHistory(`${expression} = ${finalResult}`);
    } catch {
        display.value = "Error";
    }
}


/* Keyboard support */
document.addEventListener("keydown", (e) => {
    if (!isNaN(e.key) || ["+", "-", "*", "/", ".", "%"].includes(e.key)) {
        appendValue(e.key);
    }

    if (e.key === "Enter") calculate();
    if (e.key === "Backspace") backspace();
    if (e.key === "Escape") clearDisplay();
});

const toggle = document.getElementById("themeToggle");

toggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
    toggle.textContent = document.body.classList.contains("light") ? "☀️" : "🌙";
});

function saveHistory(entry) {
    let history = JSON.parse(localStorage.getItem("calcHistory")) || [];
    history.unshift(entry);
    localStorage.setItem("calcHistory", JSON.stringify(history));
    renderHistory();
}

function renderHistory() {
    const list = document.getElementById("historyList");
    list.innerHTML = "";

    const history = JSON.parse(localStorage.getItem("calcHistory")) || [];
    history.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        list.appendChild(li);
    });
}

renderHistory();

