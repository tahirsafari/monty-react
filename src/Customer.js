import React, { Component } from 'react';
import axios from 'axios';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';
import  { Redirect } from 'react-router-dom';

class Customer extends Component {
  state = {
    isAuthenticated: false,
    customers: [],
    apiBasePoint: 'http://localhost:8080/customer/',
    newCustomerData: {
      firstName: '',
      lastName: '',
      email: '',
      mobileNumber: '',
      country: '',
      province: '',
      notes: ''
    },
    editCustomerData: {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      mobileNumber: '',
      country: '',
      province: '',
      notes: ''
    },
    newCustomerModal: false,
    editCustomerModal: false
  }
  componentWillMount() {
    this._refreshCustomers();
    console.log(localStorage.jwtToken)
    if(localStorage.jwtToken){
        this.setState({isAuthenticated: true});
      }
  }
  toggleNewCustomerModal() {
    this.setState({
      newCustomerModal: ! this.state.newCustomerModal
    });
  }
  toggleEditCustomerModal() {
    this.setState({
      editCustomerModal: ! this.state.editCustomerModal
    });
  }
  addCustomer() {
    axios.post(this.state.apiBasePoint+'add', this.state.newCustomerData, { headers: {"Authorization" : `Bearer `+localStorage.getItem('jwtToken')}}).then((response) => {
      let { customers } = this.state;

      customers.push(response.data);

      this.setState({ customers, newCustomerModal: false, newCustomerData: {
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
  updateCustomer() {
    let { id, firstName, lastName, country, province, email, mobileNumber } = this.state.editCustomerData;

    axios.put(this.state.apiBasePoint+'update', {
      id, firstName, lastName, country, province, email, mobileNumber
    }, { headers: {"Authorization" : `Bearer `+localStorage.getItem('jwtToken')} }).then((response) => {
      this._refreshCustomers();

      this.setState({
        editCustomerModal: false, editCustomerData: { id: '', firstName: '', lastName: '', country:'', province: '' }
      })
    });
  }
  editCustomer(id, firstName, lastName, country, province, email, mobileNumber) {
    this.setState({
      editCustomerData: { id, firstName, lastName, country, province , email, mobileNumber}, editCustomerModal: ! this.state.editCustomerModal
    });
  }
  deleteCustomer(id) {
    axios.delete(this.state.apiBasePoint+'delete/' + id, { headers: {"Authorization" : `Bearer `+localStorage.getItem('jwtToken')}}).then((response) => {
      this._refreshCustomers();
    });
  }
  _refreshCustomers() {
    axios.get(this.state.apiBasePoint+'all', { headers: {"Authorization" : `Bearer `+localStorage.getItem('jwtToken')} }).then((response) => {
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
            <Button color="success" size="sm" className="mr-2" onClick={this.editCustomer.bind(this, customer.id, customer.firstName, customer.lastName, customer.country, customer.province, customer.email, customer.mobileNumber)}>Edit</Button>
            <Button color="danger" size="sm" onClick={this.deleteCustomer.bind(this, customer.id)}>Delete</Button>
          </td>
        </tr>
      )
    });
    return (
      <div className="App container">

      <h1>Monty Customers App</h1>

      <Button className="my-3" color="primary" onClick={this.toggleNewCustomerModal.bind(this)}>Add Customer</Button>

      <Modal isOpen={this.state.newCustomerModal} toggle={this.toggleNewCustomerModal.bind(this)}>
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

      <Modal isOpen={this.state.editCustomerModal} toggle={this.toggleEditCustomerModal.bind(this)}>
        <ModalHeader toggle={this.toggleEditCustomerModal.bind(this)}>Edit Customer</ModalHeader>
        <ModalBody>
          <Input id="id" type="hidden" value={this.state.editCustomerData.id} onChange={(e) => {
              let { editCustomerData } = this.state;

              editCustomerData.id = e.target.value;

              this.setState({ editCustomerData });
            }} />
          <FormGroup>
            <Label for="title">First Name</Label>
            <Input id="title" value={this.state.editCustomerData.firstName} onChange={(e) => {
              let { editCustomerData } = this.state;

              editCustomerData.firstName = e.target.value;

              this.setState({ editCustomerData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="rating">Last Name</Label>
            <Input id="lastName" value={this.state.editCustomerData.lastName} onChange={(e) => {
              let { editCustomerData } = this.state;

              editCustomerData.lastName = e.target.value;

              this.setState({ editCustomerData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="rating">Email</Label>
            <Input id="email" value={this.state.editCustomerData.email} onChange={(e) => {
              let { editCustomerData } = this.state;

              editCustomerData.email = e.target.value;

              this.setState({ editCustomerData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="rating">Mobile Number</Label>
            <Input id="mobileNumber" value={this.state.editCustomerData.mobileNumber} onChange={(e) => {
              let { editCustomerData } = this.state;

              editCustomerData.mobileNumber = e.target.value;

              this.setState({ editCustomerData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="rating">Country</Label>
            <Input id="rating" value={this.state.editCustomerData.country} onChange={(e) => {
              let { editCustomerData } = this.state;

              editCustomerData.country = e.target.value;

              this.setState({ editCustomerData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="rating">Country</Label>
            <Input id="rating" value={this.state.editCustomerData.province} onChange={(e) => {
              let { editCustomerData } = this.state;

              editCustomerData.province = e.target.value;

              this.setState({ editCustomerData });
            }} />
          </FormGroup>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.updateCustomer.bind(this)}>Update</Button>{' '}
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
