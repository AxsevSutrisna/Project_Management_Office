import React from "react";
import DynamicShow from "../common/DynamicShow";
import ConditionalRender from "./ConditionalRender";

const DynamicDetails = ({ detailData, loading, location }) => {
  return (
    <div className="flex-1 flex flex-col gap-3">
      <div className="flex flex-col gap-3 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
        <ConditionalRender
          data={detailData}
          loading={loading}
          className={"flex flex-col min-h-[200px]"}
          model={"emptyData"}
        >
          <div className="flex flex-col gap-3">
            <span className="text-lg font-bold">Rincian Pengajuan</span>
            {Object.entries(detailData).map(([key, value]) =>
              key === "device_specifications" ? (
                <DynamicShow
                  key={key}
                  name={key}
                  label={getKeyLabel(key)}
                  value={JSON.stringify(value)}
                  location={location}
                  type={getFieldType(key)}
                  disabled={true}
                />
              ) : (
                <DynamicShow
                  key={key}
                  name={key}
                  label={getKeyLabel(key)}
                  value={value}
                  location={location}
                  type={getFieldType(key)}
                  disabled={true}
                />
              )
            )}
          </div>
        </ConditionalRender>
      </div>
    </div>
  );
};

const getKeyLabel = (key) => {
  switch (key) {
    case "submission_type":
      return "Jenis Pengajuan";
    case "name_pic":
      return "Nama PIC";
    case "telp_pic":
      return "Nomor PIC";
    case "type_tools":
      return "Jenis Alat";
    case "image_screenshoot":
      return "Screenshot";
    case "period":
      return "Periode Jangka Waktu";
    case "submission_type":
      return "Jenis Pengajuan";
    case "device_specifications":
      return "Spesifikasi Alat";
    case "proposed_bandwidth":
      return "Pengajuan Bandwidth";
    case "total_tools":
      return "Total Alat";
    case "reason":
      return "Alasan Pengajuan";
    case "full_address":
      return "Alamat Lengkap";
    case "status":
      return "Status";
    case "submission_title":
      return "Nama Pengajuan";
    case "createdAt":
      return "Tanggal Pembuatan";
    case "other_requirements":
      return "Requirement Lainnya";
    case "app":
      return "Nama Aplikasi";
    case "distance_estimation":
      return "Estimasi Jarak";
    case "initial_bandwith":
      return "Bandwidth Awal";
    case "file_process_bisiness":
      return "Proses Bisnis";
    case "app_name":
      return "Nama Aplikasi";
    case "app_desc":
      return "Deskripsi Aplikasi";
    case "fullname":
      return "Nama Lengkap";
    case "account_type":
      return "Jenis Akun";
    case "needed_data":
      return "Data yang dibutuhkan";
    case "integration":
      return "Tujuan Integrasi";
    default:
      return key;
  }
};

const getFieldType = (key) => {
  switch (key) {
    case "reason":
    case "app_desc":
      return "html";
    case "needed_data":
      return "html";
    case "integration":
      return "html";
    case "full_address":
      return "text";
    case "image_screenshoot":
    case "image":
      return "images";
    case "file_process_bisiness":
      return "pdf";
    case "type_tools":
      return "array";
    // case "account_type":
    //   return "array";
    case "createdAt":
      return "date";
    case "period":
      return "multidate";
    default:
      return "text";
  }
};

export default DynamicDetails;
