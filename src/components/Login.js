import React from 'react';
import Auth from './Auth';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            email: ''
        };
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

   onSubmit = (e) => {
       e.preventDefault();
       const form = {
        password: this.state.password,
        email: this.state.email
       }
       Auth.login(form);
       
       this.setState({
            password: '',
            email: ''
       })
    }

    render() {
        return (
            <div className="col-sm-4">
                <form>
                    <h3>Login</h3>
                    <div className="form-group">
                        <label>
                            Email
                        </label>
                        <input className="form-control"
                            name='email'
                            value={this.state.email} 
                            onChange={e => this.handleChange(e)}/>
                    </div>
                    <div className="form-group">
                        <label>
                            Password
                        </label>
                        <input className="form-control"
                            name='password' type="password"
                            value={this.state.password}
                            onChange={e => this.handleChange(e)}/>
                    </div>
                    <button className="btn btn-primary" onClick={(e) => this.onSubmit(e)}>Log in</button>         
                </form>
            </div>

        );
    }
}

export default Login;