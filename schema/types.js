const graphql = require('graphql');
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

module.exports = {
  CommentType,
  UserType,
  PostType
}
