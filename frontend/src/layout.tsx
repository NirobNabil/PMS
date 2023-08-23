import Navbar from '@/features/navbar'
// import Prescription from '@/features/prescription'
// import {PatientPage} from '@/features/patients'
// import { Toaster } from "@/components/ui/toaster"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CreatePrescriptionPage } from '@/features/createPrescription';
import { PrescriptionsPage } from './features/prescriptions';
import { MedicinesPage } from './features/medicines';
import { Toaster } from './components/ui/toaster';
import { ThemeProvider } from './components/theme-provider';

export default () => {
    return (    
        <BrowserRouter>
        <ThemeProvider defaultTheme='light' >
            <div>
                <Navbar />
                <Routes>
                    <Route path="/create_prescription" element={<CreatePrescriptionPage />} />
                    <Route path="/prescriptions" element={<PrescriptionsPage />} />
                    <Route path="/medicines" element={<MedicinesPage />} />
                </Routes>
                <Toaster />
            </div>
        </ThemeProvider>
        </BrowserRouter>
    )
}