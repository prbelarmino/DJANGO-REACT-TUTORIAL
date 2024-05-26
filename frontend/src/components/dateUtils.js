
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