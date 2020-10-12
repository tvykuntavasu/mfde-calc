import React from 'react';
import { Component } from 'react'
import Button from "@material-ui/core/Button";
import data from './data/data.json'
import configData from './data/configdata.json'
import Typography from "@material-ui/core/Typography";
import Container from '@material-ui/core/Container';
import { CitiesDropdown } from './components/cities-dropdown/cities-dropdown.component'
import { MFDESlider } from './components/input-slider/input-slider.component'
import { MarkedSlider } from './components/marked-slider/marked-slider.component'
import { ButtonIncrement } from './components/increment/increment.component'
import { MFDESelect } from './components/mfde-select/mfde-select.component'
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/css/react-flags-select.css';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      requiredExchaustEmission: 0,
      requiredTotalEmission: 0,
      onExchaustEmission: 0,
      onTotalEmission: 0,
      Exchaust: 0,
      NonExchaust: 0,
      TotalExchaust: 0,
      cities: [],
      city: [],
      selectedCity: '',
      avrgSpeedLimit: 0,
      selectedOption: 'PM2.5',
      airQualityIndex: 0,
      vehicleType: 'Buses',
      normType: 'EUR6',
      product: 'Gen1',
      volumeFlow: 0,
      power: 0,
      cleanairdelivery: 0,
      powerconsumption: '',
      noOfBoxes: 1,
      selectedCountry: '',
      marks: configData.powerdetails.Gen1
    }
  }
  componentDidMount() {
    this.calculation()
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
      this.calculation()
      this.finalPerformanceResult()
    })

  }
  handleVehicleChange = e => {
    this.setState({ vehicleType: e.value }, () => {
      this.calculation()
      this.finalPerformanceResult()
    })
  }
  handleNormChange = e => {
    this.setState({ normType: e.value }, () => {
      this.calculation()
      this.finalPerformanceResult()
    })
  }
  handleProductChange = e => {
    this.setState({ product: e.value }, () => {
      this.setState({ power: 0 })
      this.setState({ cleanairdelivery: 0 })
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

  calculation = () => {
    var ExhaustData = configData.vehicleTypes.filter(element => element.value === this.state.vehicleType)[0][this.state.vehicleType][0]

    this.setState({ Exchaust: ExhaustData[this.state.selectedOption][0][this.state.normType], NonExchaust: ExhaustData[this.state.selectedOption][0]["Non-exhaustsum"] }, () => {
      this.setState({ TotalExchaust: this.state.Exchaust + this.state.NonExchaust }, () => {
        if (this.state.avrgSpeedLimit !== 0 && this.state.airQualityIndex !== 0) {
          this.setState({
            requiredExchaustEmission: this.state.Exchaust * this.state.avrgSpeedLimit / 2 / this.state.airQualityIndex * 1000,
            requiredTotalEmission: this.state.NonExchaust * this.state.avrgSpeedLimit / 2 / this.state.airQualityIndex * 1000
          }, () => {
            console.log(this.state.requiredExchaustEmission)
            console.log(this.state.requiredTotalEmission)
          })
        }
      })
    })

    //this.setState({Exchaust :configData.vehicleTypes.filter(element=>element.value===this.state.vehicleType)[0].this.state.vehicleType[0].this.state.normType})
  }

  finalPerformanceResult = () => {
    if (this.state.product === 'Gen1' && this.state.volumeFlow > 0) {
      this.setState({ power: configData.powerdetails.Gen1.filter(element => element.value === this.state.volumeFlow)[0].power * this.state.noOfBoxes })
      if (this.state.selectedOption === 'PM2.5') {
        this.setState({
          cleanairdelivery: Math.round(this.state.volumeFlow * configData.ElementClass["PM2.5"].Gen1 * this.state.noOfBoxes),
          onExchaustEmission: Math.round(this.state.volumeFlow * configData.ElementClass["PM2.5"].Gen1 / this.state.requiredExchaustEmission * this.state.noOfBoxes * 100).toFixed(2),
          onTotalEmission: Math.round(this.state.volumeFlow * configData.ElementClass["PM2.5"].Gen1 / this.state.requiredTotalEmission * this.state.noOfBoxes * 100).toFixed(2)
        })

      }
      else {
        this.setState({
          cleanairdelivery: Math.round(this.state.volumeFlow * configData.ElementClass.PM10.Gen1 * this.state.noOfBoxes),
          onExchaustEmission: Math.round(this.state.volumeFlow * configData.ElementClass.PM10.Gen1 / this.state.requiredExchaustEmission * this.state.noOfBoxes * 100).toFixed(2),
          onTotalEmission: Math.round(this.state.volumeFlow * configData.ElementClass.PM10.Gen1 / this.state.requiredTotalEmission * this.state.noOfBoxes * 100).toFixed(2)
        })

      }
    }
    else if (this.state.product === 'Gen2' && this.state.volumeFlow > 0) {
      this.setState({ power: configData.powerdetails.Gen2.filter(element => element.value === this.state.volumeFlow)[0].power * this.state.noOfBoxes })
      if (this.state.selectedOption === 'PM2.5') {
        this.setState({
          cleanairdelivery: Math.round(this.state.volumeFlow * configData.ElementClass["PM2.5"].Gen2 * this.state.noOfBoxes),
          onExchaustEmission: Math.round(this.state.volumeFlow * configData.ElementClass["PM2.5"].Gen2 / this.state.requiredExchaustEmission * this.state.noOfBoxes * 100).toFixed(2),
          onTotalEmission: Math.round(this.state.volumeFlow * configData.ElementClass["PM2.5"].Gen2 / this.state.requiredTotalEmission * this.state.noOfBoxes * 100).toFixed(2)
        })

      }
      else {
        this.setState({
          cleanairdelivery: Math.round(this.state.volumeFlow * configData.ElementClass.PM10.Gen2 * this.state.noOfBoxes),
          onExchaustEmission: Math.round(this.state.volumeFlow * configData.ElementClass.PM10.Gen2 / this.state.requiredExchaustEmission * this.state.noOfBoxes * 100).toFixed(2),
          onTotalEmission: Math.round(this.state.volumeFlow * configData.ElementClass.PM10.Gen2 / this.state.requiredTotalEmission * this.state.noOfBoxes * 100).toFixed(2)
        })

      }
    }
  }
  handleChange = e => {
    this.setState({ selectedCity: e.value[0] })
    this.setState({ avrgSpeedLimit: parseInt(e.value[1]) })
    this.setState({ airQualityIndex: parseInt(e.value[2]) })
    this.setState({ selectedOption: 'PM2.5' })
    this.setState({ city: e.value })
    this.calculation()
    this.finalPerformanceResult()
  }

  onAverageSpeedChange = (e, val) => {
    this.setState({ avrgSpeedLimit: val }, () => {
      this.calculation()
      this.finalPerformanceResult()
    })
  }
  onAiqChange = (e, val) => {
    this.setState({ airQualityIndex: val }, () => {
      this.calculation()
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

  onSelectFlag = (countryCode) => {
    console.log(this.state.selectedCity)
    this.setState({ selectedCountry: countryCode, selectedCity: null }, () => {
      this.setState({ avrgSpeedLimit: 0 })
      this.setState({ airQualityIndex: 0 })
      console.log(this.state.selectedCity)
    })
  }
  render() {

    const { avrgSpeedLimit, airQualityIndex, selectedOption, volumeFlow, cleanairdelivery, noOfBoxes, power, marks, selectedCountry, onExchaustEmission, onTotalEmission } = this.state
    const filterdCities = data.Results.filter(element => element.Country === selectedCountry)

    return (
      <div className="App">
        <Container maxWidth='sm'>
          <h1>Emission Compensation Calculator</h1>
          <ReactFlagsSelect
            countries={configData.Countries}
            searchable={true}
            alignOptions="center"
            onSelect={this.onSelectFlag}
            selectedSize={25}
            optionsSize={14}
            searchPlaceholder="Search for a country" />
          <CitiesDropdown
            cities={filterdCities}
            placeholder="select city"
            handleChange={this.handleChange}
          >
          </CitiesDropdown>
          <p /><p />
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
              Fine dust concentration - µg/m3
            </Typography>
            <MFDESlider avrgSpeedLimit={airQualityIndex} onAverageSpeedChange={this.onAiqChange}
              aria-labelledby="discrete-slider-always"
            ></MFDESlider></div>
          <p></p>

        Select Vehicle

        <MFDESelect
            optionsData={configData.vehicleTypes}
            onChange={this.handleVehicleChange}
            defaultLabel="Buses"
            defaultValue="Buses"
          >
          </MFDESelect><p></p>
        Select Emission Norm
        <MFDESelect
            optionsData={configData.EmissionNorms}
            onChange={this.handleNormChange}
            defaultLabel="EUR6"
            defaultValue="EUR6"
          >
          </MFDESelect><p></p>
      Select Product
        <MFDESelect
            optionsData={configData.products}
            onChange={this.handleProductChange}
            defaultLabel="Pure air - rear delivery"
            defaultValue="Gen1"
          >
          </MFDESelect><p></p>
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
          <Button variant="contained" size="medium" color="primary" fullWidth="true">
            Clean air delivery rate: {cleanairdelivery} m3/ hr
          </Button>
          <p></p>

          <Button variant="contained" size="medium" color="primary" fullWidth="true">
            Power Consumption: {power} watts
          </Button>
          <p></p>
          <Button variant="contained" size="medium" color="primary" fullWidth="true">
            On Exhaust Emission : {onExchaustEmission}%
          </Button>
          <p></p>
          <Button variant="contained" size="medium" color="primary" fullWidth="true">
            On Total Exhaust Emission : {onTotalEmission}%
          </Button>
          <p></p>

        </Container>
      </div>
    );
  }
}
export default App;
