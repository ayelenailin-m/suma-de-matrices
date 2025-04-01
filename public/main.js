function generarInputs() {
    let filas = parseInt(document.getElementById("filas").value);
    let columnas = parseInt(document.getElementById("columnas").value);
    let contenedor = document.getElementById("matrices");
    contenedor.innerHTML = "";

    for (let m = 1; m <= 2; m++) {
        let matrizDiv = document.createElement("div");
        matrizDiv.innerHTML = `<h3>Matriz ${m}</h3>`;
        for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            matrizDiv.innerHTML += `<input type="number" id="m${m}_${i}_${j}" required>`;
        }
        matrizDiv.innerHTML += "<br>";
        }
        contenedor.appendChild(matrizDiv);
    }
    document.getElementById("btnSumar").style.display = "block";
}

function sumarMatrices() {
    let filas = parseInt(document.getElementById("filas").value);
    let columnas = parseInt(document.getElementById("columnas").value);

    if (!filas || !columnas) {
        alert("Por favor, ingrese el número de filas y columnas.");
        return;
    }

    let matriz1 = [],
        matriz2 = [];

    for (let i = 0; i < filas; i++) {
        let fila1 = [],
        fila2 = [];
        for (let j = 0; j < columnas; j++) {
        fila1.push(parseFloat(document.getElementById(`m1_${i}_${j}`).value));
        fila2.push(parseFloat(document.getElementById(`m2_${i}_${j}`).value));
        }
        matriz1.push(fila1);
        matriz2.push(fila2);
    }

    fetch("/sumar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ matriz1, matriz2 }),
    })
        .then((response) => response.json())
        .then((data) => {
        let resultadoDiv = document.getElementById("resultado");
        resultadoDiv.innerHTML = "<h3>Matriz Resultado</h3>";
        data.resultado.forEach((fila) => {
            resultadoDiv.innerHTML += fila.join(" ") + "<br>";
        });
        });
}