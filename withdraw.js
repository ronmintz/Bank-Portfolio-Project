// Withdraw from the account indicated by the "current" field in the context,
// which is the most recent user to log in or whose account was created.

function Withdraw() {
  const [status, setStatus] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const ctx = React.useContext(UserContext);  

  function validate(field){
      if (isNaN(field) || field.trim() == '') { // white space is not a number
        console.log('Error: Amount is not a number');
        setStatus('Error: Amount is not a number');
        setTimeout(() => setStatus(''),9000);
        return false;
      }
      else if (Number(field) <= 0) {
        setStatus('Error: Amount is not a positive number');
        setTimeout(() => setStatus(''),9000);
        return false;
      }
      return true;
  }

  function clearForm(){
    setAmount('');
  }

  function handleWithdraw() {
    if (!validate(amount))    return;
    ctx.users[ctx.current].balance -= Number(amount);

    if (ctx.users[ctx.current].balance < 0)
      setStatus('Account is Overdrawn');
    else
      setStatus('Withdrawal is successful')

    clearForm();
  }

  return (
    <Card
      bgcolor="primary"
      header="Withdraw"
      status={status}
      body={(ctx.current === -1) ? 
            (
              <>
                Please Log In
              </>
            ) :
            (  
              <>
              Balance      {ctx.users[ctx.current].balance}<br/><br/>
              Withdraw Amount<br/>
              <input type="input" className="form-control" id="wdl_amount" placeholder="Withdraw Amount"
               value={amount} onChange={e => setAmount(e.currentTarget.value)}/><br/>

              {(!amount.trim()) ?
              <button type="submit" className="btn btn-light" disabled>Withdraw</button> :
              <button type="submit" className="btn btn-light" onClick={handleWithdraw}>Withdraw</button>}
              </>
            )}
    />
  )
}
