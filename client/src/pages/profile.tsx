import React, {Fragment, useEffect, useState} from 'react';
import {gql, useMutation, useQuery} from '@apollo/client';

import { Loading, Header, LaunchTile } from '../components';
import { LAUNCH_TILE_DATA } from './launches';
import { RouteComponentProps } from '@reach/router';
import * as GetMyTripsTypes from './__generated__/GetMyTrips';

export const GET_MY_TRIPS = gql`
  query GetMyTrips {
    me {
      id
      email
      name
      trips {
        ...LaunchTile
      }
    }
  }
  ${LAUNCH_TILE_DATA}
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($name: String) {
    updateUser(name: $name) {
      id
      email
      name
    }
  }
`;

interface ProfileProps extends RouteComponentProps {}

interface UserForm {
  name?: string
}

const Profile: React.FC<ProfileProps> = () => {
  const {
    data,
    loading,
    error
  } = useQuery<GetMyTripsTypes.GetMyTrips>(
    GET_MY_TRIPS,
  );
  const [mutate, {loading: savingUser}] = useMutation(UPDATE_USER);
  const formDisabled = savingUser || loading;
  const [name, setName] = useState("");
  const onSave = () => mutate({variables: {name: name}});
  useEffect(() => {
    console.log("new data!")
    setName(data?.me?.name ?? '');
  }, [data])

  if (loading) return <Loading />;
  if (error) return <p>ERROR: {error.message}</p>;
  if (data === undefined) return <p>ERROR</p>;

  return (
    <Fragment>
      <Header>User profile</Header>

      <h2>User information</h2>
      <div>
        Email: {data.me?.email}
      </div>
      <label>
        Name:
        <input disabled={formDisabled} onChange={e => setName(e.target.value)} value={name} />
      </label>
      <button onClick={onSave} type="button" disabled={formDisabled}>{savingUser ? "Saving..." : "Save"}</button>

      <h2>Todos</h2>
      <label>
        Add todo:
        <input disabled={formDisabled} onChange={e => setName(e.target.value)} value={name} />
      </label>
      <button onClick={onSave} type="button" disabled={formDisabled}>{savingUser ? "Adding..." : "Add todo"}</button>

      <h2>My trips</h2>
      {data.me && data.me.trips.length ? (
        data.me.trips.map((launch: any) => (
          <LaunchTile key={launch.id} launch={launch} />
        ))
      ) : (
        <p>You haven't booked any trips</p>
      )}
    </Fragment>
  );
}

export default Profile;
