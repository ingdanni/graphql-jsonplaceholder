const axios = require('axios');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const TodoType = new GraphQLObjectType({
  name: 'Todo',
  fields: () => ({
    userId: { type: GraphQLInt },
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    completed: { type: GraphQLBoolean },
  })
});

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

const PhotoType = new GraphQLObjectType({
  name: 'Photo',
  fields: () => ({
    albumId: { type: GraphQLInt },
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    url: { type: GraphQLString },
    thumbnailUrl: { type: GraphQLString }
  })
})

const AlbumType = new GraphQLObjectType({
  name: 'Album',
  fields: () => ({
    userId: { type: GraphQLInt },
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    photos: {
      type: new GraphQLList(PhotoType),
      resolve(parentValues, args) {
        return axios.get(`https://jsonplaceholder.typicode.com/albums/${parentValues.id}/photos`)
          .then(res => res.data);
      }
    }
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
      resolve(parentValues, args) {
        return axios.get(`https://jsonplaceholder.typicode.com/posts/${parentValues.id}/comments`)
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
      resolve(parentValues, args) {
        return axios.get(`https://jsonplaceholder.typicode.com/users/${parentValues.id}/posts`)
          .then(res => res.data);
      }
    }
  })
});

module.exports = {
  CommentType,
  UserType,
  PostType,
  AlbumType,
  TodoType
}
