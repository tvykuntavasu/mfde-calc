import React from 'react';
import { Component } from 'react'
import data from './data/data.json'
import configData from './data/configdata.json'
import Typography from "@material-ui/core/Typography";
import Container from '@material-ui/core/Container';
import { CitiesDropdown } from './components/cities-dropdown/cities-dropdown.component'
import { VehicleDropdown } from './components/vehicle-dropdown/vehicle-dropdown.component'
import { EmissionNorm } from './components/emission-norm/emission-norm.component'
import { ProductDropdown } from './components/product/prodcut-dropdown.component'
import { MFDESlider } from './components/input-slider/input-slider.component'
import { MarkedSlider } from './components/marked-slider/marked-slider.component'
import { ButtonIncrement } from './components/increment/increment.component'
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/css/react-flags-select.css';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      cities: [],
      city: [],
      selectedCity: '',
      avrgSpeedLimit: 0,
      selectedOption: 'PM2.5',
      airQualityIndex: 0,
      vehicleType: '',
      normType: '',
      product: '',
      volumeFlow: 0,
      power: 0,
      cleanairdelivery: 0,
      powerconsumption: '',
      noOfBoxes: 1,
      selectedCountry:'',
      marks: configData.powerdetails.Gen1
    }

  }
  componentDidMount() {

  }
  noOfBoxesChange = e => {
    this.setState({ noOfBoxes: e.target.value }, () => {
      this.finalPerformanceResult()
    })
  }
  onChangeValue = e => {
    this.setState({ selectedOption: e.target.value }, () => {
      if (this.state.selectedOption === 'PM2.5') {
        this.setState({ airQualityIndex: parseInt(this.state.city[2]) })
      }
      else {
        this.setState({ airQualityIndex: parseInt(this.state.city[3]) })
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
      if (this.state.product === 'Gen2') {
        this.setState({ marks: configData.powerdetails.Gen2 })
        this.setState({ volumeFlow: 0 })
      } else {
        this.setState({ marks: configData.powerdetails.Gen1 })
        this.setState({ volumeFlow: 0 })
      }
      // this.finalPerformanceResult()
    })
  }

  finalPerformanceResult = () => {
    if (this.state.product === 'Gen1' && this.state.volumeFlow > 0) {
      this.setState({ power: configData.powerdetails.Gen1.filter(element => element.value === this.state.volumeFlow)[0].power * this.state.noOfBoxes })
      if (this.state.selectedOption === 'PM2.5') {
        this.setState({ cleanairdelivery: Math.round(this.state.volumeFlow * 0.55 * this.state.noOfBoxes) })
      }
      else {
        this.setState({ cleanairdelivery: Math.round(this.state.volumeFlow * 0.7 * this.state.noOfBoxes) })
      }
    }
    else if (this.state.product === 'Gen2' && this.state.volumeFlow > 0) {
      this.setState({ power: configData.powerdetails.Gen2.filter(element => element.value === this.state.volumeFlow)[0].power * this.state.noOfBoxes })
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
    this.setState({ avrgSpeedLimit: parseInt(e.value[1]) })
    this.setState({ airQualityIndex: parseInt(e.value[2]) })
    this.setState({ selectedOption: 'PM2.5' })
    this.setState({ city: e.value })
    this.finalPerformanceResult()
  }

  onAverageSpeedChange = (e, val) => {
    this.setState({ avrgSpeedLimit: val }, () => {
      this.finalPerformanceResult()
    })
  }
  onAiqChange = (e, val) => {
    this.setState({ airQualityIndex: val }, () => {
      this.finalPerformanceResult()
    })
  }
  onVFChange = (e, val) => {
    this.setState({ volumeFlow: val }, () => {
      this.finalPerformanceResult()
    })
  }

  handleDecrement = () => {
    this.setState({ noOfBoxes: this.state.noOfBoxes - 1 }, () => {
      this.finalPerformanceResult()
    })
  }
  handleIncrement = () => {
    this.setState({ noOfBoxes: this.state.noOfBoxes + 1 }, () => {
      this.finalPerformanceResult()
    })
  }
  
  onSelectFlag=(countryCode)=>{
    this.setState({selectedCountry:countryCode})
  }
  render() {

    const { avrgSpeedLimit, airQualityIndex, selectedOption, volumeFlow, cleanairdelivery, noOfBoxes, power, marks,selectedCountry } = this.state
    const filterdCities=data.Results.filter(element=>element.Country===selectedCountry)

    return (
      <div className="App">
        <Container maxWidth='sm'>
          <h1>MFDE Calculator</h1>
          <ReactFlagsSelect
            countries={configData.Countries}
            searchable={true}
            alignOptions="center" 
            onSelect={this.onSelectFlag}
            searchPlaceholder="Search for a country" />
          <CitiesDropdown
            cities={filterdCities}
            placeholder="select city"
            handleChange={this.handleChange}
          >
          </CitiesDropdown>
          <div>
            <Typography id="discrete-slider-always" gutterBottom>
              Average Vehicle Speed /KMPH
            </Typography>
            <MFDESlider avrgSpeedLimit={avrgSpeedLimit} onAverageSpeedChange={this.onAverageSpeedChange}
              aria-labelledby="discrete-slider-always"
            ></MFDESlider></div>
          <p></p>
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

          <div>
            <Typography id="discrete-slider-always" gutterBottom>
              Air Quality Index - µg/m3
            </Typography>
            <MFDESlider avrgSpeedLimit={airQualityIndex} onAverageSpeedChange={this.onAiqChange}
              aria-labelledby="discrete-slider-always"
            ></MFDESlider></div>
          <p></p>

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
          <div>
            <Typography id="discrete-slider-always" gutterBottom>
              Volume Flow - m3/hr
          </Typography>
            <MarkedSlider volumeFlow={volumeFlow} onVolumeFlowChange={this.onVFChange} marks={marks}
              aria-labelledby="discrete-slider-always"
            ></MarkedSlider></div>

          <p></p>

        No Of Boxes
        <p></p>

          <ButtonIncrement noOfBoxes={noOfBoxes} handleDecrement={this.handleDecrement} handleIncrement={this.handleIncrement} ></ButtonIncrement>
          <p></p>
          <p>Clean air delivery: {cleanairdelivery} m3/ hr</p>
          <p>Power Consumption: {power} watss</p>
        </Container>
      </div>
    );
  }
}
export default App;
