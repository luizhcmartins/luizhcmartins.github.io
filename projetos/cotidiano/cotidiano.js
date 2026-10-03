//definição da escala para adequação ao tamanho de tela do monitor
let escala;

let layout;
let containerCanvas;
let containerControles;
let canvas;

//declaração de variáveis dos sliders

let sliderPosiçãoInicialY;
let sliderPosiçãoInicialX;
let sliderDistanciamentoSocial; 
let sliderTamanho;
let posiçãoSombraXSlider;
let posiçãoSombraYSlider;
let arredondamentoSlider;
let matizDeFundoSlider;
let saturaçãoDeFundoSlider;
let brilhoDeFundoSlider;
let matizPosteriorSlider;
let saturaçãoPosteriorSlider;
let brilhoPosteriorSlider;
let matizUlteriorSlider;
let saturaçãoUlteriorSlider;
let brilhoUlteriorSlider;

//declaração de variáveis dos textos que acompanham os sliders
let textoTamanho;
let textoSombraX;
let textoSombraY;
let textoArredondamento;

function setup() {

  // container principal da página
  layout = createDiv();
  layout.id("layout");

  // container do canvas
  containerCanvas = createDiv();
  containerCanvas.id("canvas-container");
  containerCanvas.parent(layout);

  // container dos controles
  containerControles = createDiv();
  containerControles.id("controles-container");
  containerControles.parent(layout);

  // canvas REAL: continua sendo 1080 x 1920
  canvas = createCanvas(1080, 1920);
  canvas.parent(containerCanvas);

  noStroke();

  criarEstiloPagina();

  //botão de randomização
  let botãoRandomizer = createButton("RANDOMIZE!");
  botãoRandomizer.mousePressed(randomize);
  botãoRandomizer.parent(containerControles);
  botãoRandomizer.style ("width", "200px");
  botãoRandomizer.style ("text-align", "center");
  
  //importa a fonte tipográfica
   let fonte = createElement(
    "link",
    ""
  );

  fonte.attribute(
    "href",
    "https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&family=Space+Grotesk:wght@300..700&display=swap");

  fonte.attribute("rel", "stylesheet");
  
  //cria o botão de salvamento (para imagem em png)
  let botao = createButton("SALVAR IMAGEM (png)");
  botao.mousePressed(salvarImagem);
  botao.parent(containerControles);
  botao.style("width", "200px");
  botao.style("text-align", "center");

  // cria o botão de salvamento (para imagem em jpg)
  let botaoJPG = createButton("SALVAR IMAGEM (jpg)");
  botaoJPG.mousePressed(salvarImagemJPG);
  botaoJPG.parent(containerControles);
  botaoJPG.style("width", "200px");
  botaoJPG.style("text-align", "center");


  //cria os sliders a partir das variáveis
  sliderPosiçãoInicialY = createSlider (-1000, 1000, 150)
  sliderPosiçãoInicialX = createSlider (-1000, 1000, 150)
  sliderDistanciamentoSocial = createSlider (50, 1000, 200)
  sliderTamanho = createSlider (0, 1000, 150);
  posiçãoSombraXSlider = createSlider (-1000, 1000, -20);
  posiçãoSombraYSlider = createSlider (-1000, 1000, -20);
  arredondamentoSlider = createSlider (0, 70, 15);
  matizDeFundoSlider = createSlider (0, 360, 90);
  saturaçãoDeFundoSlider = createSlider (0, 100, 4);
  brilhoDeFundoSlider = createSlider (0, 100, 90);
  matizPosteriorSlider = createSlider (0, 360, 334);
  saturaçãoPosteriorSlider = createSlider (0, 100, 73);
  brilhoPosteriorSlider = createSlider (0, 100, 87);
  matizUlteriorSlider = createSlider (0, 360, 49);
  saturaçãoUlteriorSlider = createSlider (0, 100, 95);
  brilhoUlteriorSlider = createSlider (0, 100, 89);

  function adicionarControle(texto, slider) {

  let grupo = createDiv();
  grupo.class("grupo-controle");
  grupo.parent(containerControles);

  texto.parent(grupo);
  slider.parent(grupo);
}

  //configura o tamanho dos sliders (apenas estético)
  configurarSlider(sliderPosiçãoInicialY);
  configurarSlider(sliderPosiçãoInicialX);
  configurarSlider(sliderDistanciamentoSocial);
  configurarSlider(sliderTamanho);
  configurarSlider(posiçãoSombraXSlider);
  configurarSlider(posiçãoSombraYSlider);
  configurarSlider(arredondamentoSlider);
  configurarSlider(matizDeFundoSlider);
  configurarSlider(saturaçãoDeFundoSlider);
  configurarSlider(brilhoDeFundoSlider);
  configurarSlider(matizPosteriorSlider);
  configurarSlider(saturaçãoPosteriorSlider);
  configurarSlider(brilhoPosteriorSlider);
  configurarSlider(matizUlteriorSlider);
  configurarSlider(saturaçãoUlteriorSlider);
  configurarSlider(brilhoUlteriorSlider);

//cria o texto que acompanha os sliders
  
  textoPosiçãoInicialY = createP("Posição Inicial do Eixo Y: 150")
  textoPosiçãoInicialX = createP ("Posição Inicial do Eixo X: 150")
  textoDistanciamentoSocial = createP ("Distância entre quadrados")
  textoTamanho = createP("Tamanho: 150");
  textoSombraX = createP("Sombra X: -20");
  textoSombraY = createP("Sombra Y: -20");
  textoArredondamento = createP("Arredondamento: 15");
  textoMatizDeFundo = createP("Valor da Cor de Fundo: 90");
  textoSaturaçãoDeFundo = createP("Saturação da Cor de Fundo: 4");
  textoBrilhoDeFundo = createP("Brilho da Cor de Fundo:90");
  textoMatizPosterior = createP("Valor da Cor Primária: 334");
  textoSaturaçãoPosterior = createP("Saturação da Cor Primária: 73");
  textoBrilhoPosterior = createP("Brilho da Cor Primária: 87");
  textoMatizUlterior = createP ("Valor da Cor Secundária: 49");
  textoSaturaçãoUlterior = createP ("Saturação da Cor Secundária: 95");
  textoBrilhoUlterior = createP ("Brilho da Cor Secundária: 89");

  //configura o texto dos sliders e botão
  configurarTexto(textoPosiçãoInicialY);
  configurarTexto(textoPosiçãoInicialX);
  configurarTexto(textoDistanciamentoSocial);
  configurarTexto(textoTamanho);
  configurarTexto(textoSombraX);
  configurarTexto(textoSombraY);
  configurarTexto(textoArredondamento);
  configurarTexto(textoMatizDeFundo);
  configurarTexto(textoSaturaçãoDeFundo);
  configurarTexto(textoBrilhoDeFundo);
  configurarTexto(textoMatizPosterior);
  configurarTexto(textoSaturaçãoPosterior);
  configurarTexto(textoBrilhoPosterior);
  configurarTexto(textoMatizUlterior);
  configurarTexto(textoSaturaçãoUlterior);
  configurarTexto(textoBrilhoUlterior);

  //posiciona os sliders e escala eles
  adicionarControle(textoPosiçãoInicialY, sliderPosiçãoInicialY);
  adicionarControle(textoPosiçãoInicialX, sliderPosiçãoInicialX);
  adicionarControle(textoDistanciamentoSocial, sliderDistanciamentoSocial);
  adicionarControle(textoTamanho, sliderTamanho);
  adicionarControle(textoSombraX, posiçãoSombraXSlider);
  adicionarControle(textoSombraY, posiçãoSombraYSlider);
  adicionarControle(textoArredondamento, arredondamentoSlider);

  adicionarControle(textoMatizDeFundo, matizDeFundoSlider);
  adicionarControle(textoSaturaçãoDeFundo, saturaçãoDeFundoSlider);
  adicionarControle(textoBrilhoDeFundo, brilhoDeFundoSlider);

  adicionarControle(textoMatizPosterior, matizPosteriorSlider);
  adicionarControle(textoSaturaçãoPosterior, saturaçãoPosteriorSlider);
  adicionarControle(textoBrilhoPosterior, brilhoPosteriorSlider);

  adicionarControle(textoMatizUlterior, matizUlteriorSlider);
  adicionarControle(textoSaturaçãoUlterior, saturaçãoUlteriorSlider);
  adicionarControle(textoBrilhoUlterior, brilhoUlteriorSlider);


 // chama a atualização de escala
  atualizarLayout();
}

//FIM DO SETUP

function atualizarLayout() {

  let margem = 40;
  let espacamento = 30;
  let larguraPainel = 400;

  let larguraDisponivel;

  // TELAS ESTREITAS
  if (windowWidth <= 800) {

    larguraDisponivel = windowWidth - margem;

  }

  // TELAS LARGAS
  else {

    larguraDisponivel =
      windowWidth - larguraPainel - espacamento - margem;

  }

  // impede valores muito pequenos
  larguraDisponivel = max(larguraDisponivel, 200);

  // calcula a escala necessária para o canvas
  escala = min(
    larguraDisponivel / 1080,
    windowHeight / 1920,
    1
  );

  // tamanho visual do canvas
  let larguraVisual = 1080 * escala;
  let alturaVisual = 1920 * escala;


  // mantém o canvas REAL em 1080 x 1920
  canvas.style("width", "1080px");
  canvas.style("height", "1920px");

  // escala visualmente o canvas INTEIRO
  canvas.style(
    "transform",
    `scale(${escala})`
  );

  canvas.style(
    "transform-origin",
    "top left"
  );

  // o container ocupa apenas o espaço visual
  containerCanvas.style(
    "width",
    larguraVisual + "px"
  );

  containerCanvas.style(
    "height",
    alturaVisual + "px"
  );
}


function windowResized() {
  atualizarLayout();
}


function draw() {

  // altera o modo de cor para permitir o controle por meio dos sliders (se for utilizar uma cor única, por HEX ou 3 valores RGB, é possível ignorar essa linha e reescrever as variáveis diretamente)
  colorMode(HSB, 360, 100, 100);

  // define as variáveis

  let PosiçãoInicialY = sliderPosiçãoInicialY.value();
  let PosiçãoInicialX = sliderPosiçãoInicialX.value();
  let DistanciamentoSocial = sliderDistanciamentoSocial.value();
  let tamanhoDoQuadrado = sliderTamanho.value();
  let posiçãoSombraX = posiçãoSombraXSlider.value();
  let posiçãoSombraY = posiçãoSombraYSlider.value();
  let arredondamento = arredondamentoSlider.value();
  let matizDeFundo = matizDeFundoSlider.value();
  let saturaçãoDeFundo = saturaçãoDeFundoSlider.value();
  let brilhoDeFundo = brilhoDeFundoSlider.value();
  let matizPosterior = matizPosteriorSlider.value();
  let saturaçãoPosterior = saturaçãoPosteriorSlider.value();
  let brilhoPosterior = brilhoPosteriorSlider.value();
  let matizUlterior = matizUlteriorSlider.value();
  let saturaçãoUlterior = saturaçãoUlteriorSlider.value();
  let brilhoUlterior = brilhoUlteriorSlider.value();

  // cor de fundo

  background(matizDeFundo, saturaçãoDeFundo, brilhoDeFundo);

  // adequa os textos segundo os valores atualizados dos sliders conforme alteração pelo usuário

  textoPosiçãoInicialY.html("Posição Inicial do eixo Y : " + PosiçãoInicialY);
  textoPosiçãoInicialX.html("Posição Inicial do eixo X : " + PosiçãoInicialX);
  textoDistanciamentoSocial.html("Distância entre os quadrados: " + DistanciamentoSocial);
  textoTamanho.html("Tamanho do Quadrado: " + tamanhoDoQuadrado);
  textoSombraY.html("Distância da Sombra - Eixo Y: " + posiçãoSombraY);
  textoSombraX.html("Distância da Sombra - Eixo X: " + posiçãoSombraX);
  textoArredondamento.html("Arredondamento dos cantos: " + arredondamento);

  

  // cria as regras para posicionamento e dimensionamento dos quadrados
  for (let y = PosiçãoInicialY; y < height + 200; y += DistanciamentoSocial) {
    for (let x = PosiçãoInicialX; x < width + 200; x += DistanciamentoSocial) {
      // quadrado ulterior
      fill (matizUlterior, saturaçãoUlterior, brilhoUlterior); // define a cor por meio da referência ao slider
      square(x + posiçãoSombraX, y + posiçãoSombraY, tamanhoDoQuadrado, arredondamento); //dimensões e posição do quadrado ulterior. Os valores podem ser alterados por meio da declaração de variáveis acima.

      // quadrado posterior
      fill (matizPosterior, saturaçãoPosterior, brilhoPosterior); // define a cor por meio da referência ao slider
      square (x, y, tamanhoDoQuadrado, arredondamento) //dimensões e posição do quadrado posterior
    }
  }
}

