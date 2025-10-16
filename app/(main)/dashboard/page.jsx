"use client"
import { useUserDeatail } from "@/app/provider";
import Header from "@/components/custom/Header";
import React from "react";
import { Button } from "@/components/ui/button";
import EmailTemplateList from "@/components/custom/EmailTemplateList";

const Dashboard = () => {

    const {userDetail, setUserDetail} = useUserDeatail();

  return (
    <div>
      <Header />
      <div className="p-10 md:px-28 lg:px-40 xl:px-56 mt-16">
        <div  className="flex justify-between items-center">
            <h2 className="font-bold text-3xl">Hello, {userDetail?.name} !</h2>
            <Button className={'p-6'}> + Create New Email Template</Button>
        </div>
        <EmailTemplateList />
      </div>
    </div>
  );
};

export default Dashboard;
