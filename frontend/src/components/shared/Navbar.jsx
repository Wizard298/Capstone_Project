import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import "./navbar.css";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="navDiv">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-yellow-400">
            FREE<span className="text-[#F83002]">LANCIFY</span>
          </h1>
          <img
            src="https://cdnb.artstation.com/p/assets/images/images/022/580/987/large/usamah-gonsalves-asset.jpg?1575970599"
            alt="Logo"
            className="w-12 h-9 ml-3 rounded-full object-cover hidden sm:block"
          />
        </div>

        {/* Mobile Menu Button 3 line */}
        <div className="flex md:hidden">
          <Button
            variant="ghost"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            // className="text-white hover:bg-transparent focus:outline-none"
            className="text-white"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex font-medium items-center gap-5">
            {user && user.role === "recruiter" ? (
              <>
                {/* <li className='hover:text-yellow-400 transition-colors duration-200'><Link to="/admin/companies">Companies</Link></li> */}
                <li className="hover:text-yellow-400 transition-colors duration-200">
                  <Link to="/admin/jobs">Freelancing</Link>
                </li>
                <li className="hover:text-yellow-400 transition-colors duration-200">
                  <Link to="/admin/paidGigs">PaidGigs</Link>
                </li>
              </>
            ) : (
              <>
                <li className="hover:text-yellow-400 transition-colors duration-200">
                  <Link to="/">Home</Link>
                </li>
                <li className="hover:text-yellow-400 transition-colors duration-200">
                  <Link to="/jobs">Gigs</Link>
                </li>
                <li className="hover:text-yellow-400 transition-colors duration-200">
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="text-white border-white hover:bg-white hover:text-black"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer hover:ring-2 hover:ring-yellow-400 transition-all">
                  <AvatarImage
                    src={
                      user?.profile?.profilePhoto ||
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-gray-800 border-gray-700 text-white">
                <div className="space-y-4">
                  <div className="flex gap-3 items-center">
                    <Avatar className="cursor-pointer h-12 w-12">
                      <AvatarImage
                        src={
                          user?.profile?.profilePhoto ||
                          "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        }
                        alt="@shadcn"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-white">
                        {user?.fullname}
                      </h4>
                      <p className="text-sm text-gray-300">
                        {user?.profile?.bio || "No bio yet"}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    {user && user.role === "student" && (
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 p-2 rounded hover:bg-gray-700 transition-colors"
                      >
                        <User2 size={18} className="text-yellow-400" />
                        <span>View Profile</span>
                      </Link>
                    )}
                    <button
                      onClick={logoutHandler}
                      className="flex items-center gap-2 p-2 rounded hover:bg-gray-700 transition-colors text-left"
                    >
                      <LogOut size={18} className="text-red-400" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile Navigation for small screen */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-gray-900 z-50 shadow-lg">
            <ul className="flex flex-col p-4 space-y-4">
              {user && user.role === "recruiter" ? (
                <>
                  {/* <li className='hover:text-yellow-400 transition-colors duration-200'><Link to="/admin/companies" onClick={() => setMobileMenuOpen(false)}>Companies</Link></li> */}
                  <li className="hover:text-yellow-400 transition-colors duration-200">
                    <Link
                      to="/admin/jobs"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Freelancing
                    </Link>
                  </li>
                  <li className="hover:text-yellow-400 transition-colors duration-200">
                    <Link
                      to="/admin/paidGigs"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      PaidGigs
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <div
                    className="flex flex-col space-y-2 pt-4"
                    style={{ color: "white" }}
                  >
                    <Link
                      className="flex items-center gap-2 p-2 rounded hover:bg-gray-800 transition-colors"
                      to="/"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Home
                    </Link>
                    <Link
                      className="flex items-center gap-2 p-2 rounded hover:bg-gray-800 transition-colors"
                      to="/jobs"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Gigs
                    </Link>
                    <Link
                      className="flex items-center gap-2 p-2 rounded hover:bg-gray-800 transition-colors"
                      to="/browse"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Browse
                    </Link>
                  </div>
                </>
              )}
              {!user ? (
                <div className="flex flex-col space-y-2 pt-4">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button
                      variant="outline"
                      className="w-full text-white border-white hover:bg-white hover:text-black"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full bg-[#6A38C2] hover:bg-[#5b30a6]">
                      Signup
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="pt-4 space-y-2" style={{ color: "white" }}>
                  {user.role === "student" && (
                    <Link
                      to="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 p-2 rounded hover:bg-gray-800 transition-colors"
                    >
                      <User2 size={18} className="text-yellow-400" />
                      <span>View Profile</span>
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logoutHandler();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 p-2 rounded hover:bg-gray-800 transition-colors w-full text-left"
                  >
                    <LogOut size={18} className="text-red-400" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
