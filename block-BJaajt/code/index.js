const githubUser = document.getElementById("githubUser");
const userImage = document.querySelector(".user-details img");
const userFullName = document.querySelector(".user-details h3");
const username = document.getElementById("username");
const following = document.querySelector(".following");
const followers = document.querySelector(".followers");

function fetch(url, response) {
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", url);
  xmlhttp.onload = () => response(JSON.parse(xmlhttp.response));
  xmlhttp.onerror = () => console.error("Something Went Wrong");
  xmlhttp.send();
}

githubUser.addEventListener("keyup", (e) => {
  if (e.keyCode === 13 && e.target.value) {
    let username = e.target.value;
    fetch(`https://api.github.com/users/${username}`, displayUserDetails);
  }
});

function displayUserDetails(data) {
  userImage.src = data.avatar_url;
  userImage.alt = data.name;
  userFullName.innerText = data.name;
  username.innerText = "@" + data.login;
  displayChild(
    `https://api.github.com/users/${data.login}/followers`,
    followers
  );
  displayChild(
    `https://api.github.com/users/${data.login}/following`,
    following
  );
}

function displayChild(url, rootElm) {
  rootElm.innerHTML = "";
  fetch(url, function (followingList) {
    let topFive = followingList.slice(0, 5);
    topFive.forEach((info) => {
      let li = document.createElement("li");
      let img = document.createElement("img");
      img.src = info.avatar_url;
      img.alt = info.name;
      li.append(img);
      rootElm.append(li);
    });
  });
}

const img = document.querySelector(".random-cat img");
const reloadBtn = document.querySelector(".random-cat button");

function handleClick() {
  fetch(
    `https://api.thecatapi.com/v1/images/search?limit=1&size=full`,
    function (catInfo) {
      img.src = catInfo[0].url;
    }
  );
}

reloadBtn.addEventListener("click", handleClick);
