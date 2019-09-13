import React, { Component } from 'react';
import axios from 'axios';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';
import  { Redirect } from 'react-router-dom';

class Customer extends Component {
  state = {
    isAuthenticated: false,
    customers: [],
    newCustomerData: {
      firstName: '',
      lastName: '',
      email: '',
      mobileNumber: '',
      country: '',
      province: '',
      notes: ''
    },
    editBookData: {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      mobileNumber: '',
      country: '',
      province: '',
      notes: ''
    },
    newBookModal: false,
    editBookModal: false
  }
  componentWillMount() {
    this._refreshBooks();
    console.log(localStorage.jwtToken)
    if(localStorage.jwtToken){
        this.setState({isAuthenticated: true});
      }
  }
  toggleNewCustomerModal() {
    this.setState({
      newBookModal: ! this.state.newBookModal
    });
  }
  toggleEditCustomerModal() {
    this.setState({
      editBookModal: ! this.state.editBookModal
    });
  }
  addCustomer() {
    axios.post('http://localhost:8080/customer/add', this.state.newCustomerData, { headers: {"Authorization" : `Bearer `+localStorage.getItem('jwtToken')}}).then((response) => {
      let { customers } = this.state;

      customers.push(response.data);

      this.setState({ customers, newBookModal: false, newCustomerData: {
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
        country: '',
        province: '',
        notes: ''
      }});
    });
  }
  updateBook() {
    let { id, firstName, lastName, country, province, email, mobileNumber } = this.state.editBookData;

    axios.put('http://localhost:8080/customer/update', {
      id, firstName, lastName, country, province, email, mobileNumber
    }, { headers: {"Authorization" : `Bearer `+localStorage.getItem('jwtToken')} }).then((response) => {
      this._refreshBooks();

      this.setState({
        editBookModal: false, editBookData: { id: '', firstName: '', lastName: '', country:'', province: '' }
      })
    });
  }
  editBook(id, firstName, lastName, country, province) {
    this.setState({
      editBookData: { id, firstName, lastName, country, province }, editBookModal: ! this.state.editBookModal
    });
  }
  deleteCustomer(id) {
    axios.delete('http://localhost:8080/customer/delete/' + id, { headers: {"Authorization" : `Bearer `+localStorage.getItem('jwtToken')}}).then((response) => {
      this._refreshBooks();
    });
  }
  _refreshBooks() {
    axios.get('http://localhost:8080/customer/all', { headers: {"Authorization" : `Bearer `+localStorage.getItem('jwtToken')} }).then((response) => {
      this.setState({
        customers: response.data
      })
    });
  }
  render() {
        if (this.state.isAuthenticated === false) {
            return <Redirect to='/' />
        }

    let customers = this.state.customers.map((customer) => {
      return (
        <tr key={customer.id}>
          <td>{customer.id}</td>
          <td>{customer.fullName}</td>
          <td>{customer.email}</td>
          <td>{customer.mobileNumber}</td>
          <td>{customer.country}</td>
          <td>{customer.province}</td>
          <td>
            <Button color="success" size="sm" className="mr-2" onClick={this.editBook.bind(this, customer.id, customer.firstName, customer.lastName, customer.country, customer.province)}>Edit</Button>
            <Button color="danger" size="sm" onClick={this.deleteCustomer.bind(this, customer.id)}>Delete</Button>
          </td>
        </tr>
      )
    });
    return (
      <div className="App container">

      <h1>Monty Customers App</h1>

      <Button className="my-3" color="primary" onClick={this.toggleNewCustomerModal.bind(this)}>Add Customer</Button>

      <Modal isOpen={this.state.newBookModal} toggle={this.toggleNewCustomerModal.bind(this)}>
        <ModalHeader toggle={this.toggleNewCustomerModal.bind(this)}>Add a new customer</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="title">First Name</Label>
            <Input id="title" value={this.state.newCustomerData.firstName} onChange={(e) => {
              let { newCustomerData } = this.state;

              newCustomerData.firstName = e.target.value;

              this.setState({ newCustomerData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="rating">Last Name</Label>
            <Input id="rating" value={this.state.newCustomerData.lastName} onChange={(e) => {
              let { newCustomerData } = this.state;

              newCustomerData.lastName = e.target.value;

              this.setState({ newCustomerData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="rating">Email</Label>
            <Input id="rating" value={this.state.newCustomerData.email} onChange={(e) => {
              let { newCustomerData } = this.state;

              newCustomerData.email = e.target.value;

              this.setState({ newCustomerData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="rating">Mobile Number</Label>
            <Input id="rating" value={this.state.newCustomerData.mobileNumber} onChange={(e) => {
              let { newCustomerData } = this.state;

              newCustomerData.mobileNumber = e.target.value;

              this.setState({ newCustomerData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="rating">Country</Label>
            <Input id="rating" value={this.state.newCustomerData.country} onChange={(e) => {
              let { newCustomerData } = this.state;

              newCustomerData.country = e.target.value;

              this.setState({ newCustomerData });
            }} />
          </FormGroup>

           <FormGroup>
            <Label for="rating">Province</Label>
            <Input id="rating" value={this.state.newCustomerData.province} onChange={(e) => {
              let { newCustomerData } = this.state;

              newCustomerData.province = e.target.value;

              this.setState({ newCustomerData });
            }} />
          </FormGroup>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.addCustomer.bind(this)}>Save</Button>{' '}
          <Button color="secondary" onClick={this.toggleNewCustomerModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={this.state.editBookModal} toggle={this.toggleEditCustomerModal.bind(this)}>
        <ModalHeader toggle={this.toggleEditCustomerModal.bind(this)}>Edit Customer</ModalHeader>
        <ModalBody>
          <Input id="id" type="hidden" value={this.state.editBookData.id} onChange={(e) => {
              let { editBookData } = this.state;

              editBookData.id = e.target.value;

              this.setState({ editBookData });
            }} />
          <FormGroup>
            <Label for="title">First Name</Label>
            <Input id="title" value={this.state.editBookData.firstName} onChange={(e) => {
              let { editBookData } = this.state;

              editBookData.firstName = e.target.value;

              this.setState({ editBookData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="rating">Last Name</Label>
            <Input id="lastName" value={this.state.editBookData.lastName} onChange={(e) => {
              let { editBookData } = this.state;

              editBookData.lastName = e.target.value;

              this.setState({ editBookData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="rating">Email</Label>
            <Input id="email" value={this.state.editBookData.email} onChange={(e) => {
              let { editBookData } = this.state;

              editBookData.email = e.target.value;

              this.setState({ editBookData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="rating">Mobile Number</Label>
            <Input id="mobileNumber" value={this.state.editBookData.mobileNumber} onChange={(e) => {
              let { editBookData } = this.state;

              editBookData.mobileNumber = e.target.value;

              this.setState({ editBookData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="rating">Country</Label>
            <Input id="rating" value={this.state.editBookData.country} onChange={(e) => {
              let { editBookData } = this.state;

              editBookData.country = e.target.value;

              this.setState({ editBookData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="rating">Country</Label>
            <Input id="rating" value={this.state.editBookData.province} onChange={(e) => {
              let { editBookData } = this.state;

              editBookData.province = e.target.value;

              this.setState({ editBookData });
            }} />
          </FormGroup>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.updateBook.bind(this)}>Update</Button>{' '}
          <Button color="secondary" onClick={this.toggleEditCustomerModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>


        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Mobile Number</th>
              <th>Country</th>
              <th>Province</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {customers}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Customer;
