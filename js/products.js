let cat = localStorage.getItem("catID");
if (cat == null) {
  cat = 101;
}

const contenedor = document.getElementById("pro-list-cont");
let sortAscRadio = document.getElementById("sortAsc");
let sortDescRadio = document.getElementById("sortDesc");
let sortByCountRadio = document.getElementById("sortByCount");
let rangeFilterMinInput = document.getElementById("rangeFilterCountMin");
let rangeFilterMaxInput = document.getElementById("rangeFilterCountMax");
let rangeFilterButton = document.getElementById("rangeFilterCount");
let clearFilterButton = document.getElementById("clearRangeFilter");
// Selectores para filtros pantallas pequeñas
let sortAscRadioSmall = document.getElementById("sortAscSmall");
let sortDescRadioSmall = document.getElementById("sortDescSmall");
let sortByCountRadioSmall = document.getElementById("sortByCountSmall");
let rangeFilterMinInputSmall = document.getElementById(
  "rangeFilterCountMinSmall"
);
let rangeFilterMaxInputSmall = document.getElementById(
  "rangeFilterCountMaxSmall"
);
let rangeFilterButtonSmall = document.getElementById("rangeFilterCountSmall");
let clearFilterButtonSmall = document.getElementById("clearRangeFilterSmall");

let dataArray = []; // Variable para almacenar los datos

// Función para mostrar los autos
function showData(array) {
  contenedor.innerHTML = ""; // Limpiar contenedor antes de mostrar los datos

  if (Array.isArray(array)) {
    for (const item of array) {
      contenedor.innerHTML += `
        <div  class= "col">
      <div id = "carta-img" class="col-lg-12  card mb-3 shadow" onclick="setProdID(${item.id})">
 
        <img id= "img-carta" class="img-fluid card-img-top rounded-top mx-auto d-block cursor-active "  src="${item.image}">
 
       <div  id = "carta-color" class = "rounded mx-auto row card-body cursor-active" >
        <h2 class="card-title text-center" >${item.name}</h2>
        <p class=" col-sm-12 card-text text-center car-description">${item.description}</p>
        
        <br>
        
        <div class="col-sm-12 col-lg-12 col-md-12 d-flex justify-content-between px-3 ">
        <p class="card-text  car-uni text-left mb-0"><small class="">${item.soldCount} vendidas</small> </p>
        <br>
          <p class="card-text mb-0 car-cost"   >${item.cost} ${item.currency}</p>
          </div>
          <br>
      </div>
      </div>
    </div>`;
    }
  } else {
    console.error("Error: La respuesta no es un array válido", array);
  }
}

// función para guardar el id del producto y redirigir
function setProdID(id) {
  localStorage.setItem("prodID", id); // guarda el ID del producto en localStorage
  window.location = "product-info.html"; // redirige a la página de detalles del producto
}

// Funcion para enviar los datos JSON al recorrido
function mostrarAuto() {
  fetch(`http://localhost:3000/products/${cat}.json`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "access-token": token,
    },
  })
    .then((response) => response.json())
    .then((autos) => {
      console.log("Respuesta desde el backend:", autos);
      dataArray = autos; // Guardar los datos en la variable
      showData(dataArray); // Mostrar los datos en la página
    });
}

mostrarAuto();

// Función para ordenar los datos por precio de forma ascendente
function sortDataByPriceAsc() {
  dataArray.sort((a, b) => a.cost - b.cost);
  showData(dataArray);
}

// Función para ordenar los datos por precio de forma descendente
function sortDataByPriceDesc() {
  dataArray.sort((a, b) => b.cost - a.cost);
  showData(dataArray);
}

// Función para ordenar los datos por cantidad de vendidos
function sortDataBySoldCount() {
  dataArray.sort((a, b) => b.soldCount - a.soldCount);
  showData(dataArray);
}

// Función para filtrar por rango de precio
function filterByPriceRange(minPrice, maxPrice) {
  let filteredData = dataArray.filter((item) => {
    let itemPrice = item.cost;
    return (
      (minPrice === "" || itemPrice >= minPrice) &&
      (maxPrice === "" || itemPrice <= maxPrice)
    );
  });
  showData(filteredData);
}

// ---- Eventos para los botones (pantalla grande) ----
rangeFilterButton.addEventListener("click", () => {
  let minPrice = rangeFilterMinInput.value;
  let maxPrice = rangeFilterMaxInput.value;
  filterByPriceRange(minPrice, maxPrice);
});

clearFilterButton.addEventListener("click", () => {
  rangeFilterMinInput.value = "";
  rangeFilterMaxInput.value = "";
  showData(dataArray); // Mostrar todos los productos al limpiar filtros
});

sortAscRadio.addEventListener("click", () => {
  sortDataByPriceAsc(); // Ordenar por precio ascendente
});

sortDescRadio.addEventListener("click", () => {
  sortDataByPriceDesc(); // Ordenar por precio descendente
});

sortByCountRadio.addEventListener("click", () => {
  sortDataBySoldCount(); // Ordenar por cantidad de vendidos
});

// ---- Eventos para los botones (pantallas pequeñas) ----
rangeFilterButtonSmall.addEventListener("click", () => {
  let minPrice = rangeFilterMinInputSmall.value;
  let maxPrice = rangeFilterMaxInputSmall.value;
  filterByPriceRange(minPrice, maxPrice);
});

clearFilterButtonSmall.addEventListener("click", () => {
  rangeFilterMinInputSmall.value = "";
  rangeFilterMaxInputSmall.value = "";
  showData(dataArray); // Mostrar todos los productos al limpiar filtros
});

sortAscRadioSmall.addEventListener("click", () => {
  sortDataByPriceAsc(); // Ordenar por precio ascendente
});

sortDescRadioSmall.addEventListener("click", () => {
  sortDataByPriceDesc(); // Ordenar por precio descendente
});

sortByCountRadioSmall.addEventListener("click", () => {
  sortDataBySoldCount(); // Ordenar por cantidad de vendidos
});

// Funcion para el buscador
document.addEventListener("DOMContentLoaded", function () {
  let buscador = document.getElementById("search-input");

  buscador.addEventListener("input", function () {
    let productos_autos = dataArray.filter((auto) => {
      // 1. Convertir a minúsculas el nombre del auto, la descripcion y lo que se escriba en el buscador
      // 2. Verificar si el nombre del auto incluye el texto del buscador o si coincide con algo en la descripcion
      return (
        auto.name.toLowerCase().includes(buscador.value.toLowerCase()) ||
        auto.description.toString().includes(buscador.value)
      );
    });

    showData(productos_autos);
  });
});
