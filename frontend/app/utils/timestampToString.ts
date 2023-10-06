function timestampToString(timestamp:number){
  let timestampString;

  const offset = 1000 * 60 * 60 * 9;
  const today = new Date((new Date()).getTime() + offset);
  const chatDate = new Date(timestamp + offset);

  if(today.getDate() === chatDate.getDate()){
    timestampString = chatDate.getHours()+":"+chatDate.getMinutes();
  }else if(today.getFullYear() === chatDate.getFullYear()){
    timestampString = chatDate.getMonth()+"월 "+chatDate.getDate()+"일";
  }else{
    timestampString = chatDate.getFullYear()+". "+chatDate.getMonth()+". "+chatDate.getDate();
  }
  return timestampString;
}

export default timestampToString;
