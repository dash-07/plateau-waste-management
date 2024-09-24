import { locations } from "./locations.js";

const dropdownHeader = document.querySelector(".dropdown-header");
const dropdownList = document.querySelector(".dropdown-list");

dropdownHeader.addEventListener("click", () => {
  dropdownList.classList.toggle("show");
});

const binIcon = L.icon({
  iconUrl: "../public/assets/images/bin.png",

  iconSize: [35, 35], // size of the icon
  iconAnchor: [20, 20], // point of the icon which will correspond to marker's location
  popupAnchor: [-1, -20], // point from which the popup should open relative to the iconAnchor
});
const recycleIcon = L.icon({
  iconUrl: "../public/assets/images/recycle-symbol.png",

  iconSize: [35, 35], // size of the icon
  iconAnchor: [20, 20], // point of the icon which will correspond to marker's location
  popupAnchor: [-1, -20], // point from which the popup should open relative to the iconAnchor
});
const incinerateIcon = L.icon({
  iconUrl: "../public/assets/images/incineration.png",

  iconSize: [35, 35], // size of the icon
  iconAnchor: [20, 20], // point of the icon which will correspond to marker's location
  popupAnchor: [-5, -20], // point from which the popup should open relative to the iconAnchor
});

// const map = L.map("map", {
//   center: [9.84731188879364, 8.900734931230545],
//   zoom: 13,
// });
const map = L.map("map").setView([9.84731188879364, 8.900734931230545], 13);

const createListItem = (content) => {
  const li = document.createElement("li");
  li.innerText = content;
  li.classList.add("list-item");
  li.addEventListener("click", () => {
    const coords = locations.filter(
      (location) => location.street === content
    )[0];
    map.setView([coords.lat, coords.lng], 17);
    L.popup()
      .setLatLng([coords.lat, coords.lng]) // Set the popup position
      .setContent(`<b>${coords.street}</b>${coords.desc}`) // Set the popup content
      .openOn(map);
    dropdownList.classList.remove("show");
  });
  return li;
};

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

locations.forEach((location) => {
  const li = createListItem(location.street);
  dropdownList.appendChild(li);
  if (location.marker === "waste-bin")
    L.marker([location.lat, location.lng], { icon: binIcon })
      .bindPopup(`<b>${location.street}</b>${location.desc}`)
      .addTo(map);
  else if (location.marker === "recycle")
    L.marker([location.lat, location.lng], { icon: recycleIcon })
      .bindPopup(`<b>${location.street}</b>${location.desc}`)
      .addTo(map);
  else if (location.marker === "incinerator")
    L.marker([location.lat, location.lng], { icon: incinerateIcon })
      .bindPopup(`<b>${location.street}</b>${location.desc}`)
      .addTo(map);
  else
    L.marker([location.lat, location.lng])
      .bindPopup(`<b>${location.street}</b>${location.desc}`)
      .addTo(map);
});

// const binIcon = L.icon({
//   iconUrl: "../public/assets/images/recycle-symbol.png",

//   iconSize: [35, 35], // size of the icon
//   iconAnchor: [20, 20], // point of the icon which will correspond to marker's location
//   popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
// });

// const map = L.map("map").setView([51.505, -0.09], 13);

// L.marker([9.861659082374654, 8.85862223803997], {
//   icon: binIcon,
// }).addTo(map);

// var marker = L.marker([51.5, -0.09]).addTo(map);
