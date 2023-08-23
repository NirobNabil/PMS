import Navbar from '@/features/navbar'
// import Prescription from '@/features/prescription'
// import {PatientPage} from '@/features/patients'
// import { Toaster } from "@/components/ui/toaster"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CreatePrescriptionPage } from '@/features/createPrescription';
import { PrescriptionsPage } from './features/prescriptions';

export default () => {
    return (    
        <BrowserRouter>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/create_prescription" element={<CreatePrescriptionPage />} />
                    <Route path="/prescriptions" element={<PrescriptionsPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}