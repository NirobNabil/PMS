import {createBrowserRouter} from "react-router-dom";

import {CreatePrescriptionPage} from '@/features/createPrescription'
import {PrescriptionsPage} from '@/features/prescriptions'

export const router = createBrowserRouter([
    {
        path: "/",
        element: <CreatePrescriptionPage />
    }, {
        path: "/create_prescription",
        element: <CreatePrescriptionPage />
    }, {
        path: "/prsecriptions",
        element: <PrescriptionsPage />
    },
]);
