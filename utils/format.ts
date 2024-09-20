export const formatePrice = (amount:number | null)=>{
  const number = amount || 0;
  return Intl.NumberFormat('en-us',{
    style:'currency',
    currency:'USD',
  }).format(number);
}

export const formatDate = (date:Date)=>{
  return new Intl.DateTimeFormat('en-US',{
    year:'numeric',
    month:"long",
    day:'numeric'
  }).format(date)
}