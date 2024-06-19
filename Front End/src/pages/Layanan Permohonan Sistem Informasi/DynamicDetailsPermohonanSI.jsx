import React from "react";
import ConditionalRender from "../../components/ui/ConditionalRender";
import DynamicShow from "../../components/common/DynamicShow";

const DynamicDetailsPermohonanSI = ({ detailData, loading, location }) => {
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
            <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
              {Object.entries(detailData).map(([key, value]) =>
                <div
                  className={`${key === 'applicationDescription' ||
                    key === 'developmentTechnique' ||
                    key === 'dataSource' ||
                    key === 'cloudLocation' ||
                    key === 'reasonForChoosingStorage' ||
                    key === 'reasonForIntegration' ||
                    key === 'name_pic' ||
                    key === 'programmingLanguage' ||
                    key === 'storageMedia' ||
                    key === 'integrationWithSystem' ||
                    key === 'exchangeFormat' ||
                    key === 'proposedDomain' ||
                    key === 'namePPK' ||
                    key === 'linkupJob' ||
                    key === 'numberOfPeopleRequired' ||
                    key === 'spbePlan' ||
                    key === 'riskManagement' ||
                    key === 'reformasiBirokrasi' ||
                    key === 'technicalRecommendationLetter' ||
                    key === 'anggaranAttachment' ||
                    key === 'title' ||
                    key === 'letterDate' ? 'col-span-2' : 'col-span-1'}`}
                  key={key}
                >
                  {key === "name_pic" &&
                    <div className="mt-3">
                      <span className="text-lg font-bold ">Perangkat Daerah</span>
                    </div>}
                  {key === "dataSource" &&
                    <div className="mt-3">
                      <span className="text-lg font-bold">Sumber Data</span></div>}
                  {key === "programmingLanguage" &&
                    <div className="mt-3">
                      <span className="text-lg font-bold">Kebutuhan Perangkat Lunak</span></div>}
                  {key === "storageMedia" &&
                    <div className="mt-3">
                      <span className="text-lg font-bold">Kebutuhan Perangkat Keras</span></div>}
                  {key === "integrationWithSystem" &&
                    <div className="mt-3">
                      <span className="text-lg font-bold">Integrasi</span></div>}
                  {key === "title" &&
                    <div className="mt-3">
                      <span className="text-lg font-bold">Form Inputan</span></div>}
                  {key === "letterDate" &&
                    <div className="mt-3">
                      <span className="text-lg font-bold">Lampiran</span></div>}
                  <DynamicShow
                    name={key}
                    label={getKeyLabel(key)}
                    value={value}
                    location={location}
                    type={getFieldType(key)}
                    disabled={true}
                  />
                </div>
              )}
            </div>
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
    case "file_scema_integration":
      return "Skema Integrasi";
    case "submission_type_user_account":
      return "Jenis Akun User";





    // case "applicationType":
    //   return "Jenis Aplikasi";
    // case "applicationName":
    //   return "Nama Aplikasi";
    // case "developmentAspect":
    //   return "Hal yang dikembangkan";
    // case "developmentGoal":
    //   return "Tujuan Pengembangan";
    // case "applicationOwnership":
    //   return "Kepemilikan Aplikasi";
    // case "developerName1":
    //   return "Developer 1";
    // case "developerName2":
    //   return "Developer 2";
    // case "developmentDuration":
    //   return "Durasi Pengembangan";
    // case "fundingSource":
    //   return "Sumber Anggaran";
    // case "budgetAmount":
    //   return "Besar Anggaran";
    // case "clusterCategory":
    //   return "Kategori Klaster";
    // case "programmingLanguage":
    //   return "Bahasa Pemrograman";
    // case "applicationDescription":
    //   return "Deskripsi Aplikasi";
    // case "Otherdatabase":
    //   return "Database Lainnya";
    // case "otherProgrammingLanguage":
    //   return "Bahasa Pemrograman Lainnya";
    // case "developmentTechnique":
    //   return "Teknik Pengembangan";
    // case "storageMedia":
    //   return "Media Penyimpanan";
    // case "dataSource":
    //   return "Sumber Data";
    // case "reasonForChoosingStorageMedia":
    //   return "Alasan Pemilihan Media Penyimpanan";
    // case "serverRentalLocation":
    //   return "Lokasi Penyewaan Server";
    // case "serverRentalPeriod":
    //   return "Periode Penyewaan Server";
    // case "serverRentalCost":
    //   return "Harga Penyewaan Server";
    // case "kakAttachment":
    //   return "Lampiran KAK";
    // case "cloudLocation":
    //   return "Lokasi Cloud";
    // case "cloudStoragePeriod":
    //   return "Periode Penyimpanan Cloud";
    // case "cloudStorageCost":
    //   return "Harga Penyimpanan Cloud";
    // case "skpdRequestLetter":
    //   return "Surat Permohonan SKPD";
    // case "reformasiBirokrasi":
    //   return "Reformasi Birokrasi (RB) Tematik";
    // case "reformasiBirokrasi2":
    //   return "Reformasi Birokrasi (RB) Tematik Lainnya";
    // case "reformasiBirokrasi3":
    //   return "Reformasi Birokrasi (RB) Tematik Lainnya";
    // case "reformasiBirokrasi4":
    // case 'ramSpecifications':
    //   return "Spesifikasi RAM";
    // case 'cpuSpecifications':
    //   return "Spesifikasi CPU";
    // case 'storageSpecifications':
    //   return "Spesifikasi Storage";
    // case 'gpuSpecifications':
    //   return "Spesifikasi GPU";
    // case 'otherSpecifications':
    //   return "Spesifikasi Lainnya";
    // case 'hardDiskSpecifications':
    //   return "Spesifikasi Hard Disk";
    // case 'integrationWithSystem':
    //   return "Integrasi dengan Sistem";
    // case 'reasonForIntegration':
    //   return "Alasan Integrasi";
    // case 'storage':
    //   return "Penyimpanan";
    // case 'exchangeFormat':
    //   return "Format Penyimpanan";
    // case 'proposedDomain':
    //   return "Domain Yang Diusulkan";
    // case 'letterNumber':
    //   return "Nomor Surat";
    // case 'letterDate':
    //   return "Tanggal Surat";
    // case 'otherRequirements':
    //   return "Requirement Lainnya";
    // case 'spbePlan':
    //   return "PETA Rencana SPBE OPD";
    // case 'riskManagement':
    //   return "manajemen risiko SPBE";
    default:
      return key;
  }
};

const getFieldType = (key) => {
  switch (key) {
    case "reason":
    case "app_desc":
    case "needed_data":
    case "integration":
      return "html";
    case "full_address":
      return "text";
    case "image_screenshoot":
    case "image":
      return "images";
    case "file_process_bisiness":
    case "anggaranAttachment":
    case "technicalRecommendationLetter":
    case "file_scema_integration":
      return "pdf";
    case "type_tools":
      return "array";
    case "createdAt":
      return "multi_date";
    case "period":
    case "letterDate":
      return "multidate";
    default:
      return "text";
  }

};

export default DynamicDetailsPermohonanSI;
