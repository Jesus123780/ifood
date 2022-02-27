import { ApolloLink, from } from '@apollo/client';

const timeStartLink = new ApolloLink((operation, forward) => {
  operation.setContext({ start: new Date() });
  return forward(operation);
});

const logTimeLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((data) => {
    // data from a previous link
    const time = new Date() - operation.getContext().start;
    console.log(`operation ${operation.operationName} took ${time} to complete`);
    return data;
  })
});

export const additiveLink = from([
  timeStartLink,
  logTimeLink
]);