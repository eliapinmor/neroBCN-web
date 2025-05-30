const API = "http://172.17.40.7:8080";

const loadCars = () => {
  const div = document.getElementById("cars");
  div.innerHTML = "";
  fetch(API+"/car/listCars")
    
    .then((res) => {
      if(res.ok==false) throw new Error("Error");
      return res.json();
    })
    .then((data) => {
      const dataMostrar = data.slice(0, );
      dataMostrar.forEach((car) => {
        // console.log(car)
        div.innerHTML += `
          <div class="car col-3 room-card">
            <img src="${car.photoUrl}" alt="coche img" width="100%">
            <div class="room-info">

              <p class="car-title">${car.brand} ${car.model}</p>
              <p>Color: ${car.color}</p>
              <p>Max Speed: ${car.maxSpeed}</p>
              <p>Motor: ${car.motor}</p>
              <p>Power: ${car.power}</p>
              <p>Price: ${car.price}€</p>
            
            <div class="button">
              <button onClick="rentCar()" data-id="${car.carId}" >Rent</button>
            </div>
          </div>
        `
      })
        
    })
    .catch((err) => {
      console.error(err);
    })
}

loadCars();

const errors = {
  461: "Usuario o contrasenya incorrectos",
  462: "Already reserved in this dates"
}

const rent = ($event) => {
  const carId = event.target.dataset.id;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const values = {
    auth: {
      email: email,
      password: password
    },
    carId: carId,
    startDate: startDate,
    endDate: endDate
  }
  fetch(API+"/car/addReservation", {
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

const rentCar = ($event) => {
  const carId = event.target.dataset.id
  const rentCarDiv = document.getElementById("rentCar");
  rentCarDiv.innerHTML = `
    <div class="rentCar">
      <div class="mid">
        <img onClick="closeModal()" src="https://img.icons8.com/ios7/600/delete-sign.png" class="close" width="40px">
        <div class="fields">
          <div class="field">
            <label>Email</label>
            <input id="email" type="text"/>
          </div>
          <div class="field">
            <label>Contrasenya</label>
            <input id="password" type="text"/>
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

const closeModal = () => {
  document.getElementById("rentCar").innerHTML = "";
}