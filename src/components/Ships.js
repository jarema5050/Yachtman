import React from 'react';
class Ships extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
          name: '',
          capacity: '',
          ships: null
      };
     this.delete = this.delete.bind(this)
   }
   delete(id){
      fetch('https://yachmanservice.azurewebsites.net/api/Ships/'+id, {
         method: 'DELETE'
      }).then(res => res.json())
      .then(() => {
         const newShips = this.state.ships.filter(el => el.Id !== id);
         this.setState({ships: newShips});
      })
     .catch(console.log)
   }
   componentDidMount(){
      const userId = sessionStorage.getItem('userId')
      console.log(userId);
      fetch("https://yachmanservice.azurewebsites.net/api/ships/owner/"+userId)
      .then(res => res.json())
      .then((data) => {
         this.setState({
         ships: data.map(ship => ({
            Id: ship.Id,
            Name: ship.Name,
            Capacity: ship.Capacity
        })
         )});
      })
      .then(()=>{console.log(this.state)})
      .catch(console.log)

   }
   handleChange = (e) => {
         this.setState({
            [e.target.name]: e.target.value
         })
   }
   
   onSubmit = (e) => {
      const userId = sessionStorage.getItem('userId')
      e.preventDefault();
      const form = {
         name: this.state.name,
         capacity: this.state.capacity
      }
      let ship = {
         Name: form.name,
         Capacity: form.capacity,
         OwnerId: userId
     };
      fetch('https://yachmanservice.azurewebsites.net/api/Ships', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(ship)
            })
            .then((res) => res.json())
            .then((data) =>{
               var ships = this.state.ships
               ships.push({
                  Id: ship.Id,
                  Name: ship.Name,
                  Capacity: ship.Capacity
               })
               this.setState({ships: ships})
            })
            .catch((err)=>console.log(err))
            var ships = this.state.ships
            
      
      console.log(this.state.ships);
   }
   render(){
      if(sessionStorage.getItem('authenticated') !== 'true')
      {
         return(
         <div className="jumbotron">
            <div className="row justify-content-around">
               <div className="col-sm-6">
                  <h2>You have to be logged in to manage ships.</h2>
               </div>
            </div>
         </div>
         );
      }
      return(
         <div className="jumbotron">
         <div className="row justify-content-around">
            <div className="col-sm-3">
                <form>
                    <h3>Add ship</h3>
                    <div className="form-group">
                        <label>
                            Name
                        </label>
                        <input className="form-control"
                            name='name'
                            value={this.state.name} 
                            onChange={e => this.handleChange(e)}/>
                    </div>
                    <div className="form-group">
                        <label>
                            Capacity
                        </label>
                        <input className="form-control"
                            name='capacity'
                            value={this.state.capacity}
                            onChange={e => this.handleChange(e)}/>
                    </div>
                    <button className="btn btn-success" onClick={(e) => this.onSubmit(e)}>New ship</button>         
                </form>
            </div>
            <div className="col-sm-3">
               {
               <ShipCards delete={this.delete} ships={this.state.ships}/>
               }
            </div>
         </div>
      </div>
      )
   }
}

class ShipCards extends React.Component{

   delete(id){
       this.props.delete(id);
   }
   
   render(){
      return(
         <div>
           {
              (this.props.ships || []).map((ship) => (
               <div className="card">
                  <div className="card-body">
                     <h5 className="card-title">Name: {ship.Name}</h5>
                     <h6 className="card-subtitle mb-2 text-muted">Capacity: {ship.Capacity}</h6>
                     <button className="btn btn-danger" onClick={this.delete.bind(this, ship.Id)}>Remove</button>
                  </div>
               </div>
            ))
           }
         </div>
      )
   }
}
 
export default Ships;