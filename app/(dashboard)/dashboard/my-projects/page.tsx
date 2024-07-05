"use client"


import { Employee } from '@/constants/data';

import { useEffect } from 'react';
import toast, {Toaster} from 'react-hot-toast';
// import Image from 'next/image';

const breadcrumbItems = [{ title: 'Employee', link: '/dashboard/my-project' }];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function page({ searchParams }: paramsProps) {
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const country = searchParams.search || null;
  const offset = (page - 1) * pageLimit;
    
  useEffect(()=>{
    toast.error("This Page is under Development proces");
  },[])

  const res = await fetch(
    `https://api.slingacademy.com/v1/sample-data/users?offset=${offset}&limit=${pageLimit}` +
      (country ? `&search=${country}` : '')
  );
  const employeeRes = await res.json();
  const totalUsers = employeeRes.total_users; //1000
  const pageCount = Math.ceil(totalUsers / pageLimit);
  const employee: Employee[] = employeeRes.users;
  return (
    <>
    <Toaster/>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between"> Not Available </div>
      </div>
    </>
  );
}
