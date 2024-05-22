export async function authenticate(token:string) {
        try {
            const response = await fetch(
              `http://localhost:3000/authenticate?token=${token}`
            );
            if (response.ok) {
              const result = await response.json();

              return (result[0].account_id);
            } else {
              const text = await response.text();
              throw new Error(text || response.statusText);
            }
          } catch (error) {
            console.log("Fetch error: " + error);
            return false;
          }
  }
