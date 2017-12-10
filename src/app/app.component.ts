import { Component, OnInit } from '@angular/core';
import {
  Headers,
  RequestOptions,
  Http,
  Response
} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import * as io from 'socket.io-client';

declare var CanvasJS: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'CanvasJS JavaScript Chart';
  currentTemperature: number;
  currentHumidity: number;

  temperature = [];

  humidity = [];

  comboHumidity = [];

  comboTemperature = [];

  constructor(
    private http: Http,
    private _http: Http
  ) { }

  ngOnInit() {
    const data = 'http://localhost:8000/users/closest';
    this._http.get(data).subscribe(res => {
      const response = res.json();
      const temp_lgt = response.temperature.length;
      const humidity_lgt = response.humidity.length;
      this.currentTemperature = response.temperature[temp_lgt - 1];
      this.currentHumidity = response.humidity[humidity_lgt - 1];
      console.log('**** currentTemperature= ' + this.currentTemperature);
      console.log('**** currentHumidity= ' + this.currentHumidity);
      for (let i = 0; i < temp_lgt; i++) {
        this.temperature.push({ x: i, y: response.temperature[i] });
        console.log('**** this.temperature= ' + this.temperature);
        this.humidity.push({ x: i, y: response.humidity[i] });
      }

      const tempChart = new CanvasJS.Chart('temperatureChart', {
        title: {
          text: 'Temperature'
        },
        axisX: {
          title: 'Count'
        },
        axisY: {
          title: 'Temperature'
        },
        data: [{
          type: 'line',
          dataPoints: this.temperature
        }]
      });
      tempChart.render();
      console.log('**** this.temperature= ' + this.temperature);

      const humiditychart = new CanvasJS.Chart('humidityChart', {
        title: {
          text: 'Humidity'
        },
        axisX: {
          title: 'Count'
        },
        axisY: {
          title: 'Humidity'
        },
        data: [{
          type: 'line',
          dataPoints: this.humidity
        }]
      });
      humiditychart.render();
    });
  }

  showTemp() {
    const humidityChart = document.getElementById('humidityChart');
    humidityChart.style.display = 'none';
    const tempAndHumChart = document.getElementById('tempHumidityChart');
    tempAndHumChart.style.display = 'none';

    const tempChart = document.getElementById('temperatureChart');
    if (tempChart.style.display === 'none') {
      tempChart.style.display = 'block';
      tempChart.style.width = '500px';
      tempChart.style.boxSizing = 'border-box';
    }
  }

  showHumidity() {
    const tempChart = document.getElementById('temperatureChart');
    tempChart.style.display = 'none';
    const tempAndHumChart = document.getElementById('tempHumidityChart');
    tempAndHumChart.style.display = 'none';

    const humidityChart = document.getElementById('humidityChart');
    if (humidityChart.style.display === 'none') {
      humidityChart.style.display = 'block';
      humidityChart.style.width = '500px';
      humidityChart.style.boxSizing = 'border-box';
    }
  }

  showTempHumidityChart() {
    const tempChart = document.getElementById('temperatureChart');
    tempChart.style.display = 'none';
    const humidityChart = document.getElementById('humidityChart');
    humidityChart.style.display = 'none';

    const tempAndHumChart = document.getElementById('tempHumidityChart');
    if (tempAndHumChart.style.display === 'none') {
      tempAndHumChart.style.display = 'block';
      tempAndHumChart.style.width = '500px';
      tempAndHumChart.style.boxSizing = 'border-box';
    }
  }

  searchTempAndHumidity(searchValue: String) {
    this.comboTemperature = [ ];
    this.comboHumidity = [ ];
    const year = (new Date()).getFullYear();
    console.log('**** searchTempAndHumidity year= ' + year);
    let month = (new Date()).getMonth();
    month += 1;
    console.log('**** searchTempAndHumidity month = ' + month);
    let query = '';
    if (searchValue === 'month') {
      query = 'http://localhost:8000/users/month?month=' + month;
    } else {
      query = 'http://localhost:8000/users/year?year=' + year;
    }
    console.log('*** combo query = ' + query);
    this._http.get(query).subscribe(res => {
      console.log('*** res.json = ' + res.json());
      const res_arr = res.json();
      for (let i = 0; i < res_arr.length; i++) {
        this.comboTemperature.push({ label: res_arr[i]._id, y: Math.round(res_arr[i].avg_temperature) });
        this.comboHumidity.push({ label: res_arr[i]._id, y: Math.round(res_arr[i].avg_humidity) });
      }

      const tempHumidityChart = new CanvasJS.Chart('tempHumidityChart', {
        title: {
          text: 'Temperature and Humidity'
        },
        axisX: {
          title: searchValue === 'month' ? 'Day' : 'Month'
        },
        axisY: {
          title: 'Temperature'
        },
        axisY2: {
          title: 'Humidity',
          titleFontColor: 'steelBlue',
        },
        data: [{
          type: 'line',
          dataPoints: this.comboTemperature
        }, {
          type: 'line',
          axisYType: 'secondary',
          dataPoints: this.comboHumidity
        }]
      });
      tempHumidityChart.render();

      const tempChart = document.getElementById('temperatureChart');
      tempChart.style.display = 'none';
      const humidityChart = document.getElementById('humidityChart');
      humidityChart.style.display = 'none';

      const tempAndHumChart = document.getElementById('tempHumidityChart');
      if (tempAndHumChart.style.display === 'none') {
        tempAndHumChart.style.display = 'block';
        tempAndHumChart.style.width = '500px';
        tempAndHumChart.style.boxSizing = 'border-box';
      }
    });
    this.showTempHumidityChart();
  }

}
