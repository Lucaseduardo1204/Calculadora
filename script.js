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


//pego o visor e armazeno ele dentro de uma variável
const visor = document.querySelector("#visor")


//Aqui eu crio 3 listas, todas com seus respectivos valores dentro uma para botões de 
//ações, uma para as teclas numeradas, e uma para os operadores
const botoesAcao = document.querySelectorAll("[data-acao]")
const teclas = document.querySelectorAll("[data-numero]")
const operacao = document.querySelectorAll("[data-operador]")

//Defino uma variável, não constante para montar a expressão
let expressao = ""

//verificação, caso tudo ocorreu bem, este deve exibir as listas com valores
console.log(botoesAcao)
console.log(teclas)
console.log(operacao)

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
    console.log(expressao)

    expressao += operadorSelecionado.innerText;
    visor.value += operadorSelecionado.innerText;
  })
})

console.log(expressao)

function limpar(){ //reseta a expressão e o visor
  expressao = ""
  visor.value = ""
}