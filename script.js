document.addEventListener("DOMContentLoaded", function () {
  const statsContainer = document.getElementById("statsContainer");

  // Загрузите данные из JSON файла
  fetch("legends.json")
    .then((response) => response.json())
    .then((data) => {
      // Группируйте данные по классам
      const groupedData = {};
      data.forEach((item) => {
        if (!groupedData[item.group]) {
          groupedData[item.group] = [];
        }
        groupedData[item.group].push(item);
      });

      // Создайте элементы для каждой группы и присвойте классы
      for (const group in groupedData) {
        const groupElement = document.createElement("div");
        groupElement.className = group; // Присвоение класса
        groupedData[group].forEach((item) => {
          const statElement = document.createElement("div");

          // Функция для форматирования значения с добавлением знака процента
          const formatDifference = (value) => {
            return value + "%";
          };

          statElement.innerHTML = `
              <p>Title: ${item.title}</p>
              <p>Value: ${
                item.value >= 1000
                  ? (item.value / 1000).toFixed(1) + "K"
                  : item.value
              }</p>
              <p>Is Rise: ${item.isRise ? "True" : "False"}</p>
              <p>Difference: ${formatDifference(item.difference)}</p>
          `;
          groupElement.appendChild(statElement);
        });
        statsContainer.appendChild(groupElement);
      }
    })
    .catch((error) =>
      console.error("Произошла ошибка при загрузке JSON файла:", error)
    );
});
