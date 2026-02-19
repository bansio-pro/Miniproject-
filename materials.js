let materials = [
    { name: "Cement", basePrice: 400, price: 400, rating: 4.5, stock: true },
    { name: "PPC Cement", basePrice: 370, price: 370, rating: 4.3, stock: true },
    { name: "Sand", basePrice: 1700, price: 1700, rating: 4.2, stock: false },
    { name: "M-Sand", basePrice: 1400, price: 1400, rating: 4.4, stock: true },
    { name: "Steel", basePrice: 60, price: 60, rating: 4.3, stock: true }
];

function updatePrices() {
    materials.forEach(mat => {
        let demandFactor = Math.random() * 0.1; // up to 10%
        mat.price = Math.round(mat.basePrice + (mat.basePrice * demandFactor));
    });
}

const materialList = document.getElementById("materialList");
const budgetInput = document.getElementById("budget");

function displayMaterials() {
    materialList.innerHTML = "";

    const budget = budgetInput.value;

    materials.forEach(mat => {
        const card = document.createElement("div");
        card.className = "material-card";

        let message = "";
        let alternative = findAlternative(mat, budget);

        if (!mat.stock) {
            message = `<p class="out-stock">Out of stock</p>`;
        } else if (budget && mat.price > budget && alternative) {
            message = `<p style="color:orange">
                Too expensive. Suggested alternative: <b>${alternative.name}</b> (₹${alternative.price})
            </p>`;
        }

        card.innerHTML = `
            <h3>${mat.name}</h3>
            <p>Price: ₹${mat.price}</p>
            <p>Rating: ⭐ ${mat.rating}</p>
            ${message}
            ${mat.stock ? `<button onclick="orderMaterial('${mat.name}')">Order</button>` : ""}
        `;

        materialList.appendChild(card);
    });
}

function findAlternative(material, budget) {
    return materials.find(m =>
        m.name !== material.name &&
        m.stock &&
        (!budget || m.price <= budget)
    );
}

function orderMaterial(name) {
    alert(name + " added to cart!");
}

budgetInput.addEventListener("input", displayMaterials);

// Initial load
displayMaterials();

