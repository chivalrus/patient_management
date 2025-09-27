import { RegistrationForm } from "@/components/registration-form";
import { SearchPatient } from "@/components/search-patient";
import { Separator } from "@radix-ui/react-separator";
import { useState } from "react";

const Home = () => {
    const [registered, setRegistered] = useState<boolean>(false);

    return (
        <div>
            <div className="grid grid-cols-12 gap-4 w-full">
                <div className="space-y-1 col-span-12">
                    <h4 className="text-2xl leading-none font-medium">Patient Mangement System</h4>
                    <p className="text-muted-foreground text-sm">
                    Simple record management for patient info
                    </p>
                </div>
            </div>
            <Separator className="my-4 border-1" />
            <div className="grid grid-cols-12 gap-4 w-full">
                <div className="col-span-4">
                    <RegistrationForm setRegistered={setRegistered}/>
                </div>
                <div className="col-span-8 min-h-[485px]">
                    <SearchPatient newRegistered={registered} setNewRegistered={setRegistered}/>
                </div>
            </div>
        </div>
    );
}

export default Home;