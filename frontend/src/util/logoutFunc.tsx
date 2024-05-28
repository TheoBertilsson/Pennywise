export async function logoutFunc(token:string) {
    try {
        const response = await fetch("http://localhost:3000/logout", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: token,
            }),
          });

          if (response.ok) {
            return true;
          } else {
            const errorText = await response.text();
            console.error(
              "Error1:",
              response.status,
              response.statusText,
              errorText
            );
            return false;
          }
    } catch (error) {
      console.log("Fetch error: " + error);
      return false;
    }
  }
