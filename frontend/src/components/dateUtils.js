
export function formatDate(dateString) {
    // Parse the date string
    if (dateString == null){
      return ""
    }
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
    let daysString = "0 dia(s)";
    let timeString = "00:00:00";
  
    if (divisor > 0) {
      const initialDate = new Date(dateString);
      const now = new Date();
      const difference = now - initialDate;
      
      // Calculate the timestamp in milliseconds and divide by the divisor
      const dividedTimestamp = difference / divisor;
      
      // Create a new Date object from the divided timestamp
      const dividedDate = new Date(initialDate.getTime() + dividedTimestamp);
      
      // Calculate days, hours, minutes, and seconds
      const days = Math.floor(dividedTimestamp / (1000 * 60 * 60 * 24));
      const hours = dividedDate.getUTCHours();
      const minutes = dividedDate.getUTCMinutes();
      const seconds = dividedDate.getUTCSeconds();
  
      // Format the output strings
      daysString = `${days} dia(s)`;
      timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  
    return { daysString, timeString };
  }
  


  