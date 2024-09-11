export const formatePrice = (amount:number | null)=>{
  const number = amount || 0;
  return Intl.NumberFormat('en-us',{
    style:'currency',
    currency:'USD',
  }).format(number);
}