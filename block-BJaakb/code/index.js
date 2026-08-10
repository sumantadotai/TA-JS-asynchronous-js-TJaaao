const clientId = "5fYa7L85oZotn3mh-AOFyZGkCj-8t3hFzqrOYsK2-KA";
const input = document.querySelector("input");
const div = document.querySelector("div");
const url = `https://api.unsplash.com/photos/?client_id=${clientId}`;
const getSearchUrl = (query) =>
  `https://api.unsplash.com/search/photos?query=${query}&client_id=${clientId}`;

function fetch(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.response);
      } else {
        reject(xhr.statusText);
      }
    };
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  });
}

function displayImage(images) {
  console.log(images);
  div.innerHTML = "";
  images.forEach((image) => {
    let img = document.createElement("img");
    img.src = image.urls.thumb;
    div.append(img);
  });
}

fetch(url).then((res) => displayImage(JSON.parse(res)));

input.addEventListener("keyup", () => {
  if (event.keyCode == 13 && input.value) {
    fetch(getSearchUrl(input.value))
      .then((res) => JSON.parse(res))
      .then((results) => displayImage(results.results));
    input.value = "";
  }
});
