function timestampToTimeOnlyString(timestamp:number){
  let timestampString;

  const offset = 1000 * 60 * 60 * 9;
  const today = new Date((new Date()).getTime() + offset);
  const chatDate = new Date(timestamp + offset);

  timestampString = chatDate.getHours()+":"+chatDate.getMinutes();

  return timestampString;
}

export default timestampToTimeOnlyString;
