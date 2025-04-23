import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import { Building2, ArrowLeft } from 'lucide-react'

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        if (!companyName.trim()) {
            toast.error('Company name is required');
            return;
        }

        try {
            setIsLoading(true);
            const res = await axios.post(
                `${COMPANY_API_END_POINT}/register`, 
                { companyName }, 
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success('Company created successfully!', {
                    description: res.data.message,
                });
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
            toast.error('Failed to create company', {
                description: error.response?.data?.message || 'Please try again',
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Navbar />
            
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Back Button */}
                <Button 
                    onClick={() => navigate("/admin/companies")}
                    variant="ghost"
                    className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200/50"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Companies
                </Button>

                {/* Main Content */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 p-8">
                    <div className="flex flex-col items-center text-center mb-8">
                        <div className="bg-blue-100 p-4 rounded-full mb-4">
                            <Building2 className="h-8 w-8 text-blue-600" />
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                            Create Your Company
                        </h1>
                        <p className="text-gray-500 max-w-md">
                            What would you like to name your company? You can change this later.
                        </p>
                    </div>

                    <div className="space-y-6 max-w-md mx-auto">
                        <div className="space-y-2">
                            <Label className="text-gray-700 font-medium">
                                Company Name
                            </Label>
                            <Input
                                type="text"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                className="bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent py-6 text-lg"
                                placeholder="e.g. JobHunt, Microsoft, Apple"
                                autoFocus
                                required
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                            <Button
                                variant="outline"
                                onClick={() => navigate("/admin/companies")}
                                className="flex-1 py-6 border-gray-300 hover:bg-gray-50"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={registerNewCompany}
                                disabled={!companyName.trim() || isLoading}
                                className="flex-1 py-6 bg-blue-600 hover:bg-blue-700 text-lg shadow-md hover:shadow-lg transition-all"
                            >
                                {isLoading ? (
                                    <>
                                        <span className="animate-pulse">Creating...</span>
                                    </>
                                ) : (
                                    'Continue'
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate


// previous one
// import React, { useState } from 'react'
// import Navbar from '../shared/Navbar'
// import { Label } from '../ui/label'
// import { Input } from '../ui/input'
// import { Button } from '../ui/button'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import { COMPANY_API_END_POINT } from '@/utils/constant'
// import { toast } from 'sonner'
// import { useDispatch } from 'react-redux'
// import { setSingleCompany } from '@/redux/companySlice'

// const CompanyCreate = () => {
//     const navigate = useNavigate();
//     const [companyName, setCompanyName] = useState();
//     const dispatch = useDispatch();
//     const registerNewCompany = async () => {
//         try {
//             const res = await axios.post(`${COMPANY_API_END_POINT}/register`, {companyName}, {
//                 headers:{
//                     'Content-Type':'application/json'
//                 },
//                 withCredentials:true
//             });
//             if(res?.data?.success){
//                 dispatch(setSingleCompany(res.data.company));
//                 toast.success(res.data.message);
//                 const companyId = res?.data?.company?._id;
//                 navigate(`/admin/companies/${companyId}`);
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     }
//     return (
//         <div>
//             <Navbar />
//             <div className='max-w-4xl mx-auto'>
//                 <div className='my-10'>
//                     <h1 className='font-bold text-2xl'>Your Company Name</h1>
//                     <p className='text-gray-500'>What would you like to give your company name? you can change this later.</p>
//                 </div>

//                 <Label>Company Name</Label>
//                 <Input
//                     type="text"
//                     className="my-2"
//                     placeholder="JobHunt, Microsoft etc."
//                     onChange={(e) => setCompanyName(e.target.value)}
//                 />
//                 <div className='flex items-center gap-2 my-10'>
//                     <Button variant="outline" onClick={() => navigate("/admin/companies")}>Cancel</Button>
//                     <Button onClick={registerNewCompany}>Continue</Button>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default CompanyCreate