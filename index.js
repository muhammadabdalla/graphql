const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type comment {
    name: String
    comment: String
  }
  type Post {
    id: ID
    title: String
    text: String
    comments: [comment]
  }

  type Query {
    getPost(id: ID): Post
  }
  type Mutation {
    deletePost(id: ID): [Post]
    addPost(id: ID, title: String, text: String): [Post]
    updatePost(id: ID, title: String, text: String): [Post]
  }
`;
const posts = [
  {
    id: 1,
    title: "post1",
    text: "hgfhdfgdb",
    comments: [{ name: "Ali", comment: "goodstuf" }],
  },
  {
    id: 2,
    title: "post2",
    text: "hgfhdfgdb",
    comments: [{ name: "yara", comment: "goodstufff" }],
  },
];
const resolvers = {
  Query: {
    getPost: (_, { id }) => {
      console.log(id);
      const thepost = posts.find((post) => post.id == id);
      return thepost;
    },
  },
  Mutation: {
    deletePost: (_, { id }) => {
      const newArr = posts.filter((post) => post.id != id);
      return newArr;
    },
    addPost: (_, { id, title, text }) => {
      posts.push({ id, title, text });

      return posts;
    },
    updatePost: (_, { id, title, text }) => {
      const newArr = posts.map((post) => {
        if (post.id == id) {
          post.title = title;
          post.text = text;
        }

        return post;
      });

      return newArr;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log("server is running" + url);
});
