# End to end typing demo app

This small application shows some of the techniques discussed in the end to end typing talk.

## Setup

Run

```
bin/setup
rake db:seed
```

to install dependencies and seed the db

Then run `bin/dev` to run the rails server and the javascript file watcher

## Overview

`app/controllers/users_controller.rb`: Implements a simple controller for the index and show actions. the index action
support html and json formats, the show action only json

`app/lib/schema.rb`: helper file for managing schemas

`app/javascript/components/pagination.tsx`: A react component that renders pagination links
`app/javascript/components/user.tsx`: A react component that renders a detailed view of a user
`app/javascript/components/users.tsx`: A react component that renders a list of user summaries. This is the root
components on the users page. It reads the props stored in the dom that contain the initial list of users to display.
You can click on the pagination links to load other pages or on on the 'show' links to see the details for a user

`app/javascript/utils/api.ts`: the api mapping for this application, mapping request paths to types
`app/javascript/utils/get_api.ts`: the typesafe request function: this only allows paths defined in api.ts and returns
data of the type indicated by the mapping

`app/javascript/generated_types/users.ts`: the types file generated from `schemas/users.json`

`bin/generate-types`: the script that generates type files from schemas

`spec/requests/users_spec.rb`: a request spec for the users controller, showing how to use schema files to validate
responses

`schemas/users.json`: the schema root file `schemas/responses/`: contains the schemas for the individual response
`schemas/types/`: contains the schemas for `UserSummary`, `UserDetail`, `Pagination` that are used by the response types

## Development

You can run the typescript checks by running `yarn run tsc`.

You can regenerate the types (if you have changed the schema files) with `bin/generate-types`
