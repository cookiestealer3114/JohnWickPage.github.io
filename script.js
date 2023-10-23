document.addEventListener("DOMContentLoaded", function () {
  const stats_grid = document.querySelector(".stats_grid");

  fetch("legends.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item) => {
        const stats_grid_item = document.createElement("div");
        stats_grid_item.className = "stats_grid_item";

        const content = document.createElement("div");
        content.className = "content";

        const valueElement = document.createElement("div");
        valueElement.className = "value";
        if (item.value >= 1000) {
          valueElement.textContent =
            item.value % 1000 === 0
              ? (item.value / 1000).toFixed(0) + "K"
              : (item.value / 1000).toFixed(1) + "K";
        } else {
          valueElement.textContent = item.value;
        }

        const titleElement = document.createElement("div");
        titleElement.className = "title";
        titleElement.textContent = item.title;

        content.appendChild(valueElement);
        content.appendChild(titleElement);

        const isRiseElement = document.createElement("div");
        isRiseElement.className = item.isRise ? "isRise" : "isRise is-fall";

        const arrowImage = document.createElement("img");
        arrowImage.src = item.isRise
          ? "./img/green-arrow.svg"
          : "./img/yellow-arrow.svg";

        isRiseElement.appendChild(arrowImage);

        const differenceElement = document.createElement("div");
        differenceElement.className = "difference";
        differenceElement.textContent = item.difference + "%";

        if (!item.isRise) {
          differenceElement.classList.add("yellow");
        }

        stats_grid_item.appendChild(content);
        stats_grid_item.appendChild(isRiseElement);
        stats_grid_item.appendChild(differenceElement);

        stats_grid.appendChild(stats_grid_item);
      });
    })
    .catch((error) => console.error("JSON LOADING ERROR", error));
});
