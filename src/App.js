import logo from './logo.svg';
import './App.css';
import { useQuery, gql } from '@apollo/client';

// welke query 
const GET_LOCATIONS = gql`
query GetLocations {
  locations {
    id
    name
    description
    photo
    overallRating
  }
}
`
function DisplayLocations() {
  const {loading, error, data} = useQuery(GET_LOCATIONS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>ERROR...</p>
  

  return data.locations.map(({ id, name, description, photo, overallRating }) => (
    <div key={id}>
      <h3>
        {name}
      </h3>
      <img width="400" height="250" alt="location-reference" src={`${photo}`} /><br />
      <b>About this location:</b>
      <p>{description}</p>
      <p>{overallRating}</p>
      <br />
    </div>
  ))
}


function App() {
  return (
    <div className="App">
        <p>
          My First ApolloApp
        </p>
        <DisplayLocations />
    </div>
  );
}

export default App;
