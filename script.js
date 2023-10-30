// Код для stats блоков
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

        const risedif = document.createElement("div");
        risedif.className = "risedif";

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

        risedif.appendChild(isRiseElement);
        risedif.appendChild(differenceElement);

        stats_grid_item.appendChild(content);
        stats_grid_item.appendChild(risedif);

        stats_grid.appendChild(stats_grid_item);
      });
    })
    .catch((error) => console.error("JSON LOADING ERROR", error));
});
var myData;
// Код для графика Visitors Analytics
document.addEventListener("DOMContentLoaded", function () {
  fetch("analytics.json")
    .then((response) => response.json())
    .then((data) => {
      this.myData = data;
      console.log(this.myData);
      drawChart(this.myData, "september2023");
    })
    .catch((error) => console.error("JSON LOADING ERROR", error));

  const month_box = document.getElementById("month_box");
  console.log(month_box, "------");
  month_box.addEventListener("change", () => {
    // console.log(myCol, "myCol");
    const monthName = month_box.options[month_box.selectedIndex].value;
    drawChart(this.myData, monthName);
    myChart.update();
  });
});

var myChart;
function drawChart(data, monthName) {
  console.log(monthName, "chart shown");
  const days = data[monthName].days.map((entry) => entry.day);
  const values = data[monthName].days.map((entry) => entry.value);
  const maxValue = Math.max(...values);
  const yAxisMax = Math.ceil(maxValue / 100) * 100;

  const canvasElements = document.querySelectorAll(".myChart");

  canvasElements.forEach((canvas) => {
    const ctx = canvas.getContext("2d");
    if (myChart) {
      myChart.destroy();
    }
    myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: days,
        datasets: [
          {
            label: "Значение",
            data: values,
            backgroundColor: "#3C50E0",
            borderWidth: 2,
            borderRadius: 15,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            type: "linear",
            position: "bottom",
            ticks: {
              stepSize: 1,
              font: {
                color: "#64748b",
                size: 14,
                lineHeight: 2.2,
                family: "Poppins",
                style: "normal",
                weight: 500,
              },
            },
            grid: {
              display: false,
              color: "#E2E8F0",
              offset: true,
              drawBorder: false,
            },
          },
          y: {
            ticks: {
              min: 0,
              max: yAxisMax,
              stepSize: yAxisMax / 4,
              callback: function (value, index, values) {
                return value.toFixed(0);
              },
              callback: function (value, index) {
                return " " + value;
              },
              font: {
                color: "#64748b",
                size: 14,
                lineHeight: 2.2,
                family: "Poppins",
                style: "normal",
                weight: 500,
                align: "right",
              },
            },
            grid: {
              display: true,
              drawBorder: false,
              color: "#E2E8F0",
            },

            border: {
              dash: [10, 5],
            },
          },
        },
      },
    });
  });
}
