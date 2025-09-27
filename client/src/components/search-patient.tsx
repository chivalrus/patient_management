import { DataTable } from "./tally/patients/data-table";
import { columns, type Patient } from "./tally/patients/columns";
import { gql } from "@apollo/client";
import {  useQuery } from "@apollo/client/react";
import { useEffect, useState } from "react";
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

export const SearchPatient = () => {
  const { data, refetch, error, loading } = useQuery<IGetPatients>(GET_PATIENTS)
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const patientList = (data?.getPatients || []) as Patient[];
    setPatients(() => [...patientList]);
  }, [data]);

  if (error) toast.error(error.message);

  return (
    <div className="container mx-auto py-10">
      <button className="text-white" onClick={() => refetch()}>
        Search
      </button>

      {!loading && (
        <DataTable key={"search"} columns={columns} data={[...patients]} />
      )}
    </div>
  );
};
