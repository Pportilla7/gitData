import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../store/userSlice';

function UserSearch() {
  const [username, setUsername] = useState('');
  const user = useSelector(state => state.user.entity);
  const status = useSelector(state => state.user.status);
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (username) dispatch(fetchUser(username));
  };

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter GitHub username"
      />
      <button onClick={handleSearch}>Search</button>
      {status === 'loading' && <p>Loading...</p>}
      {user && (
        <div>
          <h1>{user.name}</h1>
          <p>Username: {user.login}</p>
          <p>Followers: {user.followers}</p>
          <p>Public Repos: {user.public_repos}</p>
          <img src={user.avatar_url} alt={user.name} />
        </div>
      )}
    </div>
  );
}

export default UserSearch;
