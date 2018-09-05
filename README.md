# Graphql JSONPlaceholder implementation

This is a Graphql server using [JSONPlaceholder](https://jsonplaceholder.typicode.com/) fake REST API for Testing and Prototyping.

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
