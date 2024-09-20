# Development notes
Scattered thoughts when I was designing out schema, not really meant for reading but you can probably gleam some info out of this.

- TODO: location data -> address,street,zip code, state, 
### QOL/backlog things (dump this to JIRA)
- User investments are immutable
- Use SQL triggers to calculate the remaining amount a project can be funded, prevent the amount a project's been funded from going over the amount
    - This stuff should also be implemented on server level, but SQL triggers provide another level 
- Updated_at (this requires a bunch of trigger stuff I dont wanna do rn lol)
- Milestones/progress updates - this is something that needs to be talked over with design

### General notes
- Everything should have created_at and/or updated_at
    - updated_at seems like a PITA so hold on one sec
- TODO: Lots of 'description' fields on these tables - do we want this to be plaintext or markdown/more fancy format? Mostly a design thing.
- All locations are addresses
- TODO: Constraint checking on shares: the shares that users have bought of a project should never exceed its total_shares (obv), consequently theres also some stuff we could maybe do to calculate remaining shares, idk.
- TODO: fuck we need to keep purchase history
    - I think if we just change user_shares to user_shares_purchases (table stores # of shares user has in a project -> table stores purchases of shares of project over time that a user made) this fixes it well, though this could result in some complex queries for getting total shares user has in a project, shares remaining, etc.
- TODO: switch to kickstarter model
    - Total amonut of money to raise, users can fund arbitrary amount that translates into % of eventual profits
- TODO: milestones instead of progress
    - discrete sort of thing entitlements, construction started, construction ended 
    - different milestones (????) per project
        - either we have predefined milestones developer can choose from and user can choose that
        - or we have predefined project pipelines of a set list of milestones
- TODO: mark projects as completed

### Models and their table details
- Users
    - Supabase ID as primary key
        - Auth middleware will handle syncing (if the given token is valid but is for a user with no entry, create that entry)
    - First and last name
    - TODO: what other fields would we want here?
- Project
    - Developer id (associates the project w/ the developer)
    - Title & description
    - Location
    - Total shares, price/share
    - TODO: what other financial info (or any info) do we want here?
- Developer
    - Company name
    - Location
    - Description
    - TODO: What other descriptive information do we want?
- User projects
    - Effectively a M2M association - Keep a User id and Project id on this one
    - Quantity of shares in the given property
- Project posts
    - Updates/events on the property
    - Since there's only one developer per project we just need an project ID here
    - Title, Text (TODO: anything else we'd like?)
- Project progress updates
    - Think % progress bar - the reason this would be its own table and not just a field upon a given project entry is so users can see progress over time
    - Needs project ID (obviously)
    - Current progress (ensure this is always between 0 and 100)
- Images on projects
    - Project ID and link to image URL
    - TODO: since we aren't doing developer URL, do we want to set up S3 infra or have image links be to like cats or random stock photos rn.
        - I vote for S3 infra as reach feature (if we have time), this is something I fear we'd get bogged down on.
- Images on project posts
    - Post ID and link to image URL

### Warpath
Note that this does not include milestone stuff (because I hate myself/because I dont know what design has in mind for this).

TIER 0: 

- User creation
    - Auth middleware, upon recieving a correct access token, will check if the user's id exists in the database. If it does, then a local will be set which the main request handler can use, if not, then the middleware will create the user row itself.
- GET /developers
    - Get all developers
    - Provide seed data for developers on this ticket too.
- GET /projects
    - Get all projects
    - Provide seed data for projects on this ticket too.
- GET /developers/{id}
    - Get a developer by its ID.
- GET /projects/{id}
    - Get a project by its ID.

TIER 1: 

- POST /projects/{id}/invest
    - Endpoint for investing in a project. Request body should just include the amount user is looking to fund. 
    - Should include validation such that the user cannot make an investment that would exceed the total funding goal of a project. 
    - Also do seeding for the user_investments on this one too.
- GET /projects/{id}/total-funded
    - Endpoint for getting the total amount currently funded for a project.
    - Technically, this would be a query on user_investments where you get all the investments for the given project, then sum the funded_cents of all the entries
        - YOU WILL NOT do the summation in Golang code
        - YOU WILL use PostgreSQL summation query to do this. 
- GET /projects/{id}/posts
    - Endpoint for getting the posts of a given project
    - Pagination, sort from latest to earliest.

TIER 2:

- GET /projects/{id}/posts/{id}/images
    - Endpoint for getting the images of a post of a given project.
- GET /projects/{id}/images
    - Endpoint for getting the images of a given project.
- GET /user/portfolio
    - Return general portfolio data for a user - total portfolio value and a breakdown of
    total amount they have invested in X amount of projects.
- GET /user/history
    - Using user_investments, return a history of user investments in given properties.
    - Pagination, sort from latest to earliest.
- GET /user/profile
    - Return general profile info for a user - as of right now, this is just first name and last name (will probably change).

TIER 3:

- Location filtering
    - How do you figure out if two addresses are within a X mile radius
    - Im assuming theres some sort of general solution to this that we can then use for developer and project filtering, but if not
    then this should just be rolled into developers and projects.
- Refactor /developers
    - Pagination, filters on parameters (what these parameters are depends on what design has in mind), find developers in X mile radius
- Refactor /projects
    - Pagination, filters on parameters (what these parameters are depends on what design has in mind), find projects in X mile radius
    - Look into creating 'popular' view 
        - 'sorting by views in last 2 weeks' ive heard is good way to do this, could be fun too since theres an analytics angle (how do you count and track views?)

TIER 4: 
- Notifications
- Payment processing
- Do frontend
