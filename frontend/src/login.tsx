import { useState } from "react";
import { loginFunc } from "./util/loginFunc";
import { useNavigate } from "react-router-dom";

const login = () => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginFailed, setLoginFailed] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    const loginResult = await loginFunc(userName, password);
    if (!loginResult) {
      setLoginFailed(true);
    } else {
      setLoginFailed(false);
      navigate(`/budget/${loginResult}`);
    }
  };

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
        <a className="createAccBtn" onClick={handleLogin}>
          LOGIN
        </a>
        <a href="/">BACK</a>
      </main>
    </>
  );
};

export default login;
