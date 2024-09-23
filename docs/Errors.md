# Snippet from 'Cognitive Load is What Matters'

## Business logic and HTTP status codes
On the backend we return:  
`401` for expired jwt token  
`403` for not enough access  
`418` for banned users  

The guys on the frontend use backend API to implement login functionality. They would have to temporarily  create the following cognitive load in their brains:  
`401` is for expired jwt token // `🧠+`, ok just temporary remember it  
`403` is for not enough access // `🧠++`  
`418` is for banned users // `🧠+++`  

Frontend developers would (hopefully) introduce some kind `numeric status -> meaning` dictionary on their side, so that subsequent generations of contributors wouldn't have to recreate this mapping in their brains.

Then QA people come into play:
"Hey, I got `403` status, is that expired token or not enough access?"
**QA people can't jump straight to testing, because first they have to recreate the cognitive load that the guys on the backend once created.**

Why hold this custom mapping in our working memory? It's better to abstract away your business details from the HTTP transfer protocol, and return self-descriptive codes directly in the response body:
```json
{
    "code": "jwt_has_expired"
}
```

Cognitive load on the frontend side: `🧠` (fresh, no facts are held in mind)  
Cognitive load on the QA side: `🧠`

The same rule applies to all sorts of numeric statuses (in the database or wherever) - **prefer self-describing strings**. We are not in the era of 640K computers to optimise for memory.  

> People spend time arguing between `401` and `403`, making decisions based on their own mental models. New developers are coming in, and they need to recreate that thought process. You may have documented the "whys" (ADRs) for your code, helping newcomers to understand the decisions made. But in the end it just doesn't make any sense. We can separate errors into either user-related or server-related, but apart from that, things are kind of blurry. 

P.S. It's often mentally taxing to distinguish between "authentication" and "authorization". We can use simpler terms like ["login" and "permissions"](https://ntietz.com/blog/lets-say-instead-of-auth/) to reduce the cognitive load.

# Using ApiError
You shouldn't need to really touch any of the code in `errors/api_error.go`; just know that the `ApiError.Send(ctx *fiber.Ctx)` method is what is used to return an API error from the server. What you will probably need to modify is code in `errors/constants.go`, where you will initialize ApiErrors (and their codes and messages). Things to keep in mind:

- The `Code` should always be either 400 (error is caused by the client/request) or 500 (error is caused by the server).
- The `Message` should always be a single `camel_case` identifier, i.e `jwt_has_expired`, `user_not_found`, etc.
- The granularity for errors (should I return internal server error? should I return something more specific) is TBD, something that will be ironed out through code reviews and what not. Something to keep in mind, though, is that the error messages you create will be the ones you will eventually be dealing with on the frontend to create error handling UI/UX.