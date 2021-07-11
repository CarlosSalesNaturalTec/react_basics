# REACT - Conceitos Básicos

## Instalar o Yarn
`$ npm install --global yarn`

## Criação de um projeto React
`$ yarn create react-app meu-app`

## Rodar aplicação
`yarn start`

## Estrutura de um projeto React - principais arquivos

![Estrutura de arquivos em um projeto React.js](/public/estrutura_arquivos_react.png)


### 1 - Arquivo que contem a Função ou Classe React: `\src\App.js`

Neste arquivo podemos ter componentes do tipo Classe ou Função.

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

### 2 - Arquivo responsável pela injeção do react na página HTML: `\src\index.js`
Nele eu especifico: 
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

### 3 - Arquivo HTML que recebe o componente React: `\public\index.html`
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
