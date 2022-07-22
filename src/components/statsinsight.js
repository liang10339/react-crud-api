import React, { Component } from "react";
import VelocityDataService from "../services/service";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default class VelocityList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchYear = this.onChangeSearchYear.bind(this);
    this.retrieveVelocity = this.retrieveVelocity.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveVelocity = this.setActiveVelocity.bind(this);
    this.removeAllVelocity = this.removeAllVelocity.bind(this);
    this.searchYear = this.searchYear.bind(this);

    this.state = {
      velocity: [],
      currentVelocity: null,
      currentIndex: -1,
      searchYear: ""
    };
  }

  componentDidMount() {
    this.retrieveVelocity();
  }

  onChangeSearchYear(e) {
    const searchYear = e.target.value;

    this.setState({
      searchYear: searchYear
    });
  }

  retrieveVelocity() {
    VelocityDataService.getAll()
      .then(response => {
        this.setState({
          velocity: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveVelocity();
    this.setState({
      currentVelocity: null,
      currentIndex: -1
    });
  }

  setActiveVelocity(velocity, index) {
    this.setState({
      currentVelocity: velocity,
      currentIndex: index
    });
  }

  removeAllVelocity() {
    VelocityDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchYear() {
    this.setState({
      currentVelocity: null,
      currentIndex: -1
    });

    VelocityDataService.findByYear(this.state.searchYear)
      .then(response => {
        this.setState({
          velocity: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { velocity, currentVelocity, currentIndex } = this.state;
    const data = {
      labels: this.state.velocity.map((data) => data.year),
      datasets: [
        {
          label: "MPH",
          data: this.state.velocity.map((data) => data.mph),
          backgroundColor: [
            "rgba(75,192,192,1)",
            "#ecf0f1",
            "#50AF95",
            "#f3ba2f",
            "#2a71d0",
          ],
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    }
    return (
      <div className="list row">

        <div className="col-md-6">
          <h4>data</h4>
          <table>
            <tr>
              <th>球種</th>
              <th>球數</th>
              <th>平均球速</th>
              <th>好球率</th>
              <th>BABIP</th>
            </tr>
            <tr>
              <td> {velocity &&
              velocity.map((type, index) => (
                <li className="list-group-item">
                  {type.TaggedPitchType}
                </li>
              ))}</td>
              <td> {velocity &&
              velocity.map((velocity, index) => (
                <li className="list-group-item">
                  {Number(velocity.Balls) + Number(velocity.Strikes)}
                </li>
              ))}</td>
              <td>...</td>
      </tr>
  </table>
          <ul className="list-group">
            {velocity &&
              velocity.map((velocity, index) => (
                <li className="list-group-item">
                  {velocity.TaggedPitchType}
                </li>
              ))}
          </ul>
          
        </div>
        {/* <div className="col-md-6">
          {currentVelocity ? (
            <div>
              <h4>Velocity</h4>
              <div>
                <label>
                  <strong>Year:</strong>
                </label>{" "}
                {currentVelocity.year}
              </div>
              <div>
                <label>
                  <strong>MPH:</strong>
                </label>{" "}
                {currentVelocity.mph}
              </div>

         
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Velocity...</p>
            </div>
          )}
        </div>

        <div className="col-md-6">
          <h4> Chart </h4>
          <ul className="list-group">
            <Line data={data}></Line>
          </ul>
        </div> */}
        
        <div>
          
        </div>
        

      </div>
    );
  }
}
