import React, { Component } from 'react'
import Chart from 'rc-echarts'
import './HomeView.scss'
import { graphql } from 'react-apollo'
import queries from '../../../queries'

class HomeView extends Component {
  ready(chart) {
    chart.on('click', ()=>{
      alert('click');
    });
  }

  renderTable (data, index) {
    console.log(data)
    return (
      <tr>
        <th scope="row">{data.name}</th>
        <td>{data.revenue_number}</td>
        <td>{data.revenue_rate}</td>
        <td>{data.subscription_number}</td>
        <td>{data.subscription_rate}</td>
        <td>{data.revenue_number}</td>
        <td>{data.revenue_rate}</td>
        <td>{data.arpu_number}</td>
        <td>{data.arpu_rate}</td>
        <td>{data.arppu_number}</td>
        <td>{data.arppu_rate}</td>
      </tr>
    )
  }

  render() {
    const options = {
      legend: {
        data: ['sales', 'purchase'],
      },
      xAxis: [{
        type: 'category',
        boundaryGap: false,
        data: ['0','1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'],
      }],
      yAxis: [{
        type: 'value',
        axisLabel: {
          formatter: '{value}'
        }
      }],
    };

    let sales = []
    let tx = []

    for(let i=0;i<this.props.data.graphic_sales.length;i++){
      sales.push(this.props.data.graphic_sales[i].sales)
      tx.push(this.props.data.graphic_sales[i].tx)
    }
    return (
      <div>
        <div className="container body">
          <div className="row">
            <div className="col-xs-12">
              <div className="x_panel">
                <Chart {...options} onReady={this.ready}>
                  <Chart.Bar
                    name="sales"
                    data={sales}/>
                  <Chart.Bar
                    name="purchase"
                    data={tx}/>
                </Chart>
              </div>
              <div className="x_panel">
                <div className="x_content">
                  <table className="table table-hover" id="table-revenue">
                    <thead>
                      <tr>
                        <th>Activity</th>
                        <th colSpan={2}>Registration</th>
                        <th colSpan={2}>Subscription</th>
                        <th colSpan={2}>Revenue</th>
                        <th colSpan={2}>ARPU</th>
                        <th colSpan={2}>ARPPU</th>
                      </tr>
                    </thead>
                    <tbody>
                    </tbody>
                    <thead>
                      <tr>
                        <th>Total</th>
                        <th colSpan={2}>365,784</th>
                        <th colSpan={2}>15,360</th>
                        <th colSpan={2}>Rp1,651,380,000</th>
                        <th colSpan={2}>Rp4,154</th>
                        <th colSpan={2}>Rp107,434</th>
                      </tr>
                    </thead>
                  </table>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default graphql(queries.HomeQuery, {
  options: { returnPartialData: true }
})(HomeView)
