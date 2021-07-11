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