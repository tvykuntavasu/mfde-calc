import React from 'react';
import { Component } from 'react'
import data from './data/data.json'
import { CitiesDropdown } from './components/cities-dropdown/cities-dropdown.component'
import { CarouselComponent } from './components/carousel/carousel.component'
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      cities: [],
      city:[],
      selectedCity: '',
      avrgSpeedLimit: '0',
      selectedOption:'PM2.5', 
      airQualityIndex: '0'
    }

  }
  componentDidMount() {
    //console.log(this.cities)

  }

  onChangeValue = e=>{
    this.setState({selectedOption:e.target.value},()=>{
    if(this.state.selectedOption==='PM2.5'){
      this.setState({ airQualityIndex: this.state.city[2] })
      this.setState({showing:false})
    }
    else{     
      this.setState({ airQualityIndex: this.state.city[3] })
      this.setState({showing:true})
    }
    })
    
  }
  imageClick=e=>{
    console.log(e)
  }
 onSliderChange=e=>{
  this.setState({ airQualityIndex: e.target.value })
 }
  handleChange = e => {
    this.setState({ selectedCity: e.value[0] })
    this.setState({ avrgSpeedLimit: e.value[1] })
    this.setState({airQualityIndex:e.value[2]})
    this.setState({selectedOption:'PM2.5'})
    this.setState({city:e.value})
  }
  render() {

    const { avrgSpeedLimit,airQualityIndex,selectedOption } = this.state
    const settings = {
      dots: false,
      arrows:true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1
    };
    
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
          value={avrgSpeedLimit||null}
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
          onChange={this.onSliderChange}
        />  
        <p>{airQualityIndex} µg/m3</p>
        <CarouselComponent settings={settings} imageClick={this.imageClick}/>
      </div>
    );
  }
}

export default App;
