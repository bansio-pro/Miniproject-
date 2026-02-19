const orders = [
    { material: "Cement", status: "Not Dispatched", location: "Warehouse" },
    { material: "Sand", status: "Dispatched", location: "Warehouse" }
];

const route = [
    "Warehouse",
    "Supplier Hub",
    "Main Road",
    "Near Construction Site",
    "Delivered"
];

const orderList = document.getElementById("orderList");

orders.forEach((order, index) => {
    const div = document.createElement("div");
    div.className = "order-card";

    div.innerHTML = `
        <h3>${order.material}</h3>
        <p class="status">Status: ${order.status}</p>
        <p><b>Current Location:</b> <span id="loc-${index}">${order.location}</span></p>
        ${
            order.status === "Not Dispatched"
            ? `<button class="cancel-btn" onclick="cancelOrder(${index})">Cancel Order</button>`
            : ""
        }
    `;

    orderList.appendChild(div);

    if (order.status === "Dispatched") {
        simulateTracking(index);
    }
});

function simulateTracking(index) {
    let step = 0;
    const interval = setInterval(() => {
        document.getElementById(`loc-${index}`).innerText = route[step];
        step++;

        if (step === route.length) {
            clearInterval(interval);
        }
    }, 3000);
}

function cancelOrder(index) {
    alert("Order cancelled successfully!");
}
const locationDiv = document.getElementById("location");

// Fetch GPS data from backend
function fetchGPS() {
    fetch("http://localhost:5000/api/gps")
        .then(response => response.json())
        .then(data => {
            if (data.latitude && data.longitude) {
                locationDiv.innerHTML = `
                    <h3>Truck Location</h3>
                    <p>Latitude: ${data.latitude}</p>
                    <p>Longitude: ${data.longitude}</p>
                    <p>Last Updated: ${new Date(data.timestamp).toLocaleString()}</p>
                `;
            } else {
                locationDiv.innerHTML = "Waiting for driver location...";
            }
        })
        .catch(error => {
            console.error("Error fetching GPS:", error);
            locationDiv.innerHTML = "Unable to fetch location";
        });
}

// Refresh every 5 seconds
setInterval(fetchGPS, 5000);

// Initial load
fetchGPS();
