import { DataTable } from "./tally/patients/data-table";
import { columns, type Patient } from "./tally/patients/columns";
import { gql } from "@apollo/client";
import { useLazyQuery } from "@apollo/client/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface IGetPatients {
  getPatients: Patient[];
}

const GET_PATIENTS = gql`
  query GetPatients {
    getPatients {
      id
      email
      name
      age
    }
  }
`;

export const SearchPatient = ({...props} : {newRegistered: boolean, setNewRegistered: (e:boolean) => void}) => {
  const [getData, { loading, error, data }] = useLazyQuery<IGetPatients>(GET_PATIENTS, { fetchPolicy: 'network-only' });

  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const patientList = (data?.getPatients || []) as Patient[];
    setPatients(() => [...patientList]);
  }, [data]);

  useEffect(() => {
    if (props.newRegistered === true) {
      getData();
      props.setNewRegistered(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.newRegistered]);

  if (error) toast.error(error.message);

  const paginateRef = useRef({
    pageIndex: 0, pageSize: 5
  })


  return (
    <div className="container mx-auto py-10">
      <button className="text-white" onClick={() => getData()}>
        Search
      </button>

      {!loading && (
        <DataTable key={"search"} columns={columns} data={[...patients]}
          paginate={paginateRef.current}/>
      )}
    </div>
  );
};
