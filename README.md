# REACT - Conceitos Básicos

## Instalar o Yarn
`$ npm install --global yarn`

## Criação de um projeto React
`$ yarn create react-app meu-app`

## Rodar aplicação
`$ yarn start`

## Estrutura de um projeto React - principais arquivos

![Estrutura de arquivos em um projeto React.js](/public/estrutura_arquivos_react.png)


### 1 - Arquivo que contem a Função ou Classe React: 

`\src\App.js` => Neste arquivo podemos ter componentes do tipo Classe ou Função.

#### Exemplo de componente do tipo classe:
```
class App extends React.Component{
    render(){
        return (
            <div>
                <p>Linha 1</p>
                <p>Linha 2</p>
		        <p>{ new Date().toLocaleDateString("pt-BR") }</p>
            </div>
        );
    }
}
```

* O que desejarmos mostrar na tela usando nosso componente é feito pelo método render(). Ele deve retornar um HTML.
* Todo seu HTML deve estar envolvido em um elemento raiz: Ex: `<div>...</div>`
* Se você não quiser colocar um tag HTML como raiz (algumas vezes isso conflita com css da página e coisas do tipo), você pode colocar um Fragment, que é basicamente uma tag vazia: `<> ... </>`
* No return podemos fazer uso do JSX, nele podemos misturar: HTML, componentes React(1) e JavaScript(2).
    * (1) Se colocarmos uma tag que tenha o mesmo nome de um componente ele será renderizado onde a tag estiver
    * (2) Podemos inserir código JavaScript entre chaves contanto que ele produza um retorno

### 2 - Arquivo responsável pela injeção do react na página HTML: 

`\src\index.js` => Nele especificamos: 

1. Quais componentes vou usar: `<App/> <App2/>`
2. Em qual elemento os mesmos vão ser injetados: `"root"`
3. Os repectivos parâmetros (props) para os mesmos.

```
ReactDOM.render(
  <React.StrictMode>
    <App date={ new Date().toLocaleDateString("pt-BR") } author='Carlos Sales'/>
    <App2 title="Salmo 91">
      Aquele que habita no abrigo do Altíssimo e descansa à sombra do Todo-poderoso pode dizer ao Senhor: "Tu és o meu refúgio e a minha fortaleza, o meu Deus, em quem confio".
    </App2>
  </React.StrictMode>,
  document.getElementById('root')
);
````

* O método ReactDOM.Render renderiza o componente <App /> na página dentro de um elemento HTML.
* A linha `document.getElementById('root')` define que o elemento HTML onde o react será injetado é um que tenha um ID = 'root'.

### 3 - Arquivo HTML que recebe o componente React: 

`\public\index.html`

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

### Props / Parâmetros

Podemos receber parâmetros pelo construtor do componente. No React, esses parâmetros são chamados de "props".

```
class App2 extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
    <div className="box">
        <div className="date">{this.props.date}</div>
        <div className="author">{this.props.author}</div>
    </div>
    );
  }
}
```

#### Props.children

Se seu texto for grande ou contiver HTML ou qualquer outra coisa que torne-o inconveniente para passar por props (porque não poderia ser um atributo na tag), podemos usar outra abordagem: qualquer coisa que você colocar entre a abertura e o fechamento das tags do componente serão passados como `props.children` para o componente! Isso inclui HTML, outros componentes, e até javascript, contanto que esteja entre chaves. Exemplo:
```
<App2 title="Salmo 91">
    Aquele que habita no abrigo do Altíssimo e descansa à sombra do Todo-poderoso pode dizer ao Senhor: "Tu és o meu refúgio e a minha fortaleza, o meu Deus, em quem confio".
</App2>
``` 

### Estados

Os estados são como os atributos de uma classe, em se falando de FrontEnd os estados representam os atributos dos elementos HTML presentes na tela. 

Para criar um componente com estado no React é fácil, no construtor faremos um modelo do estado com valores padrão. Usaremos então um método chamado setState() quando quisermos alterar o estado.

```
import React from 'react';

class App3 extends React.Component{
  constructor(props){
    super(props);
    this.state = { nome : '' }
  }
  changeNome = (evt) => {
    this.setState({ nome : evt.target.value});
  }
  render(){
    return(
      <>
        nome: <input type='text' value={this.state.nome} onChange={this.changeNome}/>
        <p>Olá {this.state.nome}</p>
      </>
    );
  }
}

