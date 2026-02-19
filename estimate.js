function calculate() {
    const length = document.getElementById("length").value;
    const width = document.getElementById("width").value;
    const type = document.getElementById("type").value;

    if (!length || !width) {
        alert("Please enter all values");
        return;
    }

    const area = length * width;

    // Simple AI logic (rule-based)
    let cement, sand;

    if (type === "normal") {
        cement = area * 0.4; // bags
        sand = area * 0.03;  // loads
    } else {
        cement = area * 0.5;
        sand = area * 0.04;
    }

    document.getElementById("result").innerHTML = `
        <h3>Estimated Materials</h3>
        <p>Cement: ${cement.toFixed(1)} bags</p>
        <p>Sand: ${sand.toFixed(2)} loads</p>
        <p><i>Estimation based on construction rules</i></p>
    `;
}
