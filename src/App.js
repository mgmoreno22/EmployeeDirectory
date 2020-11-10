import axios from "axios";
import { Component } from "react";

class App extends Component {
  state = {
    users: [],
    filteredUsers: [],
    sortedUsers: [],
    mod: 1
  };

  componentDidMount() {
    axios
      .get("https://randomuser.me/api/?results=100&nat=us")
      .then(({ data }) => {
        console.log(data);
        this.setState({ users: data.results, filteredUsers: data.results, sortedUsers:data.results });
      });
  }

  filterData(value) {
    //get a filtered list of users from value
    const filtered = this.state.users.filter((user) => {
      const fullname =
        user.name.first.toLowerCase() + " " + user.name.last.toLowerCase();
      //return true if user.name.first includes the value or user.name.last includes the value
      return fullname.includes(value);
    });
    //set state with new filtered array
    this.setState({ filteredUsers: filtered, sortedUsers: filtered });
  }

  sortData(type) {
    let sorted;
    if (type === "name") {
      sorted = this.state.filteredUsers.sort((a, b) => {
        const fullnameA =
          a.name.first.toLowerCase() + " " + a.name.last.toLowerCase();
        const fullnameB =
          b.name.first.toLowerCase() + " " + b.name.last.toLowerCase();
        if (fullnameA < fullnameB) return -1*this.state.mod;
        if (fullnameA > fullnameB) return 1*this.state.mod;
        return 0;
      });
    }
    if (type === "phone"){
      sorted = this.state.filteredUsers.sort((a,b)=> a.phone < b.phone ? -1*this.state.mod : a.phone > b.phone ? 1*this.state.mod : 0)
    }
    this.setState({sortedUsers:sorted, mod: -this.state.mod})
  }

  render() {
    return (
      <>
        <div className="jumbotron">
          <h1 style={{ textAlign: "center" }}>Employee Directory</h1>
        </div>
        <input
          onChange={(event) =>
            this.filterData(event.target.value.toLowerCase())
          }
          className="form-control mb-5"
          style={{ margin: "auto", width: "60%" }}
          placeholder="search an employee"
        />
        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col"></th>
              <th onClick={() => this.sortData("name")} scope="col" className="align-middle">
                Name
              </th>
              <th scope="col" className="align-middle">Email</th>
              <th onClick={() => this.sortData("phone")} scope="col" className="align-middle">Phone</th>
            </tr>
          </thead>
          <tbody>
            {this.state.sortedUsers.map((user) => {
              return (
                <tr key={user.name.first + user.name.last}>
                  <th scope="row">
                    <img src={user.picture.medium} />
                  </th>
                  <td>
                    {user.name.first} {user.name.last}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
}

export default App;
