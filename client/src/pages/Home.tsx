import { RegistrationForm } from "@/components/registration-form";
import { SearchPatient } from "@/components/search-patient";

const Home = () => {

    return (
        <div className="grid grid-cols-12 gap-4 w-full">
            <div className="col-span-4">
                <RegistrationForm />
            </div>
            <div className="col-span-8">
                <SearchPatient/>
            </div>
        </div>
    );
}

export default Home;