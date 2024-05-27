export async function loginFunc(userName:string, password:string) {
    try {
      const response = await fetch(
        `http://localhost:3000/login?username=${userName}&password=${password}`
      );
      if (response.ok) {
        const result = await response.json();
        console.log(result.token);
        return (result.token);
      } else {
        const text = await response.text();
        throw new Error(text || response.statusText);
      }
    } catch (error) {
      console.log("Fetch error: " + error);
      return false;
    }
  }
