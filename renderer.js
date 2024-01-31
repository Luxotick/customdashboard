function onload() {
    const socket = new WebSocket("ws://localhost:8080");

    socket.addEventListener("open", (event) => {
        let div = document.createElement("div");
        div.textContent = `NetworkTables Not Connected`;
        div.classList.add('divler');
        div.classList.add('viewport-header');
    });


    socket.addEventListener("message", (event) => {
        try {
            const data = JSON.parse(event.data);
            const networkTables = document.getElementById("NetworkTables")
            if (data.networkTables === "Not Connected") {
                networkTables.textContent = "NetworkTables Not Connected"; //or there is no data to display on table: /Besiktas
                networkTables.classList.add('fade-in');
            } else if (data.networkTables === "Connected") {
                networkTables.textContent = "NetworkTables Connected";
                networkTables.classList.remove('fade-in');
            }
            if (data.hasOwnProperty("key")) {
                if (document.getElementById(data.key)) {
                    document.getElementById(data.key).textContent = `${data.key.split("/Besiktas/")[1]}\n Value: ${data.value}`;
                } else {
                    let div = document.createElement("div");
                    div.textContent = `${data.key.split("/Besiktas/")[1]}\n Value: ${data.value}`;
                    div.classList.add('divler');
                    div.id = data.key;
                    document.getElementById("gridcontainer").appendChild(div)
                }
            }
        } catch (error) {}
    });
}