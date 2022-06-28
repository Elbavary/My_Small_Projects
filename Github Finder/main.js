const input = document.querySelector(".get-repos input"),
  getBtn = document.querySelector(".get-btn"),
  showData = document.querySelector(".show-data");

getBtn.onclick = function () {
  if (input.value === "") {
    showData.innerHTML = "<span>Please Enter Github Username.</span>";
  } else {
    fetch(`https://api.github.com/users/${input.value}/repos`)
      .then(res => res.json())
      .then(repos => {
        showData.innerHTML = "";
        repos.forEach(repo => {
          const mainDiv = document.createElement("div");
          mainDiv.className = "repo-name";
          mainDiv.appendChild(document.createTextNode(repo.name));
          const url = document.createElement("a");
          url.appendChild(document.createTextNode("Visit"));
          url.href = `https://github.com/${input.value}/${repo.name}`;
          url.setAttribute("target", "_blank");
          const stars = document.createElement("span");
          stars.appendChild(
            document.createTextNode(`Stars ${repo.stargazers_count}`)
          );
          mainDiv.appendChild(url);
          mainDiv.appendChild(stars);
          showData.appendChild(mainDiv);
        });
      });
  }
};
