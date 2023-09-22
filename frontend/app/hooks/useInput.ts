import {useState} from "react";


interface props {
  initialState?: string;
  placeholder: string;
  nowNum?: number;
  title?: string;
  onChange?: Function;
}

function useInput({placeholder, nowNum=0, title, initialState='', onChange}: props){
  const [text, setText] = useState<string>(initialState);
  const [now, setNow] = useState<number>(nowNum);

  function onChangeText(newText: string){
    setText(newText);
    onChange&&onChange(newText);
  }

  function reset(){
    setText('');
  }

  return {text, now, title, onChangeText, placeholder, reset}
}

export default useInput;
