// Definindo um objeto chamado "validator".
const validator = {
  // Definindo um método chamado "isValid" que recebe um parâmetro "value".
  isValid: (value) => {
    // Verifica se o comprimento (quantidade de caracteres) do valor de entrada é zero.
    if (!value.length) {
      // Se o comprimento for zero (ou seja, o valor estiver vazio), retorna falso.
      return false;
    }

    // Inverte o valor de entrada para facilitar os cálculos do algoritmo de Luhn.
    const reversedValue = value.split("").reverse().join("");
    // Inicializa uma variável chamada "sum" para armazenar a soma dos dígitos.
    let sum = 0;

    // Loop que percorre cada dígito no valor invertido.
    for (let i = 0; i < reversedValue.length; i++) {
      // Obtém o dígito atual convertendo-o em um número.
      let digit = Number(reversedValue[i]);

      // Se o índice do dígito é ímpar (lembrando que a indexação começa em 0),
      // isso significa que estamos em uma posição par da entrada original (porque ela foi invertida),
      // então o dígito é dobrado.

      // Verifica se o índice do dígito é ímpar (posição par no valor original após a inversão).
      if (i % 2 !== 0) {
        // Se for ímpar, dobra o valor do dígito.
        digit *= 2;

        // Se o dígito dobrado for maior do que 9, 9 é subtraído dele.
        if (digit > 9) {
          digit -= 9;
        }
      }

      // Adiciona o dígito (possivelmente modificado) à soma total.
      sum += digit;
    }

    // Retorna verdadeiro se a soma total for um múltiplo de 10 (ou seja, se o resto da divisão por 10 for 0).
    // Caso contrário, retorna falso.
    // Isso é porque um número de cartão de crédito válido, de acordo com o algoritmo de Luhn,
    // deve resultar em uma soma total que seja um múltiplo de 10.
    return sum % 10 === 0;
  },

  maskify: (value) => {
    // Obtém a quantidade de números digitados
    const length = value.length;

    // Pra deixar apenas os 4 últimos dígitos aparentes
    const last4Digits = value.slice(-4);

    // Cria uma nova string que tem o mesmo comprimento que a entrada,
    // mas com todos os caracteres substituídos por "#", exceto os últimos 4 dígitos.
    const maskedNumber = last4Digits.padStart(length, "#");

    // Retorna a string mascarada.
    return maskedNumber;
  },
  //Função para validar a data de validade do cartão de crédito
  validarDataValidadeCartao: (dataValidade) => {
    // Verificar o comprimento da string (deve ser "MM/AAAA")
    if (dataValidade.length !== 7) {
      return false; // Formato inválido
    }

    const anoAtual = new Date().getFullYear(); // Obtém o ano atual

    const mesAtual = new Date().getMonth() + 1; // Obtém o mês atual

    // Separar o mês e o ano
    const mes = parseInt(dataValidade.substring(0, 2), 10);
    const ano = parseInt(dataValidade.substring(3), 10);

    if (anoAtual === ano && mes < mesAtual) {
      return false; // Data inválida
    }

    // Verificar se o mês está entre 1 e 12 e o ano é maior ou igual a 2023
    if (mes >= 1 && mes <= 12 && ano >= 2023) {
      return true; // Data válida
    } else {
      return false; // Data inválida
    }
  },
};

export default validator;
