import React, { useState, useEffect } from 'react';
import carJson from './car';
import './App.css';

const App = () => {
  const [slots, setSlots] = useState('');
  const [carParked, setCarParked] = useState('');
  const [carNumber, setCarNumber] = useState('');
  const [color, setColor] = useState('');
  const [cars, setCars] = useState([]);
  const [searchCar, setSearchCar] = useState(null);

  useEffect(() => {
    setCars(carJson);
    //eslint-disable-next-line
  }, []);

  const onSubmit = () => {
    console.log(slots, carParked, cars);
  };

  const onSearch = () => {
    const newLook = cars.filter(
      car => car.car_number === carNumber || car.color === color
    );
    setCars(newLook);
  };

  const onClear = () => {
    if (carNumber !== '' || color !== '') {
      setCarNumber('');
      setColor('');
    }
  };

  const onReset = () => {
    console.log('clicked');
    onClear();
    setCars(carJson);
  };

  const onAdd = () => {
    var newSlot = cars.reduce((acc, curr) => {
      if (acc < curr.slot_number) acc = curr.slot_number;
      return acc;
    }, 0);

    var newData = {
      id: newSlot + 1,
      car_number: carNumber,
      color: color,
      slot_number: newSlot + 1,
      date: new Date().toLocaleString(),
    };

    if (carNumber !== '' || color !== '') {
      var addOn = [...cars, newData];
      setCars(addOn);
      var newSlot = carParked + 1;
      setCarParked(newSlot);
    }
    onClear();
  };

  const onDelete = i => {
    console.log(i);
  };

  if (slots === '' || carParked === '') {
    return (
      <div className="center complete_view">
        <h4>Enter the Parking Details.</h4>
        <form className="center">
          <div className="input-form">
            <label htmlFor="slots">No. of parking slots: </label>
            <input
              type="text"
              name="slots"
              value={slots}
              onChange={e => setSlots(+e.target.value)}
            />
          </div>

          <div className="input-form">
            <label htmlFor="slots">No. of car parked: </label>
            <input
              type="text"
              name="slots"
              value={carParked}
              onChange={e => setCarParked(+e.target.value)}
            />
          </div>

          <button className="button" href="#!" type="button" onClick={onSubmit}>
            Enter
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="main_container">
      <nav>
        <header>Automated Parking Tool</header>
      </nav>

      <div>
        <h4>Current Status</h4>
        <p>
          Number of parking places: <span>{slots}</span>
        </p>
        <p>
          Number of parked car: <span>{carParked}</span>
        </p>
      </div>

      <div className="search">
        <form>
          <input
            type="text"
            name="car_number"
            value={carNumber}
            onChange={e => setCarNumber(e.target.value)}
            placeholder="Type Reg No."
          />
          <input
            type="text"
            name="color"
            value={color}
            onChange={e => setColor(e.target.value)}
            placeholder="Enter Color"
          />
          <button className="button" type="button" onClick={onSearch}>
            Search
          </button>
          <button className="button" type="button" onClick={onReset}>
            Reset
          </button>
          <button className="button" type="button" onClick={onAdd}>
            Add
          </button>
        </form>
      </div>

      <div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Car No.</th>
              <th>Color</th>
              <th>Slot No.</th>
              <th>Date Time</th>
              <th>Delete the entry</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((carEntry, i) => (
              <tr key={carEntry.id}>
                <td>{carEntry.id}</td>
                <td>{carEntry.car_number}</td>
                <td>{carEntry.color}</td>
                <td>{carEntry.slot_number}</td>
                <td>{carEntry.date}</td>
                <td>
                  <a href="#!" className="button" onClick={onDelete(i)}>
                    Remove
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
