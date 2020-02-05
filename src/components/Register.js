import React from 'react';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                name: null,
                surname: null,
                password: null,
                confirmPassword: null,
                experience: null,
                email: null,
                country : null
            },
            correctMessage : ""
        };
    }
    handleChange = (e) => {
        this.state.form[e.target.name] = e.target.value;
        //console.log(this.state.form);
    }

   onSubmit = (e) => {
        e.preventDefault();
        var fetchForbidden = false;
        if(this.state.form.name === null){
            this.state.correctMessage += "Name cannot be null. ";
            console.log(1);
            fetchForbidden = true;
        }
        if(this.state.form.surname === null){
            this.state.correctMessage += "Surname cannot be null. ";
            fetchForbidden = true;
            console.log(2);
        }
        if(this.state.form.password === null){
            this.state.correctMessage += "Password cannot be null. "
            fetchForbidden = true;
            console.log(3);
        }
        if(this.state.form.confirmPassword === null){
            this.state.correctMessage += "Confirm password cannot be null. "
            fetchForbidden = true;
            console.log(4);
        }
        if(this.state.form.email === null){
            this.state.correctMessage += "Email cannot be null. "
            fetchForbidden = true;
            console.log(4);
        }
        if(this.state.form.experience === null){
            this.state.correctMessage += "Experience cannot be null. "
            fetchForbidden = true;
            console.log(5);
        }
        if(this.state.form.country === null){
            this.state.correctMessage += "Country cannot be null. "
            fetchForbidden = true;
            console.log(6);
        }
        if(this.state.form.password !== this.state.form.confirmPassword){
            this.state.correctMessage += "Confirm password has to be same as password. "
            fetchForbidden = true;
            console.log(7);
        }
        if(fetchForbidden === false)
        {
            this.state.correctMessage = "";
            fetch('https://yachmanservice.azurewebsites.net/api/Account/Register', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Email: this.state.form.email,
                    Password: this.state.form.password,
                    ConfirmPassword: this.state.form.confirmPassword
                })
            }).then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err)=>console.log(err))
            
            fetch('https://yachmanservice.azurewebsites.net/api/AppUsers', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    Email: this.state.form.email,
                    Country: this.state.form.country,
                    Name: this.state.form.name,
                    Surname: this.state.form.surname,
                    Experience: this.state.form.experience,
                })
            }).then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err)=>console.log(err))
        }
        console.log('after');
    }
    render(){
        return(
        <div className="col-sm-4">
            <h3>Register</h3>
            <div className="form-group">
               <label>Email</label>
               <input className="form-control" name='email' type="text" onChange={this.handleChange}/>
            </div>
            <div className="form-group">
               <label>Name</label>
               <input className="form-control" name='name' type="text" onChange={this.handleChange}/>
               <label>Surname</label>
               <input className="form-control" name='surname' type="text" onChange={this.handleChange}/>
            </div>
            <div className="form-group">
                <label>Country</label>
               <input className="form-control" name='country' type="text" onChange={this.handleChange}/>
               <label>Experience</label>
               <select className="form-control" name='experience' onChange={this.handleChange}>
                  <option selected disabled hidden> 
                    Select your experience
                  </option>
                  <option value="1">Novice</option>
                  <option value="2">Intermediate</option>
                  <option value="3">Advanced</option>
                  <option value="4">Expert</option>
                </select>
            </div>
            <div className="form-group">
               <label>Password</label>
               <input className="form-control" name="password" type="password" onChange={this.handleChange}/>
               <label>Confirm Password</label>
               <input className="form-control" name="confirmPassword" type="password" onChange={this.handleChange}/>
            </div>
            <p className='correct'>{this.state.correctMessage}</p>
            <div className="form-group">
               <button type="submit" className="btn btn-primary" onClick={(e) => this.onSubmit(e)}>Register</button>
            </div>
         </div>
        )
    }
}
export default Register;