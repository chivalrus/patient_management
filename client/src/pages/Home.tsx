import { RegistrationForm } from "@/components/registration-form";
import { SearchPatient } from "@/components/search-patient";
import { useState } from "react";

const Home = () => {
    const [registered, setRegistered] = useState<boolean>(false);

    return (
        <div className="grid grid-cols-12 gap-4 w-full">
            <div className="col-span-4">
                <RegistrationForm setRegistered={setRegistered}/>
            </div>
            <div className="col-span-8 min-h-[485px]">
                <SearchPatient newRegistered={registered}/>
            </div>
        </div>
    );
}

export default Home;