const API = "http://172.17.40.7:8080";

const errors = {
    461: "Usuario o contrasenya incorrectos",
    462: "Already reserved in this dates"
}

const closeModal = () => {
    document.getElementById("rentRoom").innerHTML = "";
}

const rent = ($event) => {
    const roomId = event.target.dataset.id;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    const values = {
      auth: {
        email: email,
        password: password
      },
      roomId: roomId,
      startDate: startDate,
      endDate: endDate
    }
    fetch(API+"/room/addReservation", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((res) => {
        if(res.ok==false) {
          document.getElementById("error").innerHTML = errors[res.status];
          throw new Error("Error");
        }
        return res.json();
  
      })
      .then((json) => {
        console.log(json)
        closeModal();
        alert("Reserva correcta");
      })
  }

const rentRoom = ($event) => {
    const carId = event.target.dataset.id
    const rentRoomDiv = document.getElementById("rentRoom");
    rentRoomDiv.innerHTML = `
      <div class="rentRoom">
        <div class="mid">
          <img onClick="closeModal()" src="https://img.icons8.com/ios7/600/delete-sign.png" class="close" width="40px">
          <div class="fields">
            <div class="field">
              <label>Email</label>
              <input id="email" type="text"/>
            </div>
          <div class="field">
            <label for="password">Contraseña</label>
            <input type="password" id="password" name="password" />
          </div>
            <div class="field">
              <label>Start Date</label>
              <input type="date" id="startDate" value="2025-04-25">
            </div>
            <div class="field">
              <label>End Date</label>
              <input type="date" id="endDate" value="2025-04-25">
            </div>
            <button onClick="rent()" data-id="${carId}">Reservar</button>
            <a href="./../html/register.html">Crear cuenta</a>
            <div id="error"></div>
          </div>
        </div>
      </div>
    `
}

function mostrarHabitaciones() {
    const container = document.querySelector(".row");
    const url = "http://172.17.40.7:8080/room/listRooms";

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("No se pudo cargar el archivo JSON");
            }
            return response.json();
        })
        .then(habitaciones => {
            habitaciones.forEach(room => {
                container.innerHTML += `
                    <div class="room col-lg-10">
                        <div class="roomImg">
                            <img src="${room.photoUrl}">
                        </div>
                        <div class="roomInfo">
                            <h3>${room.name}</h3>
                            <p>${room.description}</p>
                            <p>Precio: ${room.priceNight}€</p>
                            <div class="button">
                            <button onClick="rentRoom()" data-id="${room.roomId}" >Reservar</button>
                            </div>
                        </div>
                    </div>
                `;
            });
        })
        .catch(error => {
            console.error("Error:", error.message);
        });
}

window.onload = mostrarHabitaciones;