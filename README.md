# Graphql JSONPlaceholder implementation

This is a Graphql server using [JSONPlaceholder](https://jsonplaceholder.typicode.com/) fake REST API for Testing and Prototyping.

## Live example

[https://sheltered-dawn-55270.herokuapp.com](https://sheltered-dawn-55270.herokuapp.com/graphql)

## Sample Queries

**Fetch posts:**

```
query {
  posts {
    id
    userId
    title
    body
  }
}
```

**Fetch todos:**

```
query {
  todos {
    id
    userId
    title
    completed
  }
}
```

**Fetch users:**

```
query {
  users {
    id
    name
    username
    email
    phone
    website
  }
}
```

**Fetch single user:**

```
query fetchUser($id: Int!){
  user(id: $id) {
    id
    name
    username
    email
    phone
    website
    posts {
      id
      title
      body
    }
  }
}
```
