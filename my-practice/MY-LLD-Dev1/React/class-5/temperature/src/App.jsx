import React from 'react'
import './App.css'
import { useState } from 'react';

const App = () => {
  const [farh, setFarh] = useState(0);

  function CeltoFarHandler(event) {
    setFarh(((parseInt(event.target.value) * 9/5) + 32));
  }
  return (
    <>
    <h2>Temperature</h2>

    <section>

      <label>In Celcius</label>
      <input type="number" name="cel" onChange={CeltoFarHandler} />

      <label>In Farehheit</label>
      <input type="number" name="far" value={farh}/>


    </section>
    </>
    
  )
}

export default App