//Javascript utilities for GUI

const CAND_ONE = "Barack Obama"
const CAND_TWO = "Donald Trump"

export function format_date(data){
  console.log("orig", data)
  var date = new Date(data)
  var year = date.getFullYear().toString()
  var month = (date.getMonth() + 1).toString()
  var day = date.getUTCDate().toString()

  const formatted = month + "/" + day + "/" + year
  return formatted
}

export function post_vote(data){
  var result;
  var url = 'http://localhost:5000/blocks'
  var options = {
    method: 'POST',
    mode: 'no-cors',
    headers:
     { 'cache-control': 'no-cache',
       'Content-Type': 'application/json' },
    body: data
    };

    fetch(url, options)
      .then(response => {
        console.log('Sucess:', response)
        result = "Voter recorded succesfully"
        })
      .catch( err => {
        console.error('Error:', err)
        result = "User vote unauthorized"
        })

        return result

}

export function get_votes(data){
  var url = 'http://localhost:5000/blocks'
  var options = {
    method: 'GET',
    mode: 'no-cors',
    headers:
     { 'cache-control': 'no-cache',
       'Content-Type': 'application/json'
     }
    };

    fetch(url, options)
      .then(response => {
        console.log('Sucess:', response)
        this.setState({ blocks: response })
        })
      .catch( err => {
        console.error('Error:', err)
        })



}

export function get_countdown(milliseconds){
  var weeks = Math.floor((milliseconds / (1000*60*60*24*7)))
  var days = Math.floor(((milliseconds / (1000*60*60*24)) % 7))
  var hours = Math.floor(((milliseconds / (1000*60*60)) % 24))
  var minutes = Math.floor(((milliseconds / (1000*60)) % 60))
  var sec = Math.floor((milliseconds / 1000) % 60)

  const countdown = `${weeks} Weeks ${days} Days ${hours}
   Hours ${minutes} Minutes ${sec} Seconds`

  return countdown

}

export function getVoteCount(data){
  let candidate_one;
  let candidate_two;
  if(data){
    let temp = data.slice(1)
    candidate_one = temp.filter( elem => elem.vote_data.vote_cast === CAND_ONE).length
    candidate_two = temp.filter( elem => elem.vote_data.vote_cast === CAND_TWO).length
    return [candidate_one, candidate_two]
  } else {
    return [0,0]
  }
}
