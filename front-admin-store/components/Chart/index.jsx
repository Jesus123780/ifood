import PropTypes from 'prop-types'
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
} from 'chart.js'

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
)

import { Line, Pie, Doughnut, Bar } from 'react-chartjs-2'

const data = {
  labels: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio'],
  datasets: [
    {
      label: 'ejemplo',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }
  ]
}

const options = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2
    }
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right'
    },
    title: {
      display: true
    }
  },
  type: 'doughnut'

}

export const HorizontalBarChart = () => {return (
  <>
    <div className='header'>
      <div className='links'>
      </div>
      <Line data={data} options={options} />
    </div>
  </>
)}

export const Circle = () => {return (
  <>
    <div className='header'>
      <div className='links'>
      </div>
      <Pie data={data} options={options} />
    </div>
  </>
)}
export const DoughnutChar = () => {return (
  <>
    <div className='header'>
      <div className='links'>
      </div>
      <Doughnut data={data} />
    </div>
  </>
)}
export const BarChat = ({ data }) => {return (
  <>
    <div className='header'>
      <div className='links'>
      </div>
      <Bar data={data || data} />
    </div>
  </>
)}

BarChat.propTypes = {
  data: PropTypes.any
}
