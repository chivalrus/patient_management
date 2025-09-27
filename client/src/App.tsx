import './App.css'
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { Button } from "@/components/ui/button"

type Patient = {
  id?: string;
  name: string;
  age: number;
}

interface IGetPatients {
  getPatients: Patient[];
}

interface IGetPatientById {
  getPatientById: Patient;
}

const GET_PATIENTS = gql`
  query GetPatients {
    getPatients {
      id
      name
      age
    }
  }
`;

const GET_PATIENT_BY_ID = gql`
  query GetPatientById($id: ID!) {
    getPatientById(id:$id) {
      id
      name
      age
    }
  }
`;

function App() {
  const { data, error, loading } = useQuery<IGetPatients>(GET_PATIENTS)
  const { data: dataById, error: errorById, loading: loadingById } = useQuery<IGetPatientById>(GET_PATIENT_BY_ID, {
    variables: {id: "1"}
  })

  if (loadingById) return <p> Data loading ... </p>
  if (errorById) return <p> Error: {errorById.message} </p>

  if (loading) return <p> Data loading ... </p>
  if (error) return <p> Error: {error.message} </p>

  return (
    // TODO: add tailwindcss
    <>
      <h1>Filtered</h1>
      <div>
        <p>{dataById?.getPatientById?.name}</p>
        <Button>Click me</Button>
      </div>

      <h1 className='text-red-500'>Patients</h1>
      <div>
        {
          data?.getPatients?.map((patient: Patient) => {
            return <div className='border-1 border-white'>
              <p>{patient.id}</p>
              <p>{patient.name}</p>
              <p>{patient.age}</p>
            </div>
          })
        }
      </div>
    </>
  )
}

export default App
