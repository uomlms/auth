### Authentication Service
[Description]

### Current State
Under development

### Endpoints

| Route                              | Method | Body                                             |
|------------------------------------|--------|--------------------------------------------------|
| /api/users/signup                  | POST   | {name: string, email: string, password: string } |
| /api/users/signin                  | POST   | { email: string, password: string }              |
| /api/users/signout                 | POST   | {}                                               |
| /api/users/current-user            | GET    | {}                                               |