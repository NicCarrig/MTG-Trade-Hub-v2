import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import Inventory from '../components/Inventory';
import { fetchSearchCard } from '../utils/searchCard';
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';
import Header from '../components/Header';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';


const Profile = (props) => {
  const { username: userParam } = useParams();
  // const [searchedCardName, setSearchedCardName] = useState();
  // const [searchName, setSearchName] = useState();

  //   const [addFriend] = useMutation(ADD_FRIEND);
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  
  const user = data?.me || data?.user || {};
  

  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <div>
        <Header />
        <h4>
          You need to be logged in to see this. Use the navigation links above to
          sign up or log in!
        </h4>
      </div>
    );
  }

//   const handleClick = async () => {
//     try {
//       await addFriend({
//         variables: { id: user._id },
//       });
//     } catch (e) {
//       console.error(e);
//     }
//   };

   return (
     <main className="flex-row  mb-4">
      <Header />
     <div className='d-flex flex-column justify-content-center p-3'>
        <h2 className="profileh2 p-3 display-inline-block">
          {userParam ? `${user.username}'s` : 'Your'} profile
        </h2>

        <div className='flex-column mb-3'>
          <div >
             <h3 className="profileh2 p-3 display-inline-block">Add a Post:</h3>
            <PostForm/>
            <PostList posts={user.posts} title={`${user.username}'s posts`} />
          </div>
           <h4 className="profileh2 p-3 display-inline-block">Add Inventory:</h4>
           
        <div className="d-flex justify-content-center">
          <form className="flex-row justify-center ">
            <textarea className="form-textarea search-textarea" placeholder='Search for a card'></textarea>
            <button className='searchbtn'>Search</button>
          </form>
          </div>
        </div>


        {/* Should render the search results here */}
        {/* <Inventory /> */}

    </div>
     </main>
  );
};

export default Profile;
