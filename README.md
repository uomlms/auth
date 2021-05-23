### Authentication Service
Authentication Service is responsible for authenticating the users.
Provides endpoints for signup, signin, signout and current user information.

### Getting Started
[Getting Started Section]

### Current State
Under Development

### Endpoints

| Route                              | Method | Body                                             |
|------------------------------------|--------|--------------------------------------------------|
| /api/users/signup                  | POST   | {name: string, email: string, password: string } |
| /api/users/signin                  | POST   | { email: string, password: string }              |
| /api/users/signout                 | POST   | {}                                               |
| /api/users/current-user            | GET    | {}                                               |