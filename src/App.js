import React from 'react';
import { Component } from 'react'
import data from './data/data.json'
import configData from './data/configdata.json'
import { CitiesDropdown } from './components/cities-dropdown/cities-dropdown.component'
import { VehicleDropdown } from './components/vehicle-dropdown/vehicle-dropdown.component'
import { EmissionNorm } from './components/emission-norm/emission-norm.component'
import { ProductDropdown } from './components/product/prodcut-dropdown.component'
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      cities: [],
      city: [],
      selectedCity: '',
      avrgSpeedLimit: '0',
      selectedOption: 'PM2.5',
      airQualityIndex: '0',
      vehicleType: '',
      normType: '',
      product: '',
      volumeFlow: 0,
      power: 0,
      cleanairdelivery: 0,
      powerconsumption: '',
      noOfBoxes: 1
    }

  }
  componentDidMount() {
    //console.log(this.cities)

  }
  noOfBoxesChange = e => {
    this.setState({ noOfBoxes: e.target.value }, () => {           
      this.finalPerformanceResult()
    })
  }
  onChangeValue = e => {
    this.setState({ selectedOption: e.target.value }, () => {
      if (this.state.selectedOption === 'PM2.5') {
        this.setState({ airQualityIndex: this.state.city[2] })
      }
      else {
        this.setState({ airQualityIndex: this.state.city[3] })
      }
      this.finalPerformanceResult()
    })

  }
  handleVehicleChange = e => {
    this.setState({ vehicleType: e.value }, () => {
      this.finalPerformanceResult()
    })
  }
  handleNormChange = e => {
    this.setState({ normType: e.value }, () => {
      this.finalPerformanceResult()
    })
  }
  handleProductChange = e => {
    this.setState({ product: e.value }, () => {
      this.finalPerformanceResult()
    })
  }
  onVolumeFlowChange = e => {
    this.setState({ volumeFlow: e.target.value }, () => {     
      this.finalPerformanceResult()
    })

  }
  finalPerformanceResult = () => {    
    if (this.state.product === 'Gen1' && this.state.volumeFlow > 0) {
      this.setState({ power: configData.powerdetails.Gen1.filter(element => element.fr >= this.state.volumeFlow)[0].power*this.state.noOfBoxes })
      if (this.state.selectedOption === 'PM2.5') {
        this.setState({ cleanairdelivery: Math.round(this.state.volumeFlow * 0.55 * this.state.noOfBoxes) })
      }
      else {
        this.setState({ cleanairdelivery: Math.round(this.state.volumeFlow * 0.7 * this.state.noOfBoxes) })
      }
    }
    else if(this.state.product === 'Gen2' && this.state.volumeFlow > 0) {
      this.setState({ power: configData.powerdetails.Gen2.filter(element => element.fr >= this.state.volumeFlow)[0].power*this.state.noOfBoxes })
      if (this.state.selectedOption === 'PM2.5') {
        this.setState({ cleanairdelivery: Math.round(this.state.volumeFlow * 0.65 * this.state.noOfBoxes) })
      }
      else {
        this.setState({ cleanairdelivery: Math.round(this.state.volumeFlow * 0.85 * this.state.noOfBoxes) })
      }
    }
  }
  handleChange = e => {
    this.setState({ selectedCity: e.value[0] })
    this.setState({ avrgSpeedLimit: e.value[1] })
    this.setState({ airQualityIndex: e.value[2] })
    this.setState({ selectedOption: 'PM2.5' })
    this.setState({ city: e.value })
    this.finalPerformanceResult()
  }
  render() {

    const { avrgSpeedLimit, airQualityIndex, selectedOption, volumeFlow, cleanairdelivery, noOfBoxes,power } = this.state


    return (
      <div className="App">
        <h1>MHDE Calculator</h1>
        <CitiesDropdown
          cities={data.Results}
          placeholder="select city"
          handleChange={this.handleChange}
        >
        </CitiesDropdown>
        <div>Average Vehicle Speed</div>
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={avrgSpeedLimit}
          onChange={e => {
            this.setState({ avrgSpeedLimit: e.target.value })
          }}
        />
        <p>{avrgSpeedLimit} KMPH</p>
        <form>
          <div className="radio">
            <label>
              <input type="radio" value="PM2.5"
                checked={selectedOption === 'PM2.5'}
                onChange={this.onChangeValue} />
            PM2.5
          </label>
            <label>
              <input type="radio" value="PM10"
                checked={selectedOption === 'PM10'}
                onChange={this.onChangeValue} />
            PM10
          </label>
          </div>
        </form>
        <p></p>
        <div>Air Quality Index</div>

        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={airQualityIndex}
          onChange={e => {
            this.setState({ airQualityIndex: e.target.value })
          }}
        />
        <p>{airQualityIndex} µg/m3</p>
        Select Vehicle
        <VehicleDropdown
          vehicles={configData.vehicleTypes}
          placeholder="select vehicle type"
          handleChange={this.handleVehicleChange}
        >
        </VehicleDropdown><p></p>
        Select Emission Norm
        <EmissionNorm
          norms={configData.EmissionNorms}
          placeholder="select Emission norm"
          handleChange={this.handleNormChange}
        >
        </EmissionNorm><p></p>
      Select Product
        <ProductDropdown
          products={configData.products}
          placeholder="select product"
          handleProductChange={this.handleProductChange}>
        </ProductDropdown><p></p>
        <p>Volume Flow</p>
        <input
          type="range"
          min="0"
          max="2000"
          step="500"
          value={volumeFlow}
          onChange={this.onVolumeFlowChange}
        />
        <p>{volumeFlow} m3/hr</p>
        No Of Boxes :<input type="number" value={noOfBoxes} onChange={this.noOfBoxesChange} min={1} max={100}></input>
        <p></p>
        <p>Clean air delivery: {cleanairdelivery} m3/ hr</p>
        <p>Power Consumption: {power} watss</p>
      </div>
    );
  }
}

export default App;
