function AllData() {
  const ctx = React.useContext(UserContext);

  let data = ["Name", "Email", "Password", "Balance"];

  for (let index = 0; index < ctx.users.length; index++ ) {
    let user = ctx.users[index];
    data[4 * index + 4] = user.name;
    data[4 * index + 5] = user.email;
    data[4 * index + 6] = user.password;
    data[4 * index + 7] = user.balance;
  }
  console.log(data);

  let arr = data.map((field,i)=><div key={i}>{field}</div>);

  return (
    <CardU
      bgcolor="primary"
      txtcolor="white"
      header="All Data"
      body={arr}
    />
  )

/****************************
  return (
    <>
    <h5>All Data in Store</h5>
    {JSON.stringify(ctx)}<br/>
    </>
  );
*****************************/
}
