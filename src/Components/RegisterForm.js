import React, { Component } from 'react'
import { Form, Segment, Select, Icon, Checkbox  } from 'semantic-ui-react'
import { format_date } from "../Utils.js"

export default class RegisterForm extends Component{

  constructor(props){
    super()
    this.state = {}
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e, {value} ){
    this.setState({ [e.target.name]: value });
  }

  onSubmit(e){
    e.preventDefault()
    const user_data = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      ID: this.state.ID,
      DOB: format_date(this.state.DOB),
    }
    this.props.onSubmit(user_data);
  }

  render(){


    const genderOptions = [
      { key: 'm', text: 'Male', value: 'male' },
      { key: 'f', text: 'Female', value: 'female' },
    ]

    return(
      <Segment>
        <Form onSubmit={this.onSubmit}>
          <Form.Group widths={3}>
            <Form.Input required={true} label="Fisrt Name" type="text" name="first_name" placeholder="First Name" onChange={this.onChange}/>
            <Form.Input required={true} label="Last Name" type="text" name="last_name" placeholder="Last Name" onChange={this.onChange}/>
            <Form.Field
               control={Select}
               options={genderOptions}
               label={{ children: 'Gender', htmlFor: 'form-select-control-gender' }}
               placeholder='Gender'
               search
               searchInput={{ id: 'form-select-control-gender' }}
             />
          </Form.Group>
          <Form.Group >
            <Form.Input width={6} required={true} label="Email" type="text" name="email" placeholder="johndoe@example.com" onChange={this.onChange}/>
            <Form.Input width={4} required={true} label="D.O.B" type="date" name="DOB" placeholder="01/01/1900" onChange={this.onChange}/>
            <Form.Input width={4} required={true} label="Voter ID" type="text" name="ID" placeholder="Voter ID" onChange={this.onChange}/>
            </Form.Group>
            <br/><br/><br/><br/><br/>
            <Form.Field required={true}>
              <Checkbox  label='I agree to the Terms and Conditions' />
            </Form.Field>
          <Form.Button icon labelPosition='left' size='medium' color='green' >
          Register
            <Icon name='check'/>
          </Form.Button>
          <br/>
        </Form>

      </Segment>
    )
  }
}
