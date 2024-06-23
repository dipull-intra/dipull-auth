/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";
import React from "react";

import { DataInfo } from "@/app/api/teacher/userinfo/utils";
import { alert } from "@/utils/alert";
import instance from "@/utils/instance";

const TeacherAuthorityContent = ({
  init
}: {
    init: DataInfo[];
}) => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [teachers, setTeachers] = React.useState<DataInfo[]>(init);

  const getTeachersData = async () => {
    setLoading(true);
    try{
      const { data } = await instance.get("/api/teacher/teachers");
      console.log(data);
      setTeachers(data.data);
      router.refresh();
    }
    catch(e: any){
      alert.error(e.response.data.message);
    }
    setLoading(false);
  };
  const deleteTeachersData = async (id: string) => {
    setLoading(true);
    const loading = alert.loading("선생님 권한을 삭제하는 중입니다.");
    try{
      const res = await instance.post("/api/teacher/teachers", {
        id
      });
      await getTeachersData();
      alert.update(loading, res.data.message, "success");
    }
    catch(e: any){
      alert.update(loading, e.response.data.message, "error");
    }
    setLoading(false);
  };

  return (
    <>
      <article className="flex flex-col gap-3">
        <h1 className="text-xl font-semibold">선생님 목록</h1>
        <article className={[
          "flex flex-row gap-1 bg-white rounded border border-text/10 p-5 overflow-auto",
          loading ? "loading_background" : "",
        ].join(" ")}>
          <table className="w-full overflow-auto">
            <tbody className="w-full border-y border-text/10 overflow-auto">
              <tr className="w-full">
                <th className="text-center px-4 whitespace-nowrap py-2 font-semibold w-full" colSpan={2}>선생님 권한 목록</th>
                <td className="text-center px-4">삭제</td>
              </tr>
              {
                teachers.length ? teachers.map((v, i) => {
                  return (
                    <tr className="w-full border-y border-text/10" key={i} onClick={() => {}}>
                      <td className="text-center px-4 whitespace-nowrap">{i + 1}</td>
                      <td className="w-full text-left px-4 whitespace-nowrap border-x border-text/10 py-2">
                        <div className="flex flex-row gap-2 items-center">
                          <img src={v.profile_image} className="w-8 h-8 rounded-full border border-text/10" alt="profile" />
                          <p className="text-left whitespace-nowrap">{v.name} ({v.email.split("@")[0]} / {v.gender === "male" ? "남" : "여"})</p>
                        </div>
                      </td>
                      <td className="text-center px-4 select-none" onClick={() => deleteTeachersData(v.id)}>
                        <div className="flex justify-center items-center h-full">
                          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.0016 19.5C8.68772 19.5 7.45268 19.2506 6.29655 18.752C5.1404 18.2533 4.13472 17.5765 3.2795 16.7217C2.42427 15.8669 1.74721 14.8616 1.24833 13.706C0.749442 12.5504 0.5 11.3156 0.5 10.0017C0.5 8.68772 0.749334 7.45268 1.248 6.29655C1.74667 5.1404 2.42342 4.13472 3.27825 3.2795C4.1331 2.42427 5.13834 1.74721 6.29398 1.24833C7.44959 0.749443 8.68437 0.5 9.9983 0.5C11.3122 0.5 12.5473 0.749334 13.7034 1.248C14.8596 1.74667 15.8652 2.42342 16.7205 3.27825C17.5757 4.1331 18.2527 5.13834 18.7516 6.29398C19.2505 7.44959 19.5 8.68437 19.5 9.9983C19.5 11.3122 19.2506 12.5473 18.752 13.7034C18.2533 14.8596 17.5765 15.8652 16.7217 16.7205C15.8669 17.5757 14.8616 18.2527 13.706 18.7516C12.5504 19.2505 11.3156 19.5 10.0016 19.5ZM9.99998 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 9.99998C18 7.76664 17.225 5.87498 15.675 4.32498C14.125 2.77498 12.2333 1.99998 9.99998 1.99998C7.76664 1.99998 5.87498 2.77498 4.32498 4.32498C2.77498 5.87498 1.99998 7.76664 1.99998 9.99998C1.99998 12.2333 2.77498 14.125 4.32498 15.675C5.87498 17.225 7.76664 18 9.99998 18ZM6.3077 12.7884V11.4269C6.3077 11.3092 6.32949 11.1951 6.37308 11.0848C6.41666 10.9744 6.48525 10.8724 6.57885 10.7788L11.7365 5.64615C11.8609 5.5282 11.9952 5.4423 12.1393 5.38845C12.2835 5.33462 12.4276 5.3077 12.5718 5.3077C12.729 5.3077 12.8811 5.33718 13.0281 5.39615C13.175 5.45512 13.3086 5.54358 13.4288 5.66153L14.3538 6.59615C14.4615 6.7205 14.5448 6.85511 14.6038 6.99998C14.6628 7.14486 14.6923 7.28973 14.6923 7.4346C14.6923 7.57947 14.6653 7.7269 14.6115 7.8769C14.5577 8.02689 14.4718 8.16406 14.3538 8.28843L9.22113 13.4211C9.12753 13.5147 9.02554 13.5833 8.91518 13.6269C8.80481 13.6705 8.69077 13.6923 8.57305 13.6923H7.21153C6.95544 13.6923 6.74078 13.6056 6.56755 13.4324C6.39432 13.2592 6.3077 13.0445 6.3077 12.7884ZM7.49998 12.5H8.44998L11.6962 9.23843L11.2462 8.75355L10.7712 8.2942L7.49998 11.55V12.5ZM11.2462 8.75355L10.7712 8.2942L11.6962 9.23843L11.2462 8.75355Z" fill="rgb(var(--color-text) / .35)"/>
                          </svg>
                        </div>
                      </td>
                    </tr>
                  );
                }) : (
                  <tr className="w-full border-y border-text/10">
                    <td className="text-center px-4 whitespace-nowrap py-2 text-text/50" colSpan={3}>선생님 목록이 없습니다.</td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </article>
      </article>
    </>
  );
};

export default TeacherAuthorityContent;