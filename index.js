function Spa() {
  return (
    <HashRouter>
      <NavBar/>
        { // "current" field of user context indicates the index into users of the most recent user
          //  to log in or the user of the account which has just been created.  This allows an initial
          //  deposit to be made by selecting the deposit screen immediately after creating user account.
          //  -1 indicates that there is no user logged in or whose account has been created.
        }
      <UserContext.Provider value={{current:-1,
                            users:[{name:'abel',email:'abel@mit.edu',password:'secret',balance:0}]}}>
        <div className="container" style={{padding: "20px"}}>
          <Route path="/" exact component={Home} />
          <Route path="/CreateAccount/" component={CreateAccount} />
          <Route path="/login/" component={Login} />
          <Route path="/deposit/" component={Deposit} />
          <Route path="/withdraw/" component={Withdraw} />
          <Route path="/alldata/" component={AllData} />
        </div>
      </UserContext.Provider>      
    </HashRouter>
  );
}

ReactDOM.render(
  <Spa/>,
  document.getElementById('root')
);
