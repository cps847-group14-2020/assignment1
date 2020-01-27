const fetch = require('isomorphic-fetch');
const express = require('express')
const app = express()
const port = 3000
const { WebClient } = require('@slack/web-api');
const token = process.env.SLACK_OAUTH_TOKEN;
const web = new WebClient(token);

app.use(express.json());
app.get('/', (req, res) => {
  console.log('YES SOMETHING');
  res.send('Hello World!')
});

app.post('/', (req, res) => {
  console.log(req.body);
  res.set('Content-type', 'application/json');
  if(req.body.challenge)
    return res.send({
      challenge: req.body.challenge
    });
  switch(req.body.event.type){
    case "app_mention":
      web.chat.postMessage({
        text: req.body.event.text.replace(/\<.*\>/, ""),
        channel: req.body.event.channel,
      });
      return res.send(null);
      break;
    default:
      return res.send(null);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

