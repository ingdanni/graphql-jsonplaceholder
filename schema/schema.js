const graphql = require('graphql');
const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: () => ({
    postId: { type: GraphQLInt },
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    body: { type: GraphQLString }
  })
});

const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    userId: { type: GraphQLInt },
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    comments: {
      type: new GraphQLList(CommentType),
      resolve(parentValue, args) {
        return axios.get(`https://jsonplaceholder.typicode.com/posts/${parentValue.id}/comments`)
          .then(res => res.data);
      }
    }
  })
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    website: { type: GraphQLString },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parentValue, args) {
        return axios.get(`https://jsonplaceholder.typicode.com/users/${parentValue.id}/posts`)
          .then(res => res.data);
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    comment: {
      type: new GraphQLList(CommentType),
      resolve(_, args) {
        return axios.get(`https://jsonplaceholder.typicode.com/comments`)
          .then(res => res.data);
      }
    },
    post: {
      type: new GraphQLList(PostType),
      resolve(_, args) {
        return axios.get(`https://jsonplaceholder.typicode.com/posts`)
          .then(res => res.data);
      }
    },
    user: {
      type: new GraphQLList(UserType),
      resolve(_, args) {
        return axios.get(`https://jsonplaceholder.typicode.com/users`)
          .then(res => res.data);
      }
    }
  }
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    deletePost: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parentValue, args) {
        return axios.delete(`https://jsonplaceholder.typicode.com/posts/${args.id}`)
          .then(res => res.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  mutation,
  query: RootQuery
});
