import React, { Component } from 'react';
import { Header, Container, Icon } from 'semantic-ui-react'
import './App.css';
import VoteForm from './Components/VoteForm';
import RegisterForm from './Components/RegisterForm';
import Results from './Components/Results';


class App extends Component {
  constructor(){
    super()
    this.state = {
      view: 'voting',
      deadline: new Date("06/01/2019"),
      vote_status: 'User Vote Unauthorized',
      is_voting: false
    }
    this.add_block = this.add_block.bind(this)
    this.add_user = this.add_user.bind(this)
    this.get_blocks = this.get_blocks.bind(this)
  }

  add_block(data){
    const json = JSON.stringify(data)
    var btn = document.getElementById('modal')

    var result = 'User Vote Unauthorized';
    var url = 'http://localhost:5000/blocks'
    var options = {
      method: 'POST',
      headers:
       { 'cache-control': 'no-cache',
         'Content-Type': 'application/json'
       },
      body: json
      };

      fetch(url, options)
        .then(response => {
          console.log("Stats", response.status)
          if(response.status == 201){
            alert("Vote Recorded Succesfully")
            this.setState({vote_status: "Vote Recorded Succesfully"})
            return
          } else if (response.status == 400){
            alert("User Has Already voted")
            this.setState({vote_status: "User Has Already Voted"})
            return
          } else {
            alert("User Vote Unauthorized")
              this.setState({vote_status: "User Vote Unauthorized"})
            return
          }
        })
        .catch( err => {
          alert("User Vote Unauthorized")
          })

  }

  add_user(data){
    const json = JSON.stringify(data)
    var url = 'http://localhost:5000/register'
    var options = {
      method: 'POST',
      headers:
       { 'cache-control': 'no-cache',
         'Content-Type': 'application/json'
       },
      body: json
      };

      fetch(url, options)
        .then(response => (response.json()))
        .then((data, stats) => console.log("Success: ", data, stats))
        .catch( err => console.log("Error: ", err))
  }

  get_blocks(){
    var url = 'http://localhost:5000/blocks'
    var options = {
      method: 'GET',
      headers:
       { 'cache-control': 'no-cache',
         'Content-Type': 'application/json'
       }
      };

      fetch(url, options)
        .then(response => response.json())
        .then(data => {
          console.log('Sucess:', data)
          this.setState({ blocks: data })
          })
        .catch( err => {
          console.error('Error:', err)
          })
  }



  componentDidMount(){
    this.get_blocks()
    this.timer = setInterval(() => this.get_blocks(), 10000);

  }

  componentWillUnmount(){
    this.timer = null
  }

  render() {
    let view;

    switch (this.state.view) {
      case 'voting':
        view = <VoteForm onSubmit={this.add_block} status={this.state.vote_status}/>
        break;
      case 'register':
        view = <RegisterForm onSubmit={this.add_user}/>
        break;
      case 'results':
        view = <Results deadline={this.state.deadline} blocks={this.state.blocks}/>
        break;
      default:

    }

    return (
      <div className="App">
      <Header className="App-header" icon="chain" block as='h2' content="Blockchain Voting Application" />
      <Container>
        {view}
      </Container>
      </div>
    );
  }
}

export default App;
