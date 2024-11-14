function registerUser() {
    const name = document.getElementById("name").value;
    const lastname = document.getElementById("lastname").value;
    const dni = document.getElementById("dni").value;
    if (name && lastname && dni) {
        document.getElementById("user-rooms").style.display = "block";
        loadRooms();
    } else {
        alert("Por favor, completa todos los campos.");
    }
}

function loadRooms() {
    fetch('/api/rooms')
        .then(response => response.json())
        .then(data => {
            const roomList = document.getElementById("room-list");
            roomList.innerHTML = data.map(room => `
                <div>
                    <h3>${room.name}</h3>
                    <p>Precio: ${room.price}</p>
                    <p>Disponibilidad: ${room.available ? "Sí" : "No"}</p>
                </div>
            `).join('');
        });
}

function reserveRoom() {
    const dni = document.getElementById("dni").value;
    fetch('/api/reserve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dni })
    }).then(() => alert("Reserva realizada con éxito"));
}
