import React, { useState } from 'react';
import axios from 'axios';



// 1st letsd import our url for our api, and insert our personalised api key//

function App() {

  const [data,setData]= useState({})

  //we want our user to be able to enter a location (a string) and find our info about its other props://
  const [location, setLocation] = useState('')

  //replace our example of dallas with our variable location, which we will code into being the use input 
  // import units=metric to convert our temp to degrees
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=cace2dac862ce0d570a8b19bc7864887` 

  const searchLocation= (event) => {
    if (event.key=== 'Enter'){
      axios.get(url).then((response)=>{
        setData(response.data)
        console.log(response.data )
      })
      setLocation('') //this will empty searchbar after each search
    }
  }


  return (
    <div className="App">
      <div className="Search">
       <input
      defaultValue={location}
      onChange={event=> setLocation(event.target.value)}
      onKeyPress= {searchLocation}
      placeholder = 'Enter location'
      type ="text"/>
     </div>
      <div className="container">
        <div className='top'>
          <div className='location'>
            <p>{data.name}</p>
          </div>
          <div className='temp'>
            {data.main ? <h1>{data.main.temp.toFixed()} °C</h1> : null }  
          </div>
          <div className='description'>
            {data.weather ? <p>{data.weather[0].main}</p> :null}
          </div>
        </div>

        {/* lets create a method so our bottom part doesn't show until city is entered */}
        {data.name !=undefined &&
        <div className='bottom'>
            <div className='feels'>
              {data.main ? <p>{data.main.feels_like.toFixed()}</p> :null}
               <p>Feels Like</p>
            </div>
    
            <div className='humidity'>
              {data.main ? <p>{data.main.humidity}%</p> :null}
               <p>humidity</p>
            </div>
           <div className='wind'>
              {data.main ? <p>{data.wind.speed}MPH</p> :null}
              <p>Wind Speed</p>
            </div>
        </div>
        }
    
      </div>
    </div>
  );
}

export default App;
