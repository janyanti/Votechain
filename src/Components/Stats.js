import React, { Component } from 'react'
import { Bar, Pie } from 'react-chartjs-2'

export default class ResultChart extends Component {

  constructor(props){
    super(props)
    this.state = {
      chart_data: {
        labels: ["Barack Obama", "Donald Trump"],
        datasets: [
          {
          labels: "# of Votes",
          data: [24,13]
          }
        ],
        backgroundColor: [
          "rgba(17, 28, 242, 0.8)",
          "rgba(246, 59, 68, 0.8)"
        ]
      }
    }
  }
  render(){
    return (
      <div className="chart">
        <Bar
          data={this.state.chart_data}
          options={{}}
        />
      </div>
    )
  }
}
