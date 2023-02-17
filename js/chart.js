function generateChart(weeklyTemp) {
  myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      color: "#cbd1d6",
      datasets: [{
        label: "Temperature (°C)",
        data: weeklyTemp,
        borderWidth: 1,
      }]
    },
    options: {
      color: "#cbd1d6",
      scales: {
        x: {
          ticks: {
            color: "#cbd1d6"
          }
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: "#cbd1d6"
          }
        }
      },
      plugins: {
        legend: {
            labels: {
                font: {
                    size: 20
                }
            }
        }
    }
    }
  });
}