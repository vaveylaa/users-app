import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner, Container, Table, Row, Card } from "reactstrap";

class UserList extends React.Component {
  state = {
    users: [],
    isLoading: true,
    selectedUser: null,
  };

  componentDidMount() {
    setTimeout(() => {
      axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((response) => {
          this.setState({ users: response.data, isLoading: false });
        })
        .catch((error) => {
          console.log(error);
          this.setState({ isLoading: false });
        });
    }, 1000);
  }

  handleUserClick = (user) => {
    this.setState({ selectedUser: user });
  };

  render() {
    const { users, isLoading, selectedUser } = this.state;

    if (isLoading) {
      return (
        <div className="text-center mt-5">
          <Spinner color="primary" />
        </div>
      );
    }

    return (
      <div>
        <Container>
          <Row className="justify-content-center mt-3">
            <div className="col-md-6">
              <Card
                body
                style={{
                  backgroundColor: "rgb(202, 222, 250)",
                  borderColor: "rgb(11, 61, 132)",
                }}
              >
                <h2
                  className="text-center"
                  style={{ color: "rgb(11, 61, 132)" }}
                >
                  User List
                </h2>
              </Card>
            </div>
          </Row>

          <Table
            striped
            bordered
            hover
            className="mt-4"
            style={{ borderColor: "rgb(11, 61, 132)" }}
          >
            <thead>
              <tr>
                <th>Username</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} onClick={() => this.handleUserClick(user)}>
                  <td>{user.username}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          {selectedUser && (
            <Container>
              <Row className="justify-content-center mt-3">
                <div className="col-md-6">
                  <Card body className="bg-success">
                    <h2 className="text-center" style={{ color: "white" }}>
                      Selected User
                    </h2>
                    <p className="text-center" style={{ color: "white" }}>
                      {selectedUser.name}
                    </p>
                  </Card>
                </div>
              </Row>
            </Container>
          )}
        </Container>
      </div>
    );
  }
}

export default UserList;