// configura comprimento do slider
function configurarSlider(slider){  
  slider.style("width", "100%");
  slider.style("box-sizing", "border-box");
}

function configurarTexto(texto) {
  texto.style("font-family", "Jost");
  texto.style("font-size", "18px");
  texto.style("font-weight", "400");
  texto.style("text-align", "left");
  texto.style("width", "100%");
  texto.style("margin", "0 0 8px 0");
}

function salvarImagem() {
  saveCanvas("Cotidiano", "png");
}

function salvarImagemJPG() {
  saveCanvas("Cotidiano", "jpg");
}


//função de randomização

function randomize (){

  sliderPosiçãoInicialY.value(random(-1000, 1000));
  sliderPosiçãoInicialX.value(random(-1000, 1000));
  sliderDistanciamentoSocial.value(random(50, 500));
  sliderTamanho.value(random(0, 1000));
  posiçãoSombraXSlider.value(random(-1000, 1000));
  posiçãoSombraYSlider.value(random(-1000, 1000));
  arredondamentoSlider.value(random (0, 70));
  matizDeFundoSlider.value(random(0, 360));
  saturaçãoDeFundoSlider.value(random(0, 100));
  brilhoDeFundoSlider.value(random(0, 100));
  matizPosteriorSlider.value(random(0, 360));
  saturaçãoPosteriorSlider.value(random(0, 100));
  brilhoPosteriorSlider.value(random(0, 100));
  matizUlteriorSlider.value(random(0, 360));
  saturaçãoUlteriorSlider.value(random(0, 100));
  brilhoUlteriorSlider.value(random(0, 100));

}

// FUNÇÕES DUPLAS
function criarEstiloPagina() {

  let estilo = createElement("style");

  estilo.html(`
    
    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
    }

    #layout {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      gap: 30px;
      padding: 20px;
      box-sizing: border-box;
      width: 100%;
    }

    #canvas-container {
      flex: 0 0 auto;
      overflow: visible;
    }

    #canvas-container canvas {
      display: block;
    }

    #controles-container {
      width: 400px;
      max-width: 400px;
      box-sizing: border-box;
    }

    .grupo-controle {
      width: 100%;
      margin-bottom: 18px;
      box-sizing: border-box;
    }

    #controles-container button {
      display: block;
      width: 100%;
      margin-top: 15px;
      padding: 10px;
      box-sizing: border-box;
    }

    @media (max-width: 800px) {

      #layout {
        flex-direction: column;
        align-items: center;
        gap: 25px;
      }

      #canvas-container {
        width: 100%;
        display: flex;
        justify-content: center;
      }

      #controles-container {
        width: 100%;
        max-width: 500px;
      }

    }

  `);

  estilo.parent(document.head);
}