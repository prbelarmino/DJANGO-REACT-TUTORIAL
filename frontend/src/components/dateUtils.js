
export function formatDate(dateString) {
    // Parse the date string
    const parsedDate = new Date(dateString);
  
    // Format the date
    const day = parsedDate.getDate().toString().padStart(2, '0');
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero based
    const year = parsedDate.getFullYear();
    const hours = parsedDate.getHours().toString().padStart(2, '0');
    const minutes = parsedDate.getMinutes().toString().padStart(2, '0');
  
    // Construct the formatted date string
    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
  
    return formattedDate;
  }

export function divideDateByInteger(dateString, divisor) {
  // Passo 1: Converter a string de data em um objeto Date
  let daysString = "0 dia(s)"
  let timeString = "00:00:00"

  if (divisor > 0){

    const date = new Date(dateString);

    // Passo 2: Calcular o timestamp em milissegundos e dividir pelo divisor
    
    const timestamp = date.getTime();
    const dividedTimestamp = timestamp / divisor;
  
    // Passo 3: Converter o timestamp dividido de volta para um objeto Date
    const dividedDate = new Date(dividedTimestamp);
  
    // Passo 4: Calcular os dias, horas, minutos e segundos
    const days = Math.floor(dividedTimestamp / (1000 * 60 * 60 * 24));
    const hours = dividedDate.getUTCHours();
    const minutes = dividedDate.getUTCMinutes();
    const seconds = dividedDate.getUTCSeconds();


    // Passo 5: Formatar as variáveis de saída
    daysString = `${days} dia(s)`;
    timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
  }
  return {daysString, timeString}
}


  