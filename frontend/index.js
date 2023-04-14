"use strict";

const inputName = document.getElementById('nomeInput');
const inputAge = document.getElementById('idadeInput');
const inputWeight = document.getElementById('weightInput');
const inputHeight = document.getElementById('heightInput');
const buttonSubmit = document.getElementById('submitButton');
const divImc = document.getElementById('imcDiv');
const divForm = document.getElementById('divForm');
const headerIMC = document.createElement("h2");
const IMCValue = document.createElement("h3");
const contentClassify = document.createElement("h3");
const errorMessage = document.createElement("p");

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
        inputWeight.classList.add("invalid");
    } else {
        inputWeight.classList.remove("invalid");
    }
}

inputHeight.onchange = function(){
    const height = inputHeight.value;
    const pattern = /^[0-9]{1,3}$/;

    if(!pattern.test(height)) {
        inputHeight.classList.add("invalid");
    } else {
        inputHeight.classList.remove("invalid");
    }
}

buttonSubmit.onclick = async function(event){
    event.preventDefault();
    const name = inputName.value;
    const age = inputAge.value;
    const weight = inputWeight.value;
    const height = inputHeight.value;

    const nameInvalid = inputName.classList.value.includes("invalid") || name === '';
    const ageInvalid = inputAge.classList.value.includes("invalid") || age === '';
    const weightInvalid = inputWeight.classList.value.includes("invalid") || weight === '';
    const heightInvalid = inputHeight.classList.value.includes("invalid") || height === '';

    if(!nameInvalid && !ageInvalid && !weightInvalid && !heightInvalid){
    errorMessage.innerText = ""

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

    divForm.style.width = '50%';
    divForm.style.height = '80%';
    
    divImc.style.backgroundColor = backgroundColor;
    divImc.style.minWidth = '310px';
    divImc.style.width = '50%';
    divImc.style.height = '80%';
    
    divImc.appendChild(headerIMC);
    divImc.appendChild(IMCValue);
    divImc.appendChild(contentClassify);

    setTimeout(() => {
        headerIMC.innerText = `O IMC de ${responseName} é: `;
        IMCValue.innerText = imc;
        contentClassify.innerText = `Faixa etária: ${category}`;
    }, 1500);
} else {
    errorMessage.innerText = "Campo(s) inválido(s)!";

    divForm.appendChild(errorMessage);
}

}
