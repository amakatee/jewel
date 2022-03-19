
const formatter = new Intl.NumberFormat(undefined, {style: "currency", currency: "RUB"})
export default function formatCurrency(amount){
  
   return formatter.format(amount)

}