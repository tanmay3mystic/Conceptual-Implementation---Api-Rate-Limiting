# Limiting-API-Calls-Server-Node

# Project Description :

Rate limiting

Rate limiting protects your APIs from overuse by limiting how often each user can call the API. This protects them from inadvertent or malicious overuse. Without rate limiting, each user may request as often as they like, leading to “spikes” of requests that starve other consumers.
In case a client made too many requests within a given time frame, HTTP servers can respond with Status code: 429, Too Many Requests.


Create your own RESTful API.
GET http://localhost:3000/api/posts – This will get an array of 10 posts with status code 200
GET http://localhost:3000/api/posts?max=15 – This will get an array 15 posts with status code 200
each post is an object, see initialData.js

 Criteria

If users make API call without specifying max then response with an array of 10 posts (default case) with status code 200

If user makes an API call then for 30sec if user makes another calls then respond with an array of posts where number of posts will be minimum of first API call's max and current API call's max. max denotes number of post and default value is 10

if user makes more than 5 API calls within 30sec then respond with {message: "Exceed Number of API Calls"} with status code 429 After 30sec resume everything back to initial state

Maximum number of posts should be 20 only if max is specified and less than or equal to 20 otherwise it's 10. ex: http://localhost:3000/api/posts?max=21 should return an array of 10 posts only.
