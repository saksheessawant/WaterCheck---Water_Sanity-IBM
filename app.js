const myMap = L.map('map').setView([40.0361111,-74.5361111], 8);
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution =
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Coded by coder\'s gyan with ❤️';
const tileLayer = L.tileLayer(tileUrl, { attribution });
tileLayer.addTo(myMap);


function generateList() {
  const ul = document.querySelector('.list');
  storeList.forEach((shop) => {
    const li = document.createElement('li');
    const div = document.createElement('div');
    const a = document.createElement('a');
    const p = document.createElement('p');
    a.addEventListener('click', () => {
        flyToStore(shop);
    });
    div.classList.add('shop-item');
    a.innerText = shop.SiteName;
    a.href = '#';
    p.innerText = shop.SiteNumber;

    div.appendChild(a);
    div.appendChild(p);
    li.appendChild(div);
    ul.appendChild(li);
  });
}

generateList();
var myIcon = L.icon({
    iconUrl: 'marker.png',
    iconSize: [20, 35]
});

function makePopupContent(shop) {
    return `
      <div>
      <h4>${shop.SiteName} - <br> Lat:${shop.Latitude}  Long:${shop.Longitude}</h4>
          <p><p>
          <p>PH: ${shop.PhValue}</p>
          <p>TEMPERATURE: ${shop.TValue}</p>
          <p>DISSOLVED OXYGEN: ${shop.DOValue}</p>
          <p>TURBIDITY: ${shop.TrbValue}</p>
          <p>SPECIFIC CONDUCATNCE: ${shop.ScValue}</p>
          
          <div class="phone-number">
              
          </div>
      </div>
    `;
  }

function generateL() {
    storeList.forEach((shop) => {
        const marker = L.marker([shop.Latitude,shop.Longitude],{ icon: myIcon }).addTo(myMap);
        var popup = marker.bindPopup(makePopupContent(shop), { closeButton: false, offset: L.point(0, -8) });
        
   
    });
  }
  
generateL();


function flyToStore(store) {
    const lat = store.Latitude;
    const lng = store.Longitude;
    myMap.flyTo([lat, lng], 14, {
        duration: 3
    });
    setTimeout(() => {
        L.popup({closeButton: false, offset: L.point(0, -8)})
        .setLatLng([lat, lng])
        .setContent(makePopupContent(store))
        .openOn(myMap);
    }, 3000);
}