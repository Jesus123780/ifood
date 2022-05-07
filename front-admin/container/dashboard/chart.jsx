import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)
import { Bar } from 'react-chartjs-2'
const BarComponent = () => {
  return (
    <>
      <Bar
        data={{
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [
            {
              label: 'months',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: 'red'
            }
          ]
        }}
        height={400}
        width={600}
      />
    </>
  )
}
export default BarComponent