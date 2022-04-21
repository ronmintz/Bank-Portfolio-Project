function Login(){
  // Successful login sets "current" field of context to the user that is logged in for
  // deposits, withdrawals, and balances.  Unsuccessful login clears this field to -1
  // to avoid referencing any user.
  const [status, setStatus]     = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const ctx = React.useContext(UserContext);  

  function validate(field, label){
      if (!field) {
        setStatus('Error: ' + label);
        setTimeout(() => setStatus(''),3000);
        return false;
      }
      return true;
  }

  // search for email and password in userlist
  function search(userlist, email, password) {
    for (let i = 0; i < userlist.length; i++) {
      if (userlist[i].email === email && userlist[i].password === password)
        return i; // {email, password} found at index i
    }
    return -1; // {email, password} not found in userlist
  }

  function handleLogin() {
    console.log(email, password, "is entered");
    if (!validate(email,    'email'))    return;
    if (!validate(password, 'password')) return;
    const index = search(ctx.users, email, password);
    if (index === -1)
      setStatus('Email or Password incorrect');
    else
      setStatus('Login Successful for ' + ctx.users[index].name);

      // user matching email & password becomes current user for deposits, withdrawals, & balances
      // If Email or Password incorrect, there will be no current user.
    ctx.current = index;
    console.log(index === -1 ? 'no current user' : `current user is ${ctx.users[index].email}`);
    clearForm();
  }    

  function clearForm(){
    setEmail('');
    setPassword('');
  }

  return (
    <Card
      bgcolor="primary"
      header="Login"
      status={status}
      body={(  
              <>
              Email address<br/>
              <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
              Password<br/>
              <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
              <button type="submit" className="btn btn-light" onClick={handleLogin}>Login</button>
              </>
            )}
    />
  )
}