import { useState } from "react";

const login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);
  function login() {
    fetch(
      "http://localhost:3000/login?username=" +
        userName +
        "&password=" +
        password +
        ""
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.text().then((text) => {
            throw new Error(text || response.statusText);
          });
        }
      })
      .then((result) => {
        setLoginFailed(false);
        console.log(result.token);
        // router.push(`/list/${result.token}`);
      })
      .catch((error) => {
        console.log("Fetch error: " + error);
        setLoginFailed(true);
      });
  }
  return (
    <>
      <header className="headerSignup">
        <h1>Pennywise</h1>
      </header>
      <main className="login">
        <span>Sign in</span>
        <input
          type="text"
          placeholder="USERNAME"
          onChange={(event) => setUserName(event.target.value)}
        />
        <input
          type="password"
          placeholder="PASSWORD"
          onChange={(event) => setPassword(event.target.value)}
        />
        {loginFailed === true && <p className="errorLogin">Login Failed</p>}
        <a className="createAccBtn" onClick={login}>
          LOGIN
        </a>
        <a href="/">BACK</a>
      </main>
    </>
  );
};

export default login;
