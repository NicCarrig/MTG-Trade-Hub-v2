import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import Inventory from '../components/Inventory';
import { fetchSearchCard } from '../utils/searchCard';
import Header from '../components/Header';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';


const Profile = (props) => {
  const { username: userParam } = useParams();
  const [searchedCardName, setSearchedCardName] = useState();
  const [searchName, setSearchName] = useState();

  //   const [addFriend] = useMutation(ADD_FRIEND);
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  console.log(data);
  console.log('Username');
  console.log(Auth.getProfile().data.username);
  console.log('Logged In');
  console.log(Auth.loggedIn());
  
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
    <div>
      <Header />
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          Viewing {userParam ? `${user.username}'s` : 'your'} inventory.
        </h2>

        <form>
            <textarea placeholder='Search for a card'></textarea>
            <button>Search</button>
        </form>

        {/* Should render the serach results here */}

        <Inventory />

    </div>
  );
};

export default Profile;
