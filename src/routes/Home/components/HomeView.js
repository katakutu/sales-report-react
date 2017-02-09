import React, { Component } from 'react'
import Chart from 'rc-echarts'
import './HomeView.scss'

class HomeView extends Component {
  ready(chart) {
    chart.on('click', ()=>{
      alert('click');
    });
  }

  render() {
    const options = {
      legend: {
        data: ['sales', 'purchase'],
      },
      xAxis: [{
        type: 'category',
        boundaryGap: false,
        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      }],
      yAxis: [{
        type: 'value',
        axisLabel: {
          formatter: '{value}'
        }
      }],
    };
    return (
      <div>
        <div className="container body">
          <div className="row">
            <div className="col-xs-12">
              <div className="x_panel">
                <Chart {...options} onReady={this.ready}>
                  <Chart.Bar
                    name="sales"
                    data={[2, 4, 7, 23, 25, 76, 135, 162, 32, 60, 6, 3]}/>
                  <Chart.Bar
                    name="purchase"
                    data={[2, 5, 9, 26, 28, 70, 175, 182, 48, 18, 6, 2]}/>
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
                      <tr>
                        <th scope="row">January 2017</th>
                        <td>30,482</td>
                        <td>▲ 5.9%</td>
                        <td>1,280</td>
                        <td>▲ 5.9%</td>
                        <td>Rp137,615,000</td>
                        <td>▲ 5.9%</td>
                        <td>Rp4,514</td>
                        <td>▲ 5.9%</td>
                        <td>Rp107,434</td>
                        <td>▲ 5.9%</td>
                      </tr>
                      <tr>
                        <th scope="row">February 2017</th>
                        <td>30,482</td>
                        <td>▼ 2.1%</td>
                        <td>1,280</td>
                        <td>▼ 2.1%</td>
                        <td>Rp137,615,000</td>
                        <td>▼ 2.1%</td>
                        <td>Rp4,514</td>
                        <td>▲ 5.9%</td>
                        <td>Rp107,434</td>
                        <td>▼ 2.1%</td>
                      </tr>
                      <tr>
                        <th scope="row">March 2017</th>
                        <td>30,482</td>
                        <td>▲ 5.9%</td>
                        <td>1,280</td>
                        <td>▲ 5.9%</td>
                        <td>Rp137,615,000</td>
                        <td>▲ 5.9%</td>
                        <td>Rp4,514</td>
                        <td>▲ 5.9%</td>
                        <td>Rp107,434</td>
                        <td>▲ 5.9%</td>
                      </tr>
                      <tr>
                        <th scope="row">April 2017</th>
                        <td>30,482</td>
                        <td>▼ 2.1%</td>
                        <td>1,280</td>
                        <td>▼ 2.1%</td>
                        <td>Rp137,615,000</td>
                        <td>▼ 2.1%</td>
                        <td>Rp4,514</td>
                        <td>▲ 5.9%</td>
                        <td>Rp107,434</td>
                        <td>▼ 2.1%</td>
                      </tr>
                      <tr>
                        <th scope="row">May 2017</th>
                        <td>30,482</td>
                        <td>▲ 5.9%</td>
                        <td>1,280</td>
                        <td>▲ 5.9%</td>
                        <td>Rp137,615,000</td>
                        <td>▲ 5.9%</td>
                        <td>Rp4,514</td>
                        <td>▲ 5.9%</td>
                        <td>Rp107,434</td>
                        <td>▲ 5.9%</td>
                      </tr>
                      <tr>
                        <th scope="row">June 2017</th>
                        <td>30,482</td>
                        <td>▲ 5.9%</td>
                        <td>1,280</td>
                        <td>▲ 5.9%</td>
                        <td>Rp137,615,000</td>
                        <td>▲ 5.9%</td>
                        <td>Rp4,514</td>
                        <td>▲ 5.9%</td>
                        <td>Rp107,434</td>
                        <td>▲ 5.9%</td>
                      </tr>
                      <tr>
                        <th scope="row">July 2017</th>
                        <td>30,482</td>
                        <td>▲ 5.9%</td>
                        <td>1,280</td>
                        <td>▲ 5.9%</td>
                        <td>Rp137,615,000</td>
                        <td>▲ 5.9%</td>
                        <td>Rp4,514</td>
                        <td>▲ 5.9%</td>
                        <td>Rp107,434</td>
                        <td>▲ 5.9%</td>
                      </tr>
                      <tr>
                        <th scope="row">August 2017</th>
                        <td>30,482</td>
                        <td>▼ 2.1%</td>
                        <td>1,280</td>
                        <td>▼ 2.1%</td>
                        <td>Rp137,615,000</td>
                        <td>▼ 2.1%</td>
                        <td>Rp4,514</td>
                        <td>▲ 5.9%</td>
                        <td>Rp107,434</td>
                        <td>▼ 2.1%</td>
                      </tr>
                      <tr>
                        <th scope="row">September 2017</th>
                        <td>30,482</td>
                        <td>▲ 5.9%</td>
                        <td>1,280</td>
                        <td>▲ 5.9%</td>
                        <td>Rp137,615,000</td>
                        <td>▲ 5.9%</td>
                        <td>Rp4,514</td>
                        <td>▲ 5.9%</td>
                        <td>Rp107,434</td>
                        <td>▲ 5.9%</td>
                      </tr>
                      <tr>
                        <th scope="row">October 2017</th>
                        <td>30,482</td>
                        <td>▼ 2.1%</td>
                        <td>1,280</td>
                        <td>▼ 2.1%</td>
                        <td>Rp137,615,000</td>
                        <td>▼ 2.1%</td>
                        <td>Rp4,514</td>
                        <td>▲ 5.9%</td>
                        <td>Rp107,434</td>
                        <td>▼ 2.1%</td>
                      </tr>
                      <tr>
                        <th scope="row">November 2017</th>
                        <td>30,482</td>
                        <td>▲ 5.9%</td>
                        <td>1,280</td>
                        <td>▲ 5.9%</td>
                        <td>Rp137,615,000</td>
                        <td>▲ 5.9%</td>
                        <td>Rp4,514</td>
                        <td>▲ 5.9%</td>
                        <td>Rp107,434</td>
                        <td>▲ 5.9%</td>
                      </tr>
                      <tr>
                        <th scope="row">December 2017</th>
                        <td>30,482</td>
                        <td>▼ 2.1%</td>
                        <td>1,280</td>
                        <td>▼ 2.1%</td>
                        <td>Rp137,615,000</td>
                        <td>▼ 2.1%</td>
                        <td>Rp4,514</td>
                        <td>▲ 5.9%</td>
                        <td>Rp107,434</td>
                        <td>▼ 2.1%</td>
                      </tr>

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

export default HomeView
