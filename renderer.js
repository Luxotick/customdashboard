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
            if(data.networkTables === "Not Connected") {
                const networkTables = document.getElementById("NetworkTables")
                networkTables.textContent = "NetworkTables Not Connected"; //or there is no data to display on table: /Besiktas
                networkTables.classList.add('fade-in');
            } else if(data.networkTables === "Connected") {
                const networkTables = document.getElementById("NetworkTables")
                networkTables.textContent = "NetworkTables Connected";
                networkTables.classList.remove('fade-in');
            }
            if (data.hasOwnProperty("key")) {
                if(document.getElementById(data.key)) {
                    document.getElementById(data.key).textContent = `${data.key}, Value: ${data.value}`;
                } else {
                const key = data.key;
                const value = data.value;
                let div = document.createElement("div");
                div.textContent = `${data.key}, Value: ${data.value}`;
                div.classList.add('divler');
                div.id = data.key;
                document.body.appendChild(div);
                }
            }
        } catch (error) {
        }
    });
}
