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

const { CommentType, PostType, UserType } = require('./types');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    comments: {
      type: new GraphQLList(CommentType),
      resolve(_, args) {
        return axios.get(`https://jsonplaceholder.typicode.com/comments`)
          .then(res => res.data);
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve(_, args) {
        return axios.get(`https://jsonplaceholder.typicode.com/posts`)
          .then(res => res.data);
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(_, args) {
        return axios.get(`https://jsonplaceholder.typicode.com/users`)
          .then(res => res.data);
      }
    },
    user: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parentValues, args) {
        return axios.get(`https://jsonplaceholder.typicode.com/users/${args.id}`)
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
