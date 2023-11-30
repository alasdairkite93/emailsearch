import { useState } from 'react';
import './App.css';

function ListInput() {
  const [formFields, setFormFields] = useState([
    { url: ''},
  ])

  const handleFormChange = (event, index) => {
    let data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
  }


   const submit = (e) => {
    e.preventDefault();
    console.log('Form fields: ', formFields);
      // eslint-disable-next-line no-unused-expressions
            fetch('/file', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formFields),
        }).then(response => response.json())
                .then(data => {
                    createTable(data);
                })
  }

  const addFields = () => {
    let object = {
      url: ''
    }

    setFormFields([...formFields, object])
  }

  const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1)
    setFormFields(data)
  }

  const createTable = (results) => {
      console.log('Results for table: ', results)
      const tbl = document.createElement('table');
      tbl.style.width = '250px';
      tbl.style.border = '1px solid black';
      for (let i=0; i<results.length; i++){
          console.log('loop ind: ', i, ' results[i]: ', results[i]);
          const tr = tbl.insertRow();
          const td = tr.insertCell();
          td.appendChild(document.createTextNode(results[i]));
          tr.appendChild(td);
          tbl.appendChild(tr);
      }

      results = document.getElementById('results');
      results.appendChild(tbl);
  }

  return (
    <div className="App" >
        <h1>Email Extractor</h1>
        <p>Retrieve emails from a web site without having to even visit it. Simples.</p>
        <br/>
        <div styles="padding:75% 0 0 0;position:relative;">
            <iframe
                src="https://res.cloudinary.com/dsfypcapq/video/upload/v1700086798/Screen_Recording_2023-11-14_at_17.43.07_gs6yar.mp4"
                frameBorder="0" allow="autoplay; fullscreen; picture-in-picture"
                styles="position:absolute;top:0;left:0;width:200px;height:200px;" title="emailextractor"></iframe>
        </div>
        <br/>
        <br/>
        <form onSubmit={submit}>
        {formFields.map((form, index) => {
          return (
            <div key={index}>
              <input
                  type="text"
                name='url'
                placeholder='URL'
                onChange={event => handleFormChange(event, index)}
              />
              <button onClick={() => removeFields(index)}>Remove</button>
                <br/>
                <br/>
            </div>
          )
        })}
      </form>
        <br />
      <button onClick={addFields}>Add More..</button>      <button onClick={submit}>Submit</button>
        <div id="results">

      </div>
    </div>


  );
}

export default ListInput;