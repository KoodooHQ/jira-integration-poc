require('dotenv').config();
const express = require('express')
const app = express()
const port = 3000

const axios = require('axios');

app.get('/case/:caseReference/:jiraTicket', async (req, res) => {
    try {
        const { jiraTicket } = req.params;
        const jiraRequestHeaders = {
            Authorization: `Basic ${Buffer.from(`${process.env.JIRA_EMAIL}:${process.env.JIRA_API_TOKEN}`).toString("base64")}`
        };

        const result = await axios.get(`https://${process.env.DOMAIN}.atlassian.net/rest/api/2/issue/${jiraTicket}?fields=status`, {
        headers: jiraRequestHeaders
        });
    
      res.status(200).send(result.data)
    } catch (error) {
      res.status(400).send(error)
    }

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})