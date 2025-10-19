import Image from "next/image";
import { Button } from "../ui/button";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useConvex } from "convex/react";
import { useUserDeatail } from "@/app/provider";
import { api } from "@/convex/_generated/api";

function EmailTemplateList() {
  const [emailList, setEmailList] = useState([]);

  const convex = useConvex();
  const { userDetail, setUserDetail } = useUserDeatail();

  useEffect(() => {
    userDetail && GetTemplateList();
  }, [userDetail]);

  const GetTemplateList = async () => {
    const result = await convex.query(api.emailTemplate.GetAllUserTemplate, {
      email: userDetail?.email,
    });
    console.log(result);
    setEmailList(result);
  };

  return (
    <div>
      <h2 className="font-bold text-xl text-[#FA812F] mt-6">WorkSpace</h2>

      {emailList?.length == 0 ? (
        <div className="flex flex-col justify-center mt-7 items-center">
          <h1 className="font-extrabold text-[#CBCBCB] text-xl">
            No Email Template Found !
          </h1>
          <Image
            src={"/EmailMarketing.gif"}
            alt="email"
            width={350}
            height={350}
          />
          <Link href={"/dashboard/create"}>
            <Button className={"p-6  mt-10"}>+ Create New</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          {emailList?.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-xl shadow-md border flex flex-col items-center text-center"
            >
              <Image
                src={"/emailbox.png"}
                alt="email"
                width={250}
                height={250}
                className="w-full"
              />
              <h2 className="">{item?.description}</h2>
              {/* <h2>Created On : {}</h2> */}
              <Link href={"/editor/" + item.tid} className="w-full">
                <Button className={"mt-2 w-full cursor-pointer"}>
                  View / Edit
                </Button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EmailTemplateList;
