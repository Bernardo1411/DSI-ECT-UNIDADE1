"use strict";

const inputName = document.getElementById('nomeInput');
const inputAge = document.getElementById('idadeInput');
const inputWeight = document.getElementById('weightInput');
const inputHeight = document.getElementById('heightInput');
const buttonSubmit = document.getElementById('submitButton');

inputName.onchange = function(){
    const name = inputName.value;
    const pattern = /^[a-z]{3,18}$/i;

    if(!pattern.test(name)) {
        inputName.classList.add("invalid");
    } else {
        inputName.classList.remove("invalid");
    }
}

inputAge.onchange = function(){
    const age = inputAge.value;
    const pattern = /^[0-9]{1,2}$/;

    if(!pattern.test(age)) {
        inputAge.classList.add("invalid");
    } else {
        inputAge.classList.remove("invalid");
    }
}

inputWeight.onchange = function(){
    const weight = inputWeight.value;
    const pattern = /^[0-9]{1,3}$/;

    if(!pattern.test(weight)) {
        inputAge.classList.add("invalid");
    } else {
        inputAge.classList.remove("invalid");
    }
}

inputHeight.onchange = function(){
    const height = inputHeight.value;
    const pattern = /^[0-9]{1,3}$/;

    if(!pattern.test(height)) {
        inputAge.classList.add("invalid");
    } else {
        inputAge.classList.remove("invalid");
    }
}

buttonSubmit.onclick = async function(event){
    event.preventDefault();
    const name = inputName.value;
    const age = inputAge.value;
    const weight = inputWeight.value;
    const height = inputHeight.value;

    const rawResponse = await fetch('http://localhost:3000/imc', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, age, weight, height}),
      });
    
    const response = await rawResponse.json();

    const {name: responseName, category, backgroundColor, imc} = response;

    
}
