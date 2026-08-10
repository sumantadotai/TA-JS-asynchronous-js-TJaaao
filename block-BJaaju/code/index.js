const clientId = "5fYa7L85oZotn3mh-AOFyZGkCj-8t3hFzqrOYsK2-KA";
const input = document.querySelector("input");
const div = document.querySelector("div");
const url = `https://api.unsplash.com/photos/?client_id=${clientId}`;
const getSearchUrl = (query) =>
  `https://api.unsplash.com/search/photos?query=${query}&client_id=${clientId}`;

function fetch(url, response) {
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", url);
  xmlhttp.onload = () => response(JSON.parse(xmlhttp.response));
  xmlhttp.onerror = () => console.error("Something Went Wrong");
  xmlhttp.send();
}

function displayImage(images) {
  div.innerHTML = "";
  images.forEach((image) => {
    let img = document.createElement("img");
    img.src = image.urls.thumb;
    div.append(img);
  });
}

fetch(url, displayImage);

input.addEventListener("keyup", () => {
  if (event.keyCode == 13 && input.value) {
    fetch(getSearchUrl(input.value), (response) =>
      displayImage(response.results)
    );
    input.value = "";
  }
});
