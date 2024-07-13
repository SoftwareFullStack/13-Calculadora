let pantalla = document.getElementById('pantalla');
let operador = '';
let valorInicial = null;
let valorPrevio = null;
let inicioSegundoValor = false;
let nuevoCalculo = false;
let operacionPendiente = false;

function formatearNumero(numero) {
    // Primero, convertimos el input a un número si es una cadena
    let num = typeof numero === 'string' ? parseFloat(numero) : numero;
    
    // Verificamos si es un número válido
    if (isNaN(num)) {
        return 'Error';
    }
    
    // Ahora podemos usar toFixed con seguridad
    let numeroFormateado = parseFloat(num.toFixed(10));
    return numeroFormateado.toString();
}

document.querySelectorAll('.click').forEach(boton => {
    boton.addEventListener('click', () => {
        console.log(`Click en el boton: ${boton.value}`);
        mostrarValor(boton.value);
    });
});

let mostrarValor = (valor) => {
    if (valor === '+' || valor === '-' || valor === 'x' || valor === '÷') {
        manejarOperacion(valor);
    } else if (valor === '.') {
        if (inicioSegundoValor || nuevoCalculo) {
            pantalla.value = '0.';
            inicioSegundoValor = false;
            nuevoCalculo = false;
        } else if (pantalla.value.indexOf('.') === -1) {
            pantalla.value += '.';
        }
    } else {
        if (inicioSegundoValor || nuevoCalculo) {
            pantalla.value = valor;
            inicioSegundoValor = false;
            nuevoCalculo = false;
        } else {
            if (pantalla.value === '0') {
                pantalla.value = valor;
            } else {
                pantalla.value += valor;
            }
        }
        operacionPendiente = true;
    }
};

let manejarOperacion = (oper) => {
    console.log(`Click en boton ${oper}`);
    let inputValue = parseFloat(pantalla.value);
    
    if (valorInicial === null) {
        valorInicial = inputValue;
    } else if (operador && operacionPendiente) {
        valorInicial = realizarOperacion(valorInicial, inputValue, operador);
        pantalla.value = formatearNumero(valorInicial);
    }
    
    operador = oper;
    inicioSegundoValor = true;
    nuevoCalculo = false;
    operacionPendiente = false;
};

let realizarOperacion = (a, b, op) => {
    // Convertimos a y b a números si son cadenas
    let numA = typeof a === 'string' ? parseFloat(a) : a;
    let numB = typeof b === 'string' ? parseFloat(b) : b;
    
    let resultado;
    switch (op) {
        case '+': resultado = numA + numB; break;
        case '-': resultado = numA - numB; break;
        case 'x': resultado = numA * numB; break;
        case '÷': resultado = numB !== 0 ? numA / numB : 'Error';
    }
    return resultado === 'Error' ? resultado : formatearNumero(resultado);
};

document.getElementById('suma').addEventListener('click', () => manejarOperacion('+'));
document.getElementById('resta').addEventListener('click', () => manejarOperacion('-'));
document.getElementById('multiplicacion').addEventListener('click', () => manejarOperacion('x'));
document.getElementById('dividision').addEventListener('click', () => manejarOperacion('÷'));

document.getElementById('igual').addEventListener('click', () => {
    console.log("Click en boton IGUAL");
    if (operador && valorInicial !== null) {
        let valorDos;
        if (nuevoCalculo) {
            valorDos = parseFloat(valorPrevio);
        } else {
            valorDos = parseFloat(pantalla.value);
            valorPrevio = valorDos;
        }

        let resultado = realizarOperacion(valorInicial, valorDos, operador);
        console.log("El resultado es: " + resultado);
        pantalla.value = formatearNumero(resultado);
        valorInicial = parseFloat(resultado);
        nuevoCalculo = true;
        operacionPendiente = false;
    } else if (nuevoCalculo && valorPrevio !== null) {
        let resultado = realizarOperacion(valorInicial, parseFloat(valorPrevio), operador);
        console.log("Repitiendo operación. El resultado es: " + resultado);
        pantalla.value = formatearNumero(resultado);
        valorInicial = parseFloat(resultado);
    }
});

document.getElementById('punto').addEventListener('click', () => {
    console.log("Click en boton PUNTO");
    if (inicioSegundoValor || nuevoCalculo) {
        pantalla.value = '0.';
        inicioSegundoValor = false;
        nuevoCalculo = false;
    } else if (pantalla.value.indexOf('.') === -1) {
        pantalla.value += '.';
    }
});

document.getElementById("porcentaje").addEventListener('click', () =>{
    console.log("Click en boton PORCENTAJE");
    if (pantalla.value !== '0' && pantalla.value !== '') {
        if (valorInicial !== null) {
            let segundoValor = parseFloat(pantalla.value);
            let porcentaje = (valorInicial * segundoValor) / 100;
            pantalla.value = formatearNumero(porcentaje);
            valorInicial = porcentaje;
            operador = '';  // Reinicie el operador para garantizar que la siguiente operación se realice correctamente.
            inicioSegundoValor = false;
            nuevoCalculo = true;
            operacionPendiente = true;
        }
    }
});


document.getElementById('clear').addEventListener('click', () => {
    pantalla.value = '0';
    valorInicial = null;
    valorPrevio = null;
    operador = '';
    inicioSegundoValor = false;
    nuevoCalculo = false;
    operacionPendiente = false;
    console.log("Se ha reiniciado la calculadora");
});