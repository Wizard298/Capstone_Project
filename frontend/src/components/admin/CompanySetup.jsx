import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2, Building2, Globe, MapPin, FileImage } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });
    const { singleCompany } = useSelector(store => store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success('Company updated successfully!', {
                    description: 'Your changes have been saved.',
                });
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            toast.error('Update failed', {
                description: error.response?.data?.message || 'Something went wrong',
            });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (singleCompany) {
            setInput({
                name: singleCompany.name || "",
                description: singleCompany.description || "",
                website: singleCompany.website || "",
                location: singleCompany.location || "",
                file: null
            });
        }
    }, [singleCompany]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div className="flex items-center gap-4">
                        <Button 
                            onClick={() => navigate("/admin/companies")} 
                            variant="ghost" 
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200/50 transition-colors"
                        >
                            <ArrowLeft className="h-5 w-5" />
                            <span className="font-medium">Back to Companies</span>
                        </Button>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
                        <Building2 className="h-6 w-6 text-blue-600" />
                        Company Setup
                    </h1>
                </div>

                {/* Form Section */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                    <form onSubmit={submitHandler} className="p-6 md:p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Company Name */}
                            <div className="space-y-2">
                                <Label className="flex items-center gap-2 text-gray-700 font-medium">
                                    <Building2 className="h-4 w-4 text-blue-500" />
                                    Company Name
                                </Label>
                                <Input
                                    type="text"
                                    name="name"
                                    value={input.name}
                                    onChange={changeEventHandler}
                                    className="bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter company name"
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <Label className="flex items-center gap-2 text-gray-700 font-medium">
                                    <span className="text-blue-500">#</span>
                                    Description
                                </Label>
                                <Input
                                    type="text"
                                    name="description"
                                    value={input.description}
                                    onChange={changeEventHandler}
                                    className="bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Brief company description"
                                    required
                                />
                            </div>

                            {/* Website */}
                            <div className="space-y-2">
                                <Label className="flex items-center gap-2 text-gray-700 font-medium">
                                    <Globe className="h-4 w-4 text-blue-500" />
                                    Website
                                </Label>
                                <Input
                                    type="text"
                                    name="website"
                                    value={input.website}
                                    onChange={changeEventHandler}
                                    className="bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="https://example.com"
                                    required
                                />
                            </div>

                            {/* Location */}
                            <div className="space-y-2">
                                <Label className="flex items-center gap-2 text-gray-700 font-medium">
                                    <MapPin className="h-4 w-4 text-blue-500" />
                                    Location
                                </Label>
                                <Input
                                    type="text"
                                    name="location"
                                    value={input.location}
                                    onChange={changeEventHandler}
                                    className="bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Company headquarters location"
                                    required
                                />
                            </div>

                            {/* Logo Upload */}
                            <div className="space-y-2 md:col-span-2">
                                <Label className="flex items-center gap-2 text-gray-700 font-medium">
                                    <FileImage className="h-4 w-4 text-blue-500" />
                                    Company Logo
                                </Label>
                                <div className="flex items-center gap-4">
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={changeFileHandler}
                                        className="bg-gray-50 border-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                        required
                                    />
                                    {input.file && (
                                        <span className="text-sm text-gray-500">
                                            Selected: {input.file.name}
                                        </span>
                                    )}
                                </div>
                                {singleCompany?.logo && !input.file && (
                                    <p className="text-sm text-gray-500 mt-2">
                                        Current logo: {singleCompany.logo.split('/').pop()}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="mt-8">
                            <Button
                                type="submit"
                                className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white font-medium text-lg shadow-md hover:shadow-lg transition-all"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Updating Company...
                                    </>
                                ) : (
                                    'Update Company'
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CompanySetup


// Previous one
// import React, { useEffect, useState } from 'react'
// import Navbar from '../shared/Navbar'
// import { Button } from '../ui/button'
// import { ArrowLeft, Loader2 } from 'lucide-react'
// import { Label } from '../ui/label'
// import { Input } from '../ui/input'
// import axios from 'axios'
// import { COMPANY_API_END_POINT } from '@/utils/constant'
// import { useNavigate, useParams } from 'react-router-dom'
// import { toast } from 'sonner'
// import { useSelector } from 'react-redux'
// import useGetCompanyById from '@/hooks/useGetCompanyById'

// const CompanySetup = () => {
//     const params = useParams();
//     useGetCompanyById(params.id);
//     const [input, setInput] = useState({
//         name: "",
//         description: "",
//         website: "",
//         location: "",
//         file: null
//     });
//     const {singleCompany} = useSelector(store=>store.company);
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     const changeEventHandler = (e) => {
//         setInput({ ...input, [e.target.name]: e.target.value });
//     }

//     const changeFileHandler = (e) => {
//         const file = e.target.files?.[0];
//         setInput({ ...input, file });
//     }

//     const submitHandler = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append("name", input.name);
//         formData.append("description", input.description);
//         formData.append("website", input.website);
//         formData.append("location", input.location);
//         if (input.file) {
//             formData.append("file", input.file);
//         }
//         try {
//             setLoading(true);
//             const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 },
//                 withCredentials: true
//             });
//             if (res.data.success) {
//                 toast.success(res.data.message);
//                 navigate("/admin/companies");
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error(error.response.data.message);
//         } finally {
//             setLoading(false);
//         }
//     }

//     useEffect(() => {
//         setInput({
//             name: singleCompany.name || "",
//             description: singleCompany.description || "",
//             website: singleCompany.website || "",
//             location: singleCompany.location || "",
//             file: singleCompany.file || null
//         })
//     },[singleCompany]);

//     return (
//         <div>
//             <Navbar />
//             <div className='max-w-xl mx-auto my-10'>
//                 <form onSubmit={submitHandler}>
//                     <div className='flex items-center gap-5 p-8'>
//                         <Button onClick={() => navigate("/admin/companies")} variant="outline" className="flex items-center gap-2 text-gray-500 font-semibold">
//                             <ArrowLeft />
//                             <span>Back</span>
//                         </Button>
//                         <h1 className='font-bold text-xl'>Company Setup</h1>
//                     </div>
//                     <div className='grid grid-cols-2 gap-4'>
//                         <div>
//                             <Label>Company Name</Label>
//                             <Input
//                                 type="text"
//                                 name="name"
//                                 value={input.name}
//                                 onChange={changeEventHandler}
//                             />
//                         </div>
//                         <div>
//                             <Label>Description</Label>
//                             <Input
//                                 type="text"
//                                 name="description"
//                                 value={input.description}
//                                 onChange={changeEventHandler}
//                             />
//                         </div>
//                         <div>
//                             <Label>Website</Label>
//                             <Input
//                                 type="text"
//                                 name="website"
//                                 value={input.website}
//                                 onChange={changeEventHandler}
//                             />
//                         </div>
//                         <div>
//                             <Label>Location</Label>
//                             <Input
//                                 type="text"
//                                 name="location"
//                                 value={input.location}
//                                 onChange={changeEventHandler}
//                             />
//                         </div>
//                         <div>
//                             <Label>Logo</Label>
//                             <Input
//                                 type="file"
//                                 accept="image/*"
//                                 onChange={changeFileHandler}
//                             />
//                         </div>
//                     </div>
//                     {
//                         loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Update</Button>
//                     }
//                 </form>
//             </div>

//         </div>
//     )
// }

// export default CompanySetup