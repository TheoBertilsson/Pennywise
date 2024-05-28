import { useState } from "react";
import { loginFunc } from "./util/loginFunc";
import { useNavigate } from "react-router-dom";

const signup = () => {
  const [createUserName, setCreateUserName] = useState("");
  const [createEmail, setCreateEmail] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const navigate = useNavigate();
  function createAccount() {
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: createEmail,
        password: createPassword,
        username: createUserName,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Created account");
          handleLogin();
        } else {
          console.error("Error:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  const handleLogin = async () => {
    const loginResult = await loginFunc(createUserName, createPassword);
    if (loginResult) {
      navigate(`/budget/${loginResult}`);
    }
  };
  return (
    <>
      <header className="headerSignup">
        <h1>Pennywise</h1>
      </header>
      <main className="signUp">
        <span>Sign up</span>
        <input
          type="text"
          placeholder="EMAIL"
          onChange={(event) => setCreateEmail(event.target.value)}
        />
        <input
          type="text"
          placeholder="USERNAME"
          onChange={(event) => setCreateUserName(event.target.value)}
        />
        <input
          type="password"
          placeholder="PASSWORD"
          onChange={(event) => setCreatePassword(event.target.value)}
        />
        <a className="createAccBtn" onClick={createAccount}>
          Create account
        </a>
        <a href="/">BACK</a>
      </main>
    </>
  );
};

export default signup;
