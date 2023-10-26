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
// chartAreaBorder - плагин для бордера
// const chartAreaBorder = {
//   id: "chartAreaBorder",
//   beforeDraw(chart, args, options) {
//     const {
//       ctx,
//       chartArea: { left, top, width, height },
//     } = chart;
//     ctx.save();
//     ctx.strokeStyle = options.borderColor;
//     ctx.lineWidth = options.borderWidth;
//     ctx.setLineDash(options.borderDash || []);
//     ctx.lineDashOffset = options.borderDashOffset;
//     ctx.strokeRect(left, top, width, height);
//     ctx.restore();
//   },
// };
// Код для графика Visitors Analytics
document.addEventListener("DOMContentLoaded", function () {
  fetch("analytics.json")
    .then((response) => response.json())
    .then((data) => {
      const days = data.days.map((entry) => entry.day);
      const values = data.days.map((entry) => entry.value);
      const maxValue = Math.max(...values);
      const yAxisMax = Math.ceil(maxValue / 100) * 100;

      const canvasElements = document.querySelectorAll(".myChart");

      canvasElements.forEach((canvas) => {
        const ctx = canvas.getContext("2d");

        new Chart(ctx, {
          // plugins: [chartAreaBorder],
          // Включает плагин
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
              // chartAreaBorder: {
              //   borderWidth: 1,
              //   borderDash: [5, 5],
              //   borderDashOffset: 2,
              // },
              // Задает значения бордера
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

        // canvas.style.height = "500px";
      });
    })
    .catch((error) => console.error("JSON LOADING ERROR", error));
});
