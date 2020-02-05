class Auth {
    constructor(){
        this.authenticated = false;
    }
    login(form){
        fetch('https://yachmanservice.azurewebsites.net/Token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body:"grant_type=password&username="+form.email+"&password="+form.password
            }).then((res) => res.json())
            .then((data) => sessionStorage.setItem('token', data.access_token))
            .then((data) => console.log(data))
            .catch((err)=>console.log(err))
        
        fetch("https://yachmanservice.azurewebsites.net/api/AppUsers?email="+form.email, {
            method: 'GET'
        }).then((res) => res.json())
        .then((data) => {
            sessionStorage.setItem('userId', data.Id);
            sessionStorage.setItem('authenticated', true);
            alert("Logged in");
        })
        .then((data) => console.log(data))
        .catch((err)=>console.log(err))
        this.authenticated = true;
    }
    logout(){
        this.authenticated = false;
    }
    isAuthenticated(){
        return this.authenticated;
    }
}
export default new Auth();