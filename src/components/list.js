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
    this.retrieveVelocity = this.retrieveVelocity.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveVelocity = this.setActiveVelocity.bind(this);

    this.state = {
      velocity: [],
      currentVelocity: null,
      searchYear: ""
    };
  }

  componentDidMount() {
    this.retrieveVelocity();
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
    });
  }

  setActiveVelocity(velocity) {
    this.setState({
      currentVelocity: velocity,
    });
  }

  render() {
    const { velocity, currentVelocity} = this.state;
    const evData = {
      labels: velocity.map((e) => e.year),
      datasets: [
        {
          label: "Exit Velocity",
          data: velocity.map((e) => e.mph),
          backgroundColor: [
            "rgba(75,192,192,1)",
            "#ff0000"
          ],
          borderColor: "rgba(75,192,192,1)",
          borderWidth: 1.5,
        },
      ],
    }

    const evOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top'
        },
        title: {
          display: true,
          text: 'Exit Velocity Line Chart',
        },
      },
    }

    const xslgData = {
      labels: velocity.map((e) => e.year),
      datasets: [
        {
          label: "xslg",
          data: velocity.map((e) => e.xslg),
          backgroundColor: [
            "rgba(75,192,192,1)",
            "#ff0000"
          ],
          borderColor: "rgba(75,192,192,1)",
          borderWidth: 1.5,
        },
      ],
    }

    const xslgOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top'
        },
        title: {
          display: true,
          text: 'xslg Line Chart',
        },
      },
    }

    const wobaData = {
      labels: velocity.map((e) => e.year),
      datasets: [
        {
          label: "wOBA",
          data: velocity.map((e) => e.wOBA),
          backgroundColor: [
            "rgba(75,192,192,1)",
            "#ff0000"
          ],
          borderColor: "rgba(75,192,192,1)",
          borderWidth: 1.5,
        },
      ],
    }

    const wobaOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top'
        },
        title: {
          display: true,
          text: 'wOBA Line Chart',
        },
      },
    }

    const xwobaData = {
      labels: velocity.map((e) => e.year),
      datasets: [
        {
          label: "xwOBA",
          data: velocity.map((e) => e.xwOBA),
          backgroundColor: [
            "rgba(75,192,192,1)",
            "#ff0000"
          ],
          borderColor: "rgba(75,192,192,1)",
          borderWidth: 1.5,
        },
      ],
    }

    const xwobaOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top'
        },
        title: {
          display: true,
          text: 'xwOBA Line Chart',
        },
      },
    }

    const kData = {
      labels: velocity.map((e) => e.year),
      datasets: [
        {
          label: "K%",
          data: velocity.map((e) => e.K),
          backgroundColor: [
            "rgba(75,192,192,1)",
            "#ff0000"
          ],
          borderColor: "rgba(75,192,192,1)",
          borderWidth: 1.5,
        },
      ],
    }

    const kOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top'
        },
        title: {
          display: true,
          text: 'K% Line Chart',
        },
      },
    }

    const bbData = {
      labels: velocity.map((e) => e.year),
      datasets: [
        {
          label: "BB%",
          data: velocity.map((e) => e.BB),
          backgroundColor: [
            "rgba(75,192,192,1)",
            "#ff0000"
          ],
          borderColor: "rgba(75,192,192,1)",
          borderWidth: 1.5,
        },
      ],
    }

    const bbOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top'
        },
        title: {
          display: true,
          text: 'BB% Line Chart',
        },
      },
    }

    return (
      <div className="list row">

        <div className="col-md-6">
          <h4>Year</h4>

          <ul className="list-group">
            {velocity &&
              velocity.map((velocity, index) => (
                <li
                  className="list-group-item"
                  onClick={() => this.setActiveVelocity(velocity, index)}
                  key={index}
                >
                  {velocity.year}
                </li>
              ))}
          </ul>

        </div>
        <div className="col-md-6">
          {currentVelocity ? (
            <div>
              <h4>All stats</h4>
              <div>
                <label>
                  <strong>Year:</strong>
                </label>{" "}
                {currentVelocity.year}
              </div>
              <div>
                <label>
                  <strong>EV:</strong>
                </label>{" "}
                {currentVelocity.mph}
              </div>
              <div>
                <label>
                  <strong>xslg:</strong>
                </label>{" "}
                {currentVelocity.xslg}
              </div>
              <div>
                <label>
                  <strong>wOBA:</strong>
                </label>{" "}
                {currentVelocity.wOBA}
              </div>
              <div>
                <label>
                  <strong>xwOBA:</strong>
                </label>{" "}
                {currentVelocity.xwOBA}
              </div>
              <div>
                <label>
                  <strong>K%:</strong>
                </label>{" "}
                {currentVelocity.K}
              </div>
              <div>
                <label>
                  <strong>BB%:</strong>
                </label>{" "}
                {currentVelocity.BB}
              </div>


            </div>
          ) : (
            <div>
              <br />
              <p>Please click on Year to see detail stats...</p>
            </div>
          )}
        </div>

        <div className="col-md-6">
          <h4> Chart </h4>
          <ul className="list-group">
            <Line options={evOptions} data={evData}></Line>
          </ul>
          <ul className="list-group">
            <Line options={xslgOptions} data={xslgData}></Line>
          </ul>
          <ul className="list-group">
            <Line options={wobaOptions} data={wobaData}></Line>
          </ul>
          <ul className="list-group">
            <Line options={xwobaOptions} data={xwobaData}></Line>
          </ul>
          <ul className="list-group">
            <Line options={kOptions} data={kData}></Line>
          </ul>
          <ul className="list-group">
            <Line options={bbOptions} data={bbData}></Line>
          </ul>
        </div>

        <div>

        </div>


      </div>
    );
  }
}
