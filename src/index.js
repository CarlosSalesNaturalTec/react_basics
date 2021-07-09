/* Arquivo responsável pela injeção do react na página HTML. Aqui eu especifico: 
1 - Quais componentes vou usar: <App /> <App2 />
2 - Em qual elemento os mesmos vão ser injetados: "root"
3 - Os repectivos parâmetros (props) para os mesmos.
==========================================================*/

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import App2 from './components/App2';

ReactDOM.render(
  <React.StrictMode>

    <App date={ new Date().toLocaleDateString("pt-BR") } author='Carlos Sales'/>
    <App2 title="Salmo 91">
      Aquele que habita no abrigo do Altíssimo e descansa à sombra do Todo-poderoso pode dizer ao Senhor: "Tu és o meu refúgio e a minha fortaleza, o meu Deus, em quem confio".
    </App2>

  </React.StrictMode>,

  document.getElementById('root')
);