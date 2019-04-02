import React, { Component } from 'react'
import { Form, Segment, Select, Icon, Modal, Header  } from 'semantic-ui-react'
import { format_date } from "../Utils.js"


export default class VoteForm extends Component{

  constructor(props){
    super()
    this.state = {}

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e, {value} ){
    this.setState({ [e.target.name]: value });
    if (e.target.innerHTML){
      console.log(e.target.innerHTML)
      this.setState({ vote_cast: value })
    }
  }

  onSubmit(e){
    e.preventDefault()
    const transaction_data = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      ID: this.state.ID,
      DOB: format_date(this.state.DOB),
      vote_data: {
        date: new Date(),
        vote_issue: "2020 Presidential Election",
        vote_cast: this.state.vote_cast
      },
      prev_hash: "0",
      curr_hash: "1"
    }
    this.props.onSubmit(transaction_data);
  }

  render(){

    var status = "User Vote Unauthorized"
    if(!this.props.status){
      status = this.props.status
    }

    const vote_candidates = [
      {text:"Barack Obama", value:"Barack Obama"},
      {text:"Donald Trump", value:"Donald Trump"}
    ]

    return(

      <Segment>
      <Modal trigger={<a visible="false" id="modal"></a>} basic size='small'
          closeIcon >
          <Header icon='archive' content='Voting Status' />
          <Modal.Content>
            {status}
          </Modal.Content>
        </Modal>
        <Form onSubmit={this.onSubmit}>
          <Form.Group widths={3}>
            <Form.Input required={true} label="Fisrt Name" type="text" name="first_name" placeholder="First Name" onChange={this.onChange}/>
            <Form.Input required={true} label="Last Name" type="text" name="last_name" placeholder="Last Name" onChange={this.onChange}/>
          </Form.Group>
          <Form.Group widths={4}>
            <Form.Input required={true} label="D.O.B" type="date" name="DOB" placeholder="01/01/1900" onChange={this.onChange}/>
            <Form.Input required={true} label="Voter ID" type="text" name="ID" placeholder="Voter ID" onChange={this.onChange}/>
          </Form.Group>
          <Form.Group widths={2}>
            <Form.Input readOnly required={true} label="Vote Issue" name="vote_issue" placeholder="2020 Presidential Election"/>
            <Form.Field required={true} control={Select} options={ vote_candidates }label="Vote" name="vote_cast" onChange={this.onChange}/>
          </Form.Group>
          <Form.Button icon labelPosition='left' size='medium' color='green' >
          Vote
            <Icon name='check'/>
          </Form.Button>
        </Form>
      </Segment>
    )
  }
}
