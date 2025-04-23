import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MoreHorizontal, Edit2 } from 'lucide-react';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { motion } from 'framer-motion';

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(store => store.company);
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = companies.filter(company =>
      searchCompanyByText
        ? company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
        : true
    );
    setFilterCompany(filtered);
  }, [companies, searchCompanyByText]);

  return (
    <div className="min-h-screen bg-[#141414] rounded-2xl
             shadow-[0_0_30px_5px_rgba(0,255,255,0.2)]
             hover:shadow-[0_0_50px_10px_rgba(0,255,255,0.35)]
             border border-[#1f1f1f] transition-all duration-500 px-6 md:px-12 py-10 font-[Inter]">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#00f2fe] via-[#7a5cff] to-[#f77062] mb-10"
      >
        🔥 Registered Companies
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-xl backdrop-blur-xl border border-[#ffffff12] bg-[#1b1b1b]/70 shadow-[0_0_30px_#00000060] overflow-hidden"
      >
        <table className="w-full text-sm text-left text-white">
          <thead className="uppercase text-xs text-[#bbbbbb] bg-[#222] tracking-widest">
            <tr>
              <th className="px-6 py-4">Logo</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#333]">
            {filterCompany?.map((company, i) => (
              <motion.tr
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className="hover:bg-[#2f2f2f]/70 transition-all duration-300 hover:shadow-[0_0_20px_#00f2fe80]"
              >
                <td className="px-6 py-4">
                  <Avatar className="w-10 h-10 border border-[#555] shadow-md">
                    <AvatarImage src={company.logo} className="object-cover rounded-full" />
                  </Avatar>
                </td>
                <td className="px-6 py-4 font-semibold text-lg text-white tracking-wide">{company.name}</td>
                <td className="px-6 py-4 text-[#ccc] text-sm">{company.createdAt.split('T')[0]}</td>
                <td className="px-6 py-4 text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="cursor-pointer text-[#aaa] hover:text-[#00f2fe] transition-colors" />
                    </PopoverTrigger>
                    <PopoverContent className="w-36 bg-[#222] border border-[#444] text-white shadow-xl rounded-lg backdrop-blur-lg">
                      <div
                        onClick={() => navigate(`/admin/companies/${company._id}`)}
                        className="flex items-center gap-2 px-3 py-2 hover:bg-[#333] hover:text-[#00f2fe] rounded-md transition"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default CompaniesTable;
