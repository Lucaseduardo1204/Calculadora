//Esboço da lógica 

// Como uma calculadora funciona? 
// Digito um número -> insiro o tipo de operação -> digito outro número
// Se eu digitar um número e em seguida digitar outro, os números fazem parte de um só Ex "1" + "5" = 15 se eu digitar a operação
// então serão dois número distindos representados pela operação, ex: 1 + 5 = 6

// No evento de clique, deve-se salvar o número como string em uma variável (se clicado em outro número com a variável operador vazio) esse número soma no primeiro, apos 
// ao clicar em um objeto do tipo data-operador deve-se capturar o elemento e salvar o atributo na variável de operador a qual permite só um operador (com exceção do * 
// para multiplicação de números negativos), após, ao clicar em outro número, deve se seguir a lógica do primeiro, 
// 
//ao clicar no =, o sistema deve identificar o data-igual e com isso, executar o calcular 

//V1 do código, pegando todos os elementos e adicionando em variáveis

//Extrair valor de dentro dele
// const valorDaAcao = botaoLimpar.dataset.acao;


// *********************************VARIÁVEIS*************************************** 
// ********************************************************************************* 

//pego o visor e armazeno ele dentro de uma variável
const visor = document.querySelector("#visor")
const igual = document.querySelector("#resultado")
exibirNoVisor("") 

//Aqui eu crio 3 listas, todas com seus respectivos valores dentro uma para botões de 
//ações, uma para as teclas numeradas, e uma para os operadores
const botoesAcao = document.querySelectorAll("[data-acao]")
const teclas = document.querySelectorAll("[data-numero]")
const operacao = document.querySelectorAll("[data-operador]")


//Defino uma variável, não constante para montar a expressão
let expressao = ""
let expressaodividida;

//verificação, se deu certo, vai exibir as listas com valores
console.log(botoesAcao)
console.log(teclas)
console.log(operacao)


// *********************************EVENTOS*************************************** 
// ********************************************************************************* 


botoesAcao.forEach(function(acao){ // Dentro de botoesAcoes (lista), o forEach vai       
                                  // percorrer todos os itens

  acao.addEventListener('click', function(e){ //adiciona um listener para cada ação
                                              // que escuta quando clica na tecla e 
                                              // executa a função

    const botaoClicado = e.target; //define uma variavel que, ao clicar, recebe o valor
                                  // da ação
    
    console.log(botaoClicado.innerText) //Verificação dos valores 

    if(botaoClicado.innerText == "AC"){ //se o texto do botão clicado for AC
      limpar()                          // é limpa a expressão e o visor
    } else if(botaoClicado.innerText == "+/-"){
      console.log("clicou +/-")
    }else if(botaoClicado.innerText == "%"){
      console.log("Clicou porcentagem")
    }

  })
})

teclas.forEach(function(tecla){ // Dentro de teclas (lista), o forEach vai       
                                // percorrer todos os itens

  tecla.addEventListener('click', function(e){ //Pra cada tecla, adiciona o EventListener

    const numeroClicado = e.target;           // guarda o target no número clicado
    console.log(numeroClicado.innerText)      //imprime no console para verificação

    expressao += numeroClicado.innerText;     //A expressao recebe ela mesmo e o número 
                                              // clicado

    visor.value += numeroClicado.innerText;   //Atualiza o visor

  })
})

operacao.forEach(function(operador){
  operador.addEventListener('click', function(e){
    const operadorSelecionado = e.target;
  
    expressao += operadorSelecionado.innerText;
    visor.value += operadorSelecionado.innerText;
    console.log(expressao)
  })
})

console.log(expressao)

// Até o momento, capturei os eventos e os coloquei na variável expressão agora 
// preciso tratar a expressão, 
// primeiro passo, isolar primeiro número, operador  e segundo número
//REGEx
// DESCREVENDO OS NÚMEROS
//: número, um dígito sozinho é representado por \d (0 a 9), se haver a possibilidade
//de ter-se mais caracteres, deve-ser inserir o + após o \d (\d+)
//\.? Para números decimais, incluimos o (.), para caso seja opcional, incluimos o (?)]
// \d* → dígitos depois do ponto, mas agora com * em vez de +, porque depois do ponto pode não ter nenhum dígito (ou pode ter vários)
//FINAL: \d\.?\d*
// DESCEVER OS OPERADORES
// Para representar qualquer um dos possíveis operadores, o regex utiliza colchetes []
// que representa uma classe de caracteres (qualquer um dentre os colchetes)
//[+\-*/]
// JUNTAR TODOS
// Achar um número ou achar um operador: \d\.?\d* | [+\-*/]
// //g para percorrer a string inteira e pegar todas as ocorrências
// FINAL: /\d\.?\d*|[+\-*/]/g


// *********************************CONVERSÃO E REGRAS*************************************** 
// ******************************************************************************************


igual.addEventListener('click', function(e){
  expressaodividida = expressao.match(/\d\.?\d*|[+\-x/]/g) //Quando clicar em = expressão
                                                          //dividida recebe array dos elementos 

  primeiroNumero = parseFloat(expressaodividida[0])
  operador = expressaodividida[1]
  segundoNumero = parseFloat(expressaodividida[2])

  if(operador == "+"){
    somaTotal = somar(primeiroNumero, segundoNumero)
    exibirNoVisor(somaTotal)
  }else if(operador == "-"){
    subtracao = subtrair(primeiroNumero, segundoNumero)
    exibirNoVisor(subtracao)
  }else if(operador == "x"){
    multiplicado = multiplicar(primeiroNumero, segundoNumero)
    exibirNoVisor(multiplicado)
  }else if(operador == "/"){
    dividido = dividir(primeiroNumero, segundoNumero)
    exibirNoVisor(dividido)
  }
  
})

/* 
PROBLEMAS IDENTIFICADOS ATÉ O MOMENTO
- Numeros decimais não formatado até 2 casas decimais após o ponto
- Não aproveitamento do ultimo resultado pra nova operação
- Permitindo incluir sinais multiplos, como ++ XX, não se limita a um por operação
- se inserido 3 números, quebra
*/


console.log(expressaodividida) 
console.log(typeof(expressaodividida))


// FUNÇÕES

function exibirNoVisor(data){
  visor.value = data
}

function limpar(){ //reseta a expressão e o visor
  expressao = "";
  visor.value = "";
}

function somar(a, b){
  soma = a + b;
  return soma
}

function subtrair(a, b){
  subtracao = a - b;
  return subtracao
}

function multiplicar(a, b){
  multiplicacao =  a * b;
  return multiplicacao
}

function dividir(a, b){
  divisao = a / b
  return divisao
}