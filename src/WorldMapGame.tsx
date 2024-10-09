import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import { Alert, AlertDescription } from './components/ui/alert';

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const colorScale = scaleLinear()
  .domain([0, 100])
  .range(["#ffedea", "#ff5233"]);

interface ArmyUnits {
  [country: string]: number;
}

const WorldMapGame: React.FC = () => {
  const [playerCountry, setPlayerCountry] = useState(null);
  const [armyUnits, setArmyUnits] = useState({});
  const [gameStarted, setGameStarted] = useState(false);
  const [gameTime, setGameTime] = useState(0);
  const [attackTarget, setAttackTarget] = useState('');
  const [attackUnits, setAttackUnits] = useState(0);
  const [gameMessage, setGameMessage] = useState('');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameStarted && playerCountry) {
      interval = setInterval(() => {
        setGameTime((prevTime) => prevTime + 1);
        setArmyUnits((prevUnits) => ({
          ...prevUnits,
          [playerCountry]: (prevUnits[playerCountry] || 0) + 1,
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, playerCountry]);

  const handleCountryClick = (geo: any) => {
    if (!gameStarted) {
      setPlayerCountry(geo.properties.name);
      setGameStarted(true);
      setArmyUnits({ [geo.properties.name]: 0 });
    }
  };

  const handleAttack = () => {
    if (attackTarget && attackUnits > 0 && playerCountry) {
      if (armyUnits[playerCountry] >= attackUnits) {
        setArmyUnits((prevUnits) => ({
          ...prevUnits,
          [playerCountry]: prevUnits[playerCountry] - attackUnits,
        }));
        setGameMessage(`Attacked ${attackTarget} with ${attackUnits} units!`);
      } else {
        setGameMessage("Not enough units to attack!");
      }
    }
  };

  return (
    
      World Map Game
      {!gameStarted ? (
        Click on a country to start the game
      ) : (
        
          Your country: {playerCountry}
          Game time: {gameTime} seconds
          Army units: {playerCountry ? armyUnits[playerCountry] : 0}
          
            <select 
              value={attackTarget} 
              onChange={(e) => setAttackTarget(e.target.value)}
              className="mr-2 p-2 border rounded"
            >
              Select target country
              {Object.keys(armyUnits).filter(c => c !== playerCountry).map((country) => (
                
                  {country}
                
              ))}
            
            <input
              type="number"
              value={attackUnits}
              onChange={(e) => setAttackUnits(parseInt(e.target.value))}
              className="mr-2 p-2 border rounded"
              placeholder="Units to attack"
            />
            
              Attack
            
          
        
      )}
      {gameMessage && (
        
          {gameMessage}
        
      )}
      
        
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={playerCountry === geo.properties.name ? colorScale(armyUnits[playerCountry] || 0) : "#F5F4F6"}
                stroke="#D6D6DA"
                style={{
                  default: { outline: "none" },
                  hover: { outline: "none", fill: "#F53" },
                  pressed: { outline: "none", fill: "#E42" },
                }}
                onClick={() => handleCountryClick(geo)}
              />
            ))
          }
        
      
    
  );
};

export default WorldMapGame;