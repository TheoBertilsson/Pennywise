const signup = () => {
  return (
    <>
      <header className="headerSignup">
        <h1>Pennywise</h1>
      </header>
      <main className="signUp">
        <span>Sign up</span>
        <input type="text" placeholder="EMAIL" />
        <input type="text" placeholder="USERNAME" />
        <input type="password" placeholder="PASSWORD" />
        <a className="createAccBtn" href="/remaining">
          Create account
        </a>
        <a href="/">BACK</a>
      </main>
    </>
  );
};

export default signup;
