- Authentication flow
User                                                                    Backend
POST /login w/ email and password
                                                                        If correct credentials, create access token + refresh token, send back access + refresh, else send 400 error
With access token, GET/POST authenticated endpoint
                                                                        Decode + check access token, if correct, proceed with request (now with user object), else send 401 unauthorized
(401 Unauthorized came back), POST refresh w/ refresh token
                                                                        Decode + check refresh token, if correct, return back new access token, else send 401 unauthorized
(401 Unauthorized came back), have user redo /login

(200 OK with access token came back), set new access token, 
GET/POST authenticated endpoint

User                                                                    Backend
POST /register w/ email and password
                                                                        If correct credentials (email is unique), create new user, then create access token + refresh token,
                                                                        then send back access + refresh, else send 400 error
    - How are access/refresh tokens sent?
        - Authorization: Bearer <TOKEN>
    - What endpoints are going to be needed?
        - /api/v1/auth/login
            - Needs email and password in JSON body
            - Hash password and check with database
                - Should be made transaction
        - /api/v1/auth/register
            - Needs email and password in JSON body
            - Check database for existing email (return 400)
            - Hash password and create new user in database
                - Above steps should be made transaction
        - /api/v1/auth/refresh
            - Just takes refresh token in Authorization header
                - Steps should be made transaction
    - What models needto be made in database?
        - User
            - Email and (hashed) password
    - What auth methods are needed?
        - (Futureproofing but delete if it appears super redundant immediately) make Auth a singleton to be passed around w/ DB in serviceparams
        - Encoding/decoding refresh tokens
        - Encoding/decoding access tokens
        - Hashing passwords
    - What config is needed
        - 2 secrets for JWTs - access and refresh.
    - What middleware is needed?
        - ValidateAndSetUser - decodes access token, if correct will set a local to be used in further request, if incorrect returns a 401 Unauthorized
            - Basic flow is grab token from authorization -> decode with auth fn -> extract id if decode successful -> id is used for db -> continue
            - This wlil be under Auth service.

- Unresolved question: how trustworthy is data within a JWT?
    - If its supertrustworthy, a refresh token could contain (in payload) its expire date, and once verified on server, be used to check for validity
    - If not, then we probably need a model storing refresh tokens or something