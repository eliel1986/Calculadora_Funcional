/* textContent = propriedade que mostra o valor 
 .replace = substituir 
 toLocaleString = utiliza símbolo decimal do país definido 
 keydown = evento de pressionar tecla do teclado 
 indexOf = verifica se existe (-1 quando não existe, != -1 quando existe) 
 .keys = extrai de um objeto, somente as chaves */





 'use strict' // modo restrito JavaScript, mais rigoroso com erros comuns //

// capturando display //
const display = document.getElementById('display');

// querySelectorAll('[id*=tecla]'); seleciona elementos que contém tecla em parte do id //
const numeros = document.querySelectorAll('[id*=tecla]');

const operadores = document.querySelectorAll('[id*=operador]');

// inserindo primeiro número no display. Booleano //
let novoNumero = true;

// guardar operador //
let operador;

// guardar numero já digitado //
let numeroAnterior;

const operacaoPendente = () => operador !== undefined;

// variavel para operacoes de calculos //
const calcular = () => {
	if (operacaoPendente()) {
		const numeroAtual = parseFloat(display.textContent.replace(',' , '.'));
		novoNumero = true;

		// maneira 1 de realizar o cálculo //
		// if (operador == '+') {
		// 	atualizarDisplay(numeroAnterior + numeroAtual);
		// } else if (operador == '-') {
		// 	atualizarDisplay(numeroAnterior - numeroAtual);
		// } else if (operador == '*') {
		// 	atualizarDisplay(numeroAnterior * numeroAtual);
		// } else if (operador == '/') {
		// 	atualizarDisplay(numeroAnterior / numeroAtual);
		// }

		// maneira 2 de realizar o cálculo (com recurso nativo eval) //
		const resultado = eval (`${numeroAnterior}${operador}${numeroAtual}`);
		atualizarDisplay(resultado);
	}
}

// inserindo valores concatenados no display //
const atualizarDisplay = (texto) => {
	if (novoNumero) {
		display.textContent = texto.toLocaleString('BR');
		novoNumero = false;
	} else {
		display.textContent += texto.toLocaleString('BR');
	}
}

// inserir valores no display //
const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);

// forEach: varre todos elementos de um array //
numeros.forEach (numero => numero.addEventListener('click', inserirNumero));

// seleção de operador, limpa a tela após clique de operador //
const selecionarOperador = (evento) => {
	// só ira funcionar operador, se houver número novo digitado //
	if (!novoNumero) {
		calcular();
		novoNumero = true;
		operador = evento.target.textContent; // armazenando operador //
		numeroAnterior = parseFloat(display.textContent.replace(',' , '.')); // armazenando numero anterior //
	}
}

// forEach: varre todos elementos de um array //
operadores.forEach (operador => operador.addEventListener('click', selecionarOperador));

// criando função para botão igual //
const ativarIgual = () => {
	calcular();
	operador = undefined; // após clicar em igual, inativa os botões de operações //
}
document.getElementById('igual').addEventListener('click', ativarIgual);

// botão para limpar display //
const limparDisplay = () => display.textContent = '';
document.getElementById('limparDisplay').addEventListener('click', limparDisplay);

// botão para apagar todo calculo //
const apagarTudo = () => {
	limparDisplay();
	operador = undefined;
	novoNumero = true;
	numeroAnterior = undefined;
}
document.getElementById('apagarTudo').addEventListener('click', apagarTudo);

// apagando dígito a dígito da direita para esquerda //
const backspace = () => display.textContent = display.textContent.slice(0, -1);
document.getElementById('backspace').addEventListener('click', backspace);

// botão para trocar sinal do número //
const trocarSinal = () => {
	novoNumero = true;
	atualizarDisplay(display.textContent.replace(',' , '.') * -1);	
}
document.getElementById('trocarSinal').addEventListener('click', trocarSinal);

// botão para decimais //
const existeDecimal = () => display.textContent.indexOf(',') !== -1;
const existeValor = () => display.textContent.length > 0;
const inserirDecimal = () => {
    if (!existeDecimal()) {
        if (novoNumero) {
            atualizarDisplay('0,');
        } else {
            atualizarDisplay(',');
        }
    }
};
document.getElementById('decimal').addEventListener('click', inserirDecimal);

// opção de usar teclado na calculadora //
const mapaTeclado = {
	'0' 				: 'tecla0',
	'1' 				: 'tecla1',
	'2' 				: 'tecla2',
	'3' 				: 'tecla3',
	'4' 				: 'tecla4',
	'5' 				: 'tecla5',
	'6' 				: 'tecla6',
	'7' 				: 'tecla7',
	'8' 				: 'tecla8',
	'9' 				: 'tecla9',
	'+' 				: 'operadorAdicao',
	'-' 				: 'operadorSubtracao',
	'*' 				: 'operadorMultiplicacao',
	'/' 				: 'operadorDivisao',
	'=' 				: 'igual',
	'Enter' 		: 'igual',
	',' 				: 'decimal',
	'c' 				: 'apagarTudo',
	'Escape' 		: 'limparDisplay',
	'Backspace' : 'backspace',
	'Shift' 				: 'trocarSinal',
}

const mapearTeclado = (evento) => {
	const tecla = evento.key;
	const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) !== -1;
	if (teclaPermitida()) document.getElementById(mapaTeclado[tecla]).click();
}

document.addEventListener('keydown', mapearTeclado);
