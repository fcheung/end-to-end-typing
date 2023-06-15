# End to end typing demo app

This small application shows some of the techniques discussed in my end to 
end typing talk.

It shows passing props to a component in a checked-by-schema way, 
generating types from those same schema files, and using them in react components.

It also implements a simple api helper for fetching data from the rails app in a typesafe way

The emphasis is on showing these techniques without too much distraction, clearly this code is clearly overkill if you
really just want to display a paginated list of users.

## Setup

Run

```
bin/setup
rake db:seed
```

to install dependencies and seed the db. You can run this locally if you have ruby 3.2, node and yarn installed or you
can run this inside a devcontainer / github codespaces.

Then run `bin/dev` to run the rails server and the javascript file watcher. By default this will run on
http://localhost:3000

## Development

You can run the typescript checks by running `yarn run typescript-check`.

You can regenerate the types (if you have changed the schema files) with `bin/generate-types`

## Contents

`app/controllers/users_controller.rb`: Implements a simple controller for the index and show actions. the index action
support html and json formats, the show action only json

`app/lib/schema.rb`: helper file for managing schemas

`app/javascript/components/pagination.tsx`: A react component that renders pagination links
`app/javascript/components/user.tsx`: A react component that renders a detailed view of a user
`app/javascript/components/users.tsx`: A react component that renders a list of user summaries. This is the root
component on the users page. It reads the props stored in the dom that contain the initial list of users to display. You
can click on the pagination links to load other pages or on on the 'show' links to see the details for a user

`app/javascript/utils/api.ts`: the api mapping for this application, mapping request paths to types
`app/javascript/utils/get_api.ts`: the typesafe request function: this only allows paths defined in api.ts and returns
data of the type indicated by the mapping

`app/javascript/generated_types/users.ts`: the types file generated from `schemas/users.json`

`bin/generate-types`: the script that generates type files from schemas

`spec/support/schema_helpers.rb`: a matcher for validating data against a schema file (or portion thereof)
`spec/support/props_helper.rb`: a helper for finding an element on the page using a css selector and then reading its
data attributes

`spec/requests/users_spec.rb`: a request spec for the users controller, showing how to use schema files to validate
responses

`schemas/users.json`: the schema root file `schemas/responses/`: contains the schemas for the individual response
`schemas/types/`: contains the schemas for `UserSummary`, `UserDetail`, `Pagination` that are used by the response types
