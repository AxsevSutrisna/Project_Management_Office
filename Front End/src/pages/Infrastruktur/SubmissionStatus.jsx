// status.jsx

import React from 'react';

const status = ({ status }) => {
  return (
    <div className="flex-1 flex flex-col gap-3">
      <div className="flex sm:flex-row flex-col bg-lightColor dark:bg-cardDark p-3 rounded-lg">
        {[
          // {
          //   title: "Dalam Antrian",
          //   status: 1,
          //   color: "bg-[#333333]",
          //   border: "border-[#333333]",
          //   text: "text-[#333333]",
          // },
          // {
          //   title: "Validasi",
          //   status: 2,
          //   color: "bg-[#F5CF08]",
          //   border: "border-[#F5CF08]",
          //   text: "text-[#F5CF08]",
          // },
          // {
          //   title: "Proses",
          //   status: 3,
          //   color: "bg-[#F5CF08]",
          //   border: "border-[#F5CF08]",
          //   text: "text-[#F5CF08]",
          // },
          // {
          //   title: "Selesai",
          //   status: 4,
          //   color: status === 4 ? "bg-[#FF0000]" : "bg-[#13C39C]",
          //   border: status === 4 ? "border-[#FF0000]" : "border-[#13C39C]",
          //   text: status === 4 ? "text-[#FF0000]" : "text-[#13C39C]",
          // },

          {
            title: "Dalam Antrian",
            status: 1,
            color: "bg-[#333333]",
            border: "border-[#333333]",
            text: "text-[#333333]",
          },
          {
            title: status === 2 ? "Validasi" : status === 3 ? "Ditolak" : 'Validasi',
            status: 2,
            color: status === 2 ? "bg-[#F5CF08]" : status === 3 ? "bg-[#FF0000]" : "bg-[#F5CF08]",
            border: status === 2 ? "border-[#F5CF08]" : status === 3 ? "border-[#FF0000]" : "border-[#F5CF08]",
            text: status === 2 ? "text-[#F5CF08]" : status === 3 ? "text-[#FF0000]" : "text-[#F5CF08]",
          },
          {
            title: "Proses",
            status: 4,
            color: "bg-[#FFA500]",
            border: "border-[#FFA500]",
            text: "text-[#FFA500]",
          },
          {
            title: "Selesai",
            status: 5,
            color: status === 5 ? "bg-[#13C39C]" : status === 6 ? "bg-[#FF0000]" : "bg-[#13C39C]",
            border: status === 5 ? "border-[#13C39C]" : status === 6 ? "border-[#13C39C]" : "border-[#13C39C]",
            text: status === 5 ? "text-[#13C39C]" : 6 ? "text-[#FF0000]" : "text-[#13C39C]",
          },
        ].map((item, index) => (
          <div key={index} className="flex flex-col flex-1 ">
            <div className="flex flex-1 gap-3 items-center flex-row py-2 text-center text-darkColor">
              <div className={`${"border-b-2"}  flex-1 flex ${status >= item.status ? item.border : "border-[#dddddd] dark:border-[#ffffff20] "}`} />
              <div className={`flex p-2 rounded-full border-2 ${status >= item.status ? item.border : "border-[#dddddd] dark:border-[#ffffff20] "}`}>
                <div className={`flex items-center w-12 aspect-square justify-center ${status >= item.status ? item.color : "bg-[#D9D9D9]"} rounded-full`}>
                  <span className="text-xl  aspect-square text-center align-text-bottom font-bold">{index + 1}</span>
                </div>
              </div>
              <div className={`${"border-b-2"}  flex-1 flex ${status >= item.status ? item.border : "border-[#dddddd] dark:border-[#ffffff20] "}`} />
            </div>
            <div className={`flex flex-col items-center ${status >= item.status ? item.text : "text-[#D9D9D9]"} `}>
              <span className="text-sm font-semibold">{item.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default status;
