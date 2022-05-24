# jira-integration-poc

The purpose of this repository is to investigate:

- How to get the status of a Jira ticket via an API integration

- How to link cases per ticket

- How to update the status of a Jira ticket (may not be needed)

## Implementation

There are several types of authentication to gain access to the Jira API.

- Basic authentication
- OAuth
- OAuth 2.0
- JWT
- Personal access token

For POC I have used `Basic authentication`, for which we require:

- Jira Domain name of organization
- Email id registered on jira account
- Api token (need to gererate from [generate api token](https://id.atlassian.com/manage-profile/security/api-tokens) link )

Basic authentication snippet
```{
  host: 'https://your-domain.atlassian.net',
  authentication: {
    basic: {
      email: 'YOUR@EMAIL.ORG',
      apiToken: 'YOUR_API_TOKEN',
    },
  },
}
```

#### Endpoint
- `/case/:caseReference/:jiraTicket`
 enpoint returns the status of the jira ticket mentioned in the params



