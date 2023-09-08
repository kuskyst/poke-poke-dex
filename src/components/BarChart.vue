<script>
import { HorizontalBar } from 'vue-chartjs'

export default {
  extends: HorizontalBar,
  props: {
    inputData: {
      type: Array,
      require: true
    }
  },
  data() {
    return {
      datas: {
        labels: [ 'HP', 'Attack', 'Defence', 'SP-Attack', 'SP-Defence', 'Speed' ],
        datasets: [{
          data: this.inputData,
          categoryPercentage: 0.8,
          backgroundColor: ['#8be286', '#d44f4a', '#ddac5f', '#ce66dd', '#ede670', '#78c6e0' ]
        }]
      },
      options: {
        responsive: true,
        legend: {
          display: false
        },
        tooltips: {
          xPadding: 12,
          yPadding: 10,
          bodyFontSize: 16,
          callbacks: {
            label: function(tooltipItems, datas) {
              return datas.labels[tooltipItems.index] + " : " +
                  datas.datasets[tooltipItems.datasetIndex].data[tooltipItems.index];
            }
          }
        },
        scales: {
          xAxes: [{
            display: true,
            gridLines: {
              display: true
            },
            ticks: {
              min: 0,
              max: 130,
              stepSize: 10,
              beginAtZero: true,
            }
          }],
          yAxes: [{
            display: true,
          }]
        },
      },
    }
  },
  mounted() {
    this.options.scales.xAxes[0].ticks.max =
      this.inputData.some(v => v >= 130) ? Math.floor(Math.max(...this.inputData) / 10) * 10 + 20 : 130;
    this.renderChart(this.datas, this.options)
  },
}
</script>