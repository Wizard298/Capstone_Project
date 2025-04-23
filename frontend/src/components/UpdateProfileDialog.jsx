import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2, FileText, User, Mail, Phone, Info, Code } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(', ') || "",
        file: null
    });

    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }
        
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success('Profile updated successfully!', {
                    description: 'Your changes have been saved.',
                });
            }
        } catch (error) {
            console.log(error);
            toast.error('Update failed', {
                description: error.response?.data?.message || 'Something went wrong',
            });
        } finally {
            setLoading(false);
            setOpen(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md md:max-w-lg rounded-lg bg-gradient-to-b from-gray-900 to-gray-800 border-gray-700 shadow-xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
                        <User className="h-5 w-5 text-pink-400" />
                        Update Profile
                    </DialogTitle>
                    <DialogDescription className="text-gray-300">
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={submitHandler}>
                    <div className="grid gap-6 py-4">
                        {/* Name Field */}
                        <div className="space-y-2">
                            <Label htmlFor="fullname" className="flex items-center gap-2 text-gray-300">
                                <User className="h-4 w-4" />
                                Full Name
                            </Label>
                            <Input
                                id="fullname"
                                name="fullname"
                                type="text"
                                value={input.fullname}
                                onChange={changeEventHandler}
                                className="bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                placeholder="Enter your full name"
                            />
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="flex items-center gap-2 text-gray-300">
                                <Mail className="h-4 w-4" />
                                Email
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={input.email}
                                onChange={changeEventHandler}
                                className="bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                placeholder="your.email@example.com"
                            />
                        </div>

                        {/* Phone Field */}
                        <div className="space-y-2">
                            <Label htmlFor="phoneNumber" className="flex items-center gap-2 text-gray-300">
                                <Phone className="h-4 w-4" />
                                Phone Number
                            </Label>
                            <Input
                                id="phoneNumber"
                                name="phoneNumber"
                                value={input.phoneNumber}
                                onChange={changeEventHandler}
                                className="bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                placeholder="+1 (123) 456-7890"
                            />
                        </div>

                        {/* Bio Field */}
                        <div className="space-y-2">
                            <Label htmlFor="bio" className="flex items-center gap-2 text-gray-300">
                                <Info className="h-4 w-4" />
                                Bio
                            </Label>
                            <Input
                                id="bio"
                                name="bio"
                                value={input.bio}
                                onChange={changeEventHandler}
                                className="bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                placeholder="Tell us about yourself..."
                            />
                        </div>

                        {/* Skills Field */}
                        <div className="space-y-2">
                            <Label htmlFor="skills" className="flex items-center gap-2 text-gray-300">
                                <Code className="h-4 w-4" />
                                Skills (comma separated)
                            </Label>
                            <Input
                                id="skills"
                                name="skills"
                                value={input.skills}
                                onChange={changeEventHandler}
                                className="bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                placeholder="JavaScript, React, Node.js, etc."
                            />
                        </div>

                        {/* Resume Upload */}
                        <div className="space-y-2">
                            <Label htmlFor="file" className="flex items-center gap-2 text-gray-300">
                                <FileText className="h-4 w-4" />
                                Resume (PDF only)
                            </Label>
                            <div className="flex items-center gap-2">
                                <Input
                                    id="file"
                                    name="file"
                                    type="file"
                                    accept="application/pdf"
                                    onChange={fileChangeHandler}
                                    className="bg-gray-700 border-gray-600 text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-pink-500/20 file:text-pink-400 hover:file:bg-pink-500/30"
                                />
                            </div>
                            {input.file && (
                                <p className="text-sm text-gray-400 mt-1">
                                    Selected: {input.file.name}
                                </p>
                            )}
                        </div>
                    </div>

                    <DialogFooter className="mt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-pink-600 hover:bg-pink-700 text-white shadow-lg hover:shadow-pink-500/30 transition-all"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                'Save Changes'
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateProfileDialog


// Previous One
// import React, { useState } from 'react'
// import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
// import { Label } from './ui/label'
// import { Input } from './ui/input'
// import { Button } from './ui/button'
// import { Loader2 } from 'lucide-react'
// import { useDispatch, useSelector } from 'react-redux'
// import axios from 'axios'
// import { USER_API_END_POINT } from '@/utils/constant'
// import { setUser } from '@/redux/authSlice'
// import { toast } from 'sonner'

// const UpdateProfileDialog = ({ open, setOpen }) => {
//     const [loading, setLoading] = useState(false);
//     const { user } = useSelector(store => store.auth);

//     const [input, setInput] = useState({
//         fullname: user?.fullname || "",
//         email: user?.email || "",
//         phoneNumber: user?.phoneNumber || "",
//         bio: user?.profile?.bio || "",
//         skills: user?.profile?.skills?.map(skill => skill) || "",
//         file: user?.profile?.resume || ""
//     });
//     const dispatch = useDispatch();

//     const changeEventHandler = (e) => {
//         setInput({ ...input, [e.target.name]: e.target.value });
//     }

//     const fileChangeHandler = (e) => {
//         const file = e.target.files?.[0];
//         setInput({ ...input, file })
//     }

//     const submitHandler = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append("fullname", input.fullname);
//         formData.append("email", input.email);
//         formData.append("phoneNumber", input.phoneNumber);
//         formData.append("bio", input.bio);
//         formData.append("skills", input.skills);
//         if (input.file) {
//             formData.append("file", input.file);
//         }
//         try {
//             setLoading(true);
//             const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 },
//                 withCredentials: true
//             });
//             if (res.data.success) {
//                 dispatch(setUser(res.data.user));
//                 toast.success(res.data.message);
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error(error.response.data.message);
//         } finally{
//             setLoading(false);
//         }
//         setOpen(false);
//         console.log(input);
//     }



//     return (
//         <div>
//             <Dialog open={open}>
//                 <DialogContent className="sm:max-w-[425px]" onInteractOutside={() => setOpen(false)}>
//                     <DialogHeader>
//                         <DialogTitle>Update Profile</DialogTitle>
//                     </DialogHeader>
//                     <form onSubmit={submitHandler}>
//                         <div className='grid gap-4 py-4'>
//                             <div className='grid grid-cols-4 items-center gap-4'>
//                                 <Label htmlFor="name" className="text-right">Name</Label>
//                                 <Input
//                                     id="name"
//                                     name="name"
//                                     type="text"
//                                     value={input.fullname}
//                                     onChange={changeEventHandler}
//                                     className="col-span-3"
//                                 />
//                             </div>
//                             <div className='grid grid-cols-4 items-center gap-4'>
//                                 <Label htmlFor="email" className="text-right">Email</Label>
//                                 <Input
//                                     id="email"
//                                     name="email"
//                                     type="email"
//                                     value={input.email}
//                                     onChange={changeEventHandler}
//                                     className="col-span-3"
//                                 />
//                             </div>
//                             <div className='grid grid-cols-4 items-center gap-4'>
//                                 <Label htmlFor="number" className="text-right">Number</Label>
//                                 <Input
//                                     id="number"
//                                     name="number"
//                                     value={input.phoneNumber}
//                                     onChange={changeEventHandler}
//                                     className="col-span-3"
//                                 />
//                             </div>
//                             <div className='grid grid-cols-4 items-center gap-4'>
//                                 <Label htmlFor="bio" className="text-right">Bio</Label>
//                                 <Input
//                                     id="bio"
//                                     name="bio"
//                                     value={input.bio}
//                                     onChange={changeEventHandler}
//                                     className="col-span-3"
//                                 />
//                             </div>
//                             <div className='grid grid-cols-4 items-center gap-4'>
//                                 <Label htmlFor="skills" className="text-right">Skills</Label>
//                                 <Input
//                                     id="skills"
//                                     name="skills"
//                                     value={input.skills}
//                                     onChange={changeEventHandler}
//                                     className="col-span-3"
//                                 />
//                             </div>
//                             <div className='grid grid-cols-4 items-center gap-4'>
//                                 <Label htmlFor="file" className="text-right">Resume</Label>
//                                 <Input
//                                     id="file"
//                                     name="file"
//                                     type="file"
//                                     accept="application/pdf"
//                                     onChange={fileChangeHandler}
//                                     className="col-span-3"
//                                 />
//                             </div>
//                         </div>
//                         <DialogFooter>
//                             {
//                                 loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Update</Button>
//                             }
//                         </DialogFooter>
//                     </form>
//                 </DialogContent>
//             </Dialog>
//         </div>
//     )
// }

// export default UpdateProfileDialog