import React, {useState} from 'react';

const Login = (props) => {
    const[user, setUser] = useState({username:'', password:''});
    const[message,setMessage] = useState('');

    const onChange = (event) => {
        setUser({...user, [event.target.name] : event.target.value});
    }
  
    const login = async () => {
      const basicu='Basic '+btoa(user.username+':'+user.password);
      try {
        const response = await fetch('http://localhost:8080/login', 
          {
            method:'GET',
            headers: {'Content-Type':'application/json',
                      'Authorization': basicu }
          });
        if (response.ok) {
          const json = await response.json();
          sessionStorage.setItem("jwt", 'Bearer '+json.jwt);
          props.setUserType(json.role);
          props.setAuth(true);
          setMessage('');
        } else {
          setMessage("response error: "+response.status);
        }
      } catch (err) {
        setMessage("network error: "+err);
      }  
    }

    return (
        <div className="App">
        <h4>{message}</h4>
        <table className="Center">
          <tbody>
            <tr>
              <td> <label htmlFor="username">UserName</label> </td>
              <td> <input type="text" name="username" value={user.username} onChange={onChange} />  </td>
            </tr>
            <tr>
                <td> <label htmlFor="password">Password</label></td>
                <td> <input type="text" name="password" value={user.password} onChange={onChange} /> </td>
            </tr>
          </tbody>
        </table>
        <br/>
        <button id="submit" onClick={login}>Login</button>
      </div>
    );
}

export default Login;