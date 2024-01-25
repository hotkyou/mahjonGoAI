document.addEventListener("DOMContentLoaded", function() {
  const avgrank = 1;
  const score = 33;
  const rank = 72;
  const history = [1, 4, 2, 3, 4, 3, 3, 1, 2, 1]

  const ctx = document.getElementById('avgrank');
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [avgrank, 100 - avgrank],
        backgroundColor: [
          'rgba(255, 0, 0, 1)',
          'rgba(0, 0, 0, 0)',
        ],
        borderWidth: 0,
        cutoutPercentage: 80,
        animation: {
          duration: 2000,
          delay: 500,
        }
      }],
    }
  })

  const ctx2 = document.getElementById('score');
  new Chart(ctx2, {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [score, 100 - score],
        backgroundColor: [
          'rgba(255, 0, 0, 1)',
          'rgba(0, 0, 0, 0)',
        ],
        borderWidth: 0,
        cutoutPercentage: 80,
        animation: {
          duration: 2000,
          delay: 2000,
        }
      }]
    }
  })

  const ctx3 = document.getElementById('rank');
  new Chart(ctx3, {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [rank, 100 - rank],
        backgroundColor: [
          'rgba(255, 0, 0, 1)',
          'rgba(0, 0, 0, 0)',
        ],
        borderWidth: 0,
        cutoutPercentage: 80,
        animation: {
          duration: 2000,
          delay: 3500,
        }
      }]
    }
  })

  const ctx4 = document.getElementById('history');
  new Chart(ctx4, {
    type: 'line',
    data: {
      labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      datasets: [{
          data: history, // 1位、2位、3位、4位のデータ
          borderColor: 'rgba(75, 192, 192, 1)', // 折れ線の色
          borderWidth: 2,
          fill: false
      }]
    },
    options: {
      scales: {
          x: {
              display: false, // 横軸を非表示
          },
          y: {
            reverse: true, // 逆順に表示
            ticks: {
              min: 1, // 最小値
              max: 4, // 最大値
              stepSize: 1,                   // 軸間隔
              callback: function(value, index, ticks) {
                return value + '位';
              }
            },
          }
      },
      plugins: {			// pluginsの中に
				legend: {
					display: false
				}
			}
    }
  })
});