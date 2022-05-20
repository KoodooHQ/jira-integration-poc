require('dotenv').config();
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000

const axios = require('axios');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const jiraRequestHeaders = {
    Authorization: `Basic ${Buffer.from(`${process.env.JIRA_EMAIL}:${process.env.JIRA_API_TOKEN}`).toString("base64")}`
};

const siteUrl = `https://${process.env.DOMAIN}.atlassian.net`

app.get('/case/:caseReference/:jiraTicket', async (req, res) => {
    try {
        const { jiraTicket } = req.params;
        
        const result = await axios.get(`${siteUrl}/rest/api/2/issue/${jiraTicket}?fields=status`, {
        headers: jiraRequestHeaders
        });
    
      res.status(200).send(result.data)
    } catch (error) {
      res.status(400).send(error)
    }
});

app.get('/transactions/:jiraTicket', async (req, res) => {
    try {
        const { jiraTicket } = req.params;

        const result = await axios.get(`${siteUrl}/rest/api/2/issue/${jiraTicket}/transitions`, {
            headers: jiraRequestHeaders
        });

        const transactionList = result.data.transitions.map(tran => ({
            id: tran.id,
            status: tran.name
        }))
    
        res.status(200).send(transactionList)
    } catch (error) {
      res.status(400).send(error)
    }
});

app.post('/transactions/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { jiraTicket } = req.body;
        const body = {
            transition: id
        }

        const result = await axios.post(`${siteUrl}/rest/api/2/issue/${jiraTicket}/transitions`,
        body,
        {
            headers: jiraRequestHeaders
        });
    
      res.status(200).send({ result :'Success!'})
    } catch (error) {
      res.status(400).send(error)
    }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})