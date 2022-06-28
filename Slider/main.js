const sliderImages = Array.from(
    document.querySelectorAll(".slider-container img")
  ),
  sliderCount = sliderImages.length,
  prevBtn = document.getElementById("prev"),
  nextBtn = document.getElementById("next"),
  slideNumberElement = document.getElementById("slide-number");

let currentSlide = 1;

// Create Pagination
const paginationElement = document.createElement("ul");
paginationElement.id = "pagination-ul";

for (let i = 1; i <= sliderCount; i++) {
  const paginationItem = document.createElement("li");
  paginationItem.setAttribute("data-index", i);
  paginationItem.appendChild(document.createTextNode(i));
  paginationElement.appendChild(paginationItem);
}
document.getElementById("indicators").appendChild(paginationElement);

const paginationNewEle = document.getElementById("pagination-ul"),
  paginationNewArr = Array.from(document.querySelectorAll("#pagination-ul li"));

for (let i = 0; i < paginationNewArr.length; i++) {
  paginationNewArr[i].onclick = function () {
    currentSlide = +this.getAttribute("data-index");
    theChecker();
  };
}

theChecker();

prevBtn.onclick = () => {
  if (prevBtn.classList.contains("disabled")) {
    return false;
  } else {
    currentSlide--;
    theChecker();
  }
};
nextBtn.onclick = () => {
  if (nextBtn.classList.contains("disabled")) {
    return false;
  } else {
    currentSlide++;
    theChecker();
  }
};

function theChecker() {
  slideNumberElement.innerText = `Slide ${currentSlide} of # ${sliderCount}`;
  removeAllActive();
  sliderImages[currentSlide - 1].classList.add("active");
  paginationNewEle.children[currentSlide - 1].classList.add("active");
  if (currentSlide == 1) {
    prevBtn.classList.add("disabled");
  } else {
    prevBtn.classList.remove("disabled");
  }
  if (currentSlide == sliderCount) {
    next.classList.add("disabled");
  } else {
    next.classList.remove("disabled");
  }
}

function removeAllActive() {
  sliderImages.forEach(img => {
    img.classList.remove("active");
  });
  paginationNewArr.forEach(bullet => {
    bullet.classList.remove("active");
  });
}