export default App3;
```
Observe que ao digitar qualquer letra o estado já vai se modificando e todos os elementos HTML que utilizam aquele estado são atualizados imediatamente.

Uma pequena observação sobre o setState(): não é necessário passar o objeto completo do estado para o setState, ele é inteligente o suficiente para fazer modificações parciais.

Ou seja se temos um estado como { nome : 'teste', idade : 20 } e fazemos setState({ idade : 21 }), apenas a idade é atualizada, o estado não é substituído pelo objeto que passamos perdendo o nome.

### Componentes Funcionais

Os componentes funcionais eram considerados os "componentes burros" do React, eles eram componentes simplificados que só tinham props e renderizavam html na tela. Eles não eram capazes de ter estado, e portanto de realizar alterações de estado. Não tinham os métodos de ciclo de vida, o que não permitia que coletassem dados externamente, o que chamamos na programação funcional de efeitos colaterais (side effects).

E por esses motivos eram usados apenas para coisas mais simples no React. No entanto, nas últimas atualizações da biblioteca, eles foram revistos e o React introduziu o conceito de Hooks, os hooks permitem aos componentes funcionais terem estado, efeitos, modificar seu estado e uma série de outras capacidades.

Sendo assim, os componentes tipo classe que se tornaram obsoletos e hoje a recomendação é que tudo seja feito por componentes funcionais. O time do React é funcional, portanto, é natural que eles tenham a tendência de não depender da abordagem orientada a objetos usada nos componentes tipo classe.

Como dito anteriormente, componentes funcionais não podiam ter estados até a atualização do React que nos deu os hooks.

O hook de estado é chamado de useState() precisamos importá-lo de dentro do React antes de poder utilizá-lo em nossos componentes.

`import React, {useState} from 'react';`

Para alterar o estado no nome por exemplo, utilize a função setNome(). Os nomes das constantes você escolhe (tanto da constante de leitura como da função de alteração), mas é muito conveniente manter essa convenção de usar na função o mesmo que foi usado na constante precedido da palavra set. Que é uma nomenclatura muito comum no Java, de onde o javascript herda sua sintaxe.

Uma diferença importantíssima entre a função de alteração do estado criada pelo useState e a função setState que usávamos nos componentes tipo classe é que ela não aceita a alteração parcial de um objeto, ela sobrescreve o objeto completamente, que deve ser passado em sua totalidade.

```
import React, {useState} from 'react';

export default function App(){

  const [nome, setNome] = useState('');

  return (
    <>
      <input type='text' onChange={(evt) => setNome(evt.target.value)} value={nome} />
      <h1>{nome}</h1>
    </>
  );
}
```
#### Componentes Funcionais com Efeitos (Ciclo de Vida)

O useEffect é uma função que recebe dois parâmetros, o primeiro é uma função de callback que rodará e produzirá o nosso efeito, em outras palavras, é o que queremos fazer. O segundo é um vetor, nesse vetor colocamos o nome de variáveis que serão monitoradas pelo effect, caso essas variáveis mudem de valor o effect rodará novamente.


```
import React, {useState, useEffect} from 'react';

export default function App(){

  const [nome, setNome] = useState(undefined);

  useEffect(() => {
    if(nome === undefined){
      setNome(sessionStorage.getItem('nome') || "");
    } 
    else{
      sessionStorage.setItem('nome', nome);
    }
  }, [nome]);

  return (
    <>
      <input type='text' onChange={(evt) => setNome(evt.target.value)} value={nome} />
      <h1>{nome}</h1>
    </>
  );
}
```

Configuramos nosso efeito para rodar no início (como sempre) e a cada mudança do estado do nome (passado no array de dependências).

Quando começamos, o nome estará como undefined então pudemos usar um if para verificar se ele está com esse valor e se estiver tentamos ler o valor do sessionStorage usamos || "" como fallback caso não exista valor no sessionStorage também.

Se o efeito cair no else, isso quer dizer que o nome foi alterado, como não há nada que o usuário possa fazer para fazer o nome ficar undefined novamente essa técnica é razoavelmente segura.

No else, persistimos a alteração do nome no sessionStorage observe que ao escrever no campo o valor do H1 muda como antes, mas que se você recarregar a página o último valor continua preenchido!