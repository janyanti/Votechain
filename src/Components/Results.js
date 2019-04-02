import React, { Component } from 'react'
import { Segment, Statistic, List  } from 'semantic-ui-react'
import { get_countdown } from "../Utils"
import { Bar, Pie, Doughnut } from 'react-chartjs-2'
import { getVoteCount } from '../Utils'

export default class Results extends Component{

  constructor(props){
    super()
    this.state = {}
    this.onSubmit = this.onSubmit.bind(this)
  }

  tick(){
    this.setState({date_diff: this.props.deadline - new Date()})
  }

    componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        1000
      );
    }

  onSubmit(e){
    e.preventDefault()
    console.log(this.state)
  }

  render(){

    const countdown = get_countdown(this.state.date_diff)
    const blockdata = this.props.blocks
    const count = getVoteCount(blockdata)
    if(blockdata){
      return(
        <div>
          <Statistic size='tiny'>
            <Statistic.Value>{countdown}</Statistic.Value>
            <Statistic.Label>Until Voting ends</Statistic.Label>
          </Statistic>
          <ResultChart vote_count={count}/>
          <Segment>
            <List divided relaxed >
              {blockdata.map( data => (
                <Block key={data.curr_hash} data={data}/>)
              )}
            </List>
          </Segment>
        </div>
      )
    } else {
      return (<div>Loading...</div>)
    }
  }
}


const Block = (props) => {
  const block_data = props.data
  const date = new Date(block_data.vote_data.date).toUTCString()
  const first_letter = block_data.first_name[0]
    return(
    <List.Item>
      <List.Icon name='chain' size='large' verticalAlign='middle' />
      <List.Content>
        <List.Header >{`USER ${first_letter}XXXXX Voted for ${block_data.vote_data.vote_cast}`}</List.Header>
        <List.Description >{date}</List.Description>
      </List.Content>
    </List.Item>
    )
}

class ResultChart extends Component {

  constructor(props){
    super(props)
    this.state = {
      chart_data: {
        labels: ["Barack Obama", "Donald Trump"],
        datasets: [{
          label: "# of Votes",
          data: this.props.vote_count,
          backgroundColor: [
          'rgba(17, 28, 242, 0.8)',
          'rgba(246, 59, 68, 0.8)'
          ]
        }]
      }
    }
  }

  tick(){
    this.setState({datasets:
      {...this.state.datasets, data: this.props.vote_count} })
  }

  componentDidMount(){
    if(this.state.datasets){
      setInterval(() => this.tick(), 500)
    }
  }

  render(){
    return (
      <div className="chart" width="200px" height="200px">
        <Doughnut
          data={this.state.chart_data}
          options={{responsive: true}}
        />
      </div>
    )
  }
}
