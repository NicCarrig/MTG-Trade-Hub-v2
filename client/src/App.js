import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


import Footer from './components/Footer';
// import Header from './components/Header';

import Home from './pages/Home';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import SinglePost from './pages/SinglePost';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Landing from './pages/Landing';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-contents-center align-items-center min-100-vh">
          {/* <Header /> */}
          <div className="flex-column justify-contents-center align-items-center min-100-vh">
            <Routes>

              <Route path="/" element={<Landing />}/>
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path='/profile/:username' element={<Profile />} />
              <Route path="/profile" element={<Profile />} />
              <Route path='/post/:id' element={<SinglePost />} />
              
              <Route path="*" element={<NoMatch />} />

            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
