//importa a função de validação de data de validade do cartão de crédito
import validator from "./validator.js";

const form = document.querySelector("form");
const inputNome = document.querySelector("#nome-cartao");
const inputNumeroCartao = document.querySelector("#numero-cartao");
const inputDataValidade = document.querySelector("#data-validade");
const inputCodigoSeguranca = document.querySelector("#codigo-seguranca");

const labelNumeroCartao = document.querySelector(".cartao-numero-box");
const labelNomeCartao = document.querySelector(".nome-titular-cartao");
const labelDataValidade = document.querySelector(".expiracao");
const labelCodigoSeguranca = document.querySelector(".cvv-box");

const containerBack = document.querySelector(".back");
const containerFrente = document.querySelector(".frente");

let isValidForm = false;

const resetInput = (elem) => {
  // resetar as mensagens de erro e bordas vermelhas
  elem.nextElementSibling.classList.add("error-hidden");
  elem.classList.remove("invalido");
};

const validateInput = () => {
  isValidForm = true;

  // pra quando for vazio, aparecer a mensagem de erro
  if (!inputNome.value) {
    inputNome.nextElementSibling.classList.remove("error-hidden");
    inputNome.classList.add("invalido");
    isValidForm = false;
  }

  // Validar o número do cartão usando o método isValid do módulo validator. Troquei para que ele passe a validar o número sem a mascara, pois antes estava dando erro tentando validar com as hashtags
  if (
    !inputNumeroCartao.getAttribute("unmasked-value") ||
    !validator.isValid(inputNumeroCartao.getAttribute("unmasked-value"))
  ) {
    inputNumeroCartao.nextElementSibling.classList.remove("error-hidden");

    //para adicionar a classe invalido no input e colocar as bordas vermelhas, ou seja, não precisa ter a classe invalido no html
    inputNumeroCartao.classList.add("invalido");

    isValidForm = false;
  }
  if (!inputDataValidade.value) {
    inputDataValidade.nextElementSibling.classList.remove("error-hidden");
    inputDataValidade.classList.add("invalido");
    isValidForm = false;
  } else {
    // Aqui, se o campo de data de validade tiver um valor, chamamos a função de validação
    const dataValida = validator.validarDataValidadeCartao(
      inputDataValidade.value
    );
    if (!dataValida) {
      inputDataValidade.nextElementSibling.classList.remove("error-hidden");
      inputDataValidade.classList.add("invalido");
      isValidForm = false;
    }
  }

  if (!inputCodigoSeguranca.value) {
    inputCodigoSeguranca.nextElementSibling.classList.remove("error-hidden");
    inputCodigoSeguranca.classList.add("invalido");
    isValidForm = false;
  }
};

form.addEventListener("submit", (e) => {
  // para paralisar o envio do formulário para conseguir fazer as validações do formulário
  e.preventDefault();
  validateInput();

  // Se o formulário estiver válido, redirecionar para a página de pagamento
  if (isValidForm) {
    window.location.href = "./confirmacao.html";
  }
});

// para resetar as mensagens de erro e bordas vermelhas
inputNome.addEventListener("input", (e) => {
  resetInput(inputNome);

  if (!e.target.value) return (labelNomeCartao.textContent = "NOME DO TITULAR");

  // Atribui o valor do input ao elemento HTML que exibe o nome do titular do cartão
  labelNomeCartao.textContent = e.target.value;
});

inputNumeroCartao.addEventListener("input", (e) => {
  resetInput(inputNumeroCartao);
  if (!e.target.value)
    return (labelNumeroCartao.textContent = "0000 0000 0000 0000");

  labelNumeroCartao.textContent = e.target.value;
});

inputNumeroCartao.addEventListener("blur", (e) => {
  if (!e.target.value)
    return (labelNumeroCartao.textContent = "0000 0000 0000 0000");
  //para não continuar salvando com a hashtag
  if (inputNumeroCartao.value.includes("#")) return;
  // para salvar o valor original do input
  inputNumeroCartao.setAttribute("unmasked-value", inputNumeroCartao.value);

  // Máscara do número do cartão usando o método maskify do módulo validator
  const numeroMascarado = validator.maskify(inputNumeroCartao.value);
  inputNumeroCartao.value = numeroMascarado;
  labelNumeroCartao.textContent = numeroMascarado;
});

inputDataValidade.addEventListener("input", (e) => {
  resetInput(inputDataValidade);

  // Se o campo estiver vazio, exibe a máscara
  if (!e.target.value) return (labelDataValidade.textContent = "MM/AAAA");

  let dataValidade = e.target.value;

  if (dataValidade.includes("/")) {
    dataValidade = dataValidade.replace("/", "");
  }

  if (dataValidade.length > 2) {
    dataValidade = dataValidade.slice(0, 2) + "/" + dataValidade.slice(2);
  }

  e.target.value = dataValidade;
  labelDataValidade.textContent = dataValidade;
});

inputCodigoSeguranca.addEventListener("input", (e) => {
  resetInput(inputCodigoSeguranca);

  if (!e.target.value) return (labelCodigoSeguranca.textContent = "CVV");

  labelCodigoSeguranca.textContent = e.target.value;
});

inputCodigoSeguranca.addEventListener("focus", () => {
  containerBack.classList.remove("hide");
  containerFrente.classList.add("hide");
});

// função para girar o cartão
function showFrente() {
  containerBack.classList.add("hide");
  containerFrente.classList.remove("hide");
}

//invocando a função acima pra girar o cartão
inputNome.addEventListener("focus", () => {
  showFrente();
});

inputNumeroCartao.addEventListener("focus", () => {
  showFrente();
});

inputDataValidade.addEventListener("focus", () => {
  showFrente();
});
