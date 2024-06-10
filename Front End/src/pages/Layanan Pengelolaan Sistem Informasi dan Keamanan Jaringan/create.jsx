import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { ReactComponent as PlusIcon } from "../../assets/icon/ic_plus.svg";
import { ReactComponent as PengajuanBerahasilIcon } from "../../assets/icon/ic_pengajuan_berhasil.svg";
import DynamicInput from "../../components/common/DynamicInput";
import useTheme from "../../components/context/useTheme";
import TitleHeader from "../../components/layout/TitleHeader";
import DynamicButton from "../../components/common/DynamicButton";
import { convertToNameValueObject } from "../../utils/helpers/convertToNameValueObject";
import { isValidatorPembangunan, isValidatorPengembangan, isValidatorStepper1, isValidatorStepper2, isValidatorStepper3, isValidatorStepper4, isValidatorUserAccountSI } from "./validators";
import fetchUploadFiles from "../../utils/api/uploadFiles";
import ModalContent from "../../components/ui/Modal/ModalContent";
import { isPending } from "../../components/store/actions/todoActions";
import { apiClient } from "../../utils/api/apiClient";

function CreateAplikasiPages() {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const authApiKey = Cookies.get("authApiKey");
  const authToken = Cookies.get("authToken");
  const authProfile = Cookies.get("authData");

  const [inputData, setInputData] = useState({});
  const [stepper, setStepper] = useState(1);

  const [isModalVerif, setisModalVerif] = useState({
    status: false,
    data: {},
  });
  const dispatch = useDispatch();
  const dataState = location.state;

  useEffect(() => {
    if (authToken) {

      // Your effect logic here

      // JSON.parse(authProfile).fullname,
      // JSON.parse(authProfile).telp
    }
  }, [dataState, authToken]);

  const handleInputChange = (field, value) => {
    setInputData((prevState) => {
      if (field === 'applicationType') {
        const newState = { [field]: value };
        if (value === 'Pembangunan Aplikasi') {
          newState.applicationDescription = prevState.applicationDescription || '';
          newState.applicationOwnership = prevState.applicationOwnership || '';
        } else if (value === 'Pengembangan Aplikasi') {
          newState.developmentAspect = prevState.developmentAspect || '';
          newState.developmentGoal = prevState.developmentGoal || '';
          newState.applicationOwnership = prevState.applicationOwnership || '';

        }
        return newState;
      } else {
        return {
          ...prevState,
          [field]: value,
        };
      }
    });
  };

  const checkingFormData = async (combinedObject) => {
    if (stepper === 1) {
      if (combinedObject.applicationType?.label === "Pembangunan Aplikasi") {
        if (isValidatorPembangunan(combinedObject)) {
          setStepper(2)
          setInputData({
            ...inputData,
            name_pic: JSON.parse(authProfile).fullname,
            telp_pic: JSON.parse(authProfile).telp
          })
        } else {
          return false;
        }
      }
      else {
        if (isValidatorPengembangan(combinedObject)) {
          setStepper(2)
          setInputData({
            ...inputData,
            name_pic: JSON.parse(authProfile).fullname,
            telp_pic: JSON.parse(authProfile).telp
          })
        } else {
          return false;

        }
      }
    } else if (stepper === 2) {
      if (isValidatorStepper2(combinedObject)) {
        setStepper(3)
      } else {
        return false;
      }
    } else if (stepper === 3) {
      if (isValidatorStepper3(combinedObject)) {
        setStepper(4)
      } else {
        return false;
      }
    } else if (stepper === 4) {
      if (isValidatorStepper4(combinedObject)) {
        const transformedData = transformData(combinedObject);
        await handleImageUploadAndFetch(transformedData);
        console.log(transformedData);
      } else {
        return false;
      }
    }
  };
  const transformData = (input) => {
    const output = {};
    for (const key in input) {
      if (Array.isArray(input[key])) {
        // If it's an array, iterate through each item
        output[key] = input[key].map(item => item.value);
      } else if (typeof input[key] === 'object' && input[key] !== null) {
        // If it's an object, check if it has a 'value' property
        if ('value' in input[key]) {
          output[key] = input[key].value;
        } else if ('startDate' in input[key] && 'endDate' in input[key]) {
          // Special case for the date range object
          output[key] = [input[key].startDate, input[key].endDate];
        } else {
          // If it doesn't have a 'value' property or it's not a date range object, include the object as it is
          output[key] = input[key];
        }
      } else {
        // Otherwise, just copy the value as it is
        output[key] = input[key];
      }
    }
    return output;
  };


  const handleImageUploadAndFetch = async (data) => {
    if (
      data.kakAttachment ||
      data.skpdRequestLetter
    ) {
      try {
        const uploadPromises = [];
        const resultMapping = {};
        if (data.kakAttachment) {
          uploadPromises.push(
            fetchUploadFiles(
              authApiKey,
              authToken,
              data.kakAttachment,
              "aplikasi",
              dispatch
            ).then(result => {
              resultMapping.kakAttachment = result;
            })
          );
        }

        if (data.skpdRequestLetter) {
          uploadPromises.push(
            fetchUploadFiles(
              authApiKey,
              authToken,
              data.skpdRequestLetter,
              "aplikasi",
              dispatch
            ).then(result => {
              resultMapping.skpdRequestLetter = result;
            })
          );
        }

        await Promise.all(uploadPromises);

        let combineData = { ...data };
        if (resultMapping.kakAttachment) {
          combineData.kakAttachment = resultMapping.kakAttachment;
        }
        if (resultMapping.skpdRequestLetter) {
          combineData.skpdRequestLetter = resultMapping.skpdRequestLetter;
        }
        fetchDataCreate(authApiKey, authToken, combineData);
      } catch (error) {
        console.error("Error occurred during image upload:", error);
      }
    } else {
      fetchDataCreate(authApiKey, authToken, data);
    }
  };
  const fetchDataCreate = async (api_key, token, data) => {
    dispatch(isPending(true));

    const updatedData = {
      ...data,
      submission_title: 'Permohonan Sistem Informasi',
      submission_type: 'Pengajuan Layanan Pengelolaan Sistem Informasi dan Keamanan Jaringan',
      role: [
        'op_pmo',
        'perangkat_daerah',
        'kabid_aplikasi',
        'kabid_infra',
        'kabid_perencanaan',
      ]
    };

    const raw = JSON.stringify(updatedData);

    try {
      const response = await apiClient({
        baseurl: "aplikasi/create",
        method: "POST",
        customHeaders: { "Content-Type": "application/json" },
        body: raw,
        apiKey: api_key,
        token: token,
      });
      dispatch(isPending(false));
      if (response?.statusCode === 200) {
        setisModalVerif({
          data: {
            title: "Pengajuan Aplikasi Berhasil",
            msg: "Selamat, Pengajuan anda sudah diterima",
            icon: PengajuanBerahasilIcon,
            color: "#13C39C",
          },
          status: true,
        });
      } else {
        toast.error(response.result.msg, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <div className="flex flex-col gap-3 flex-1 p-4">
      <TitleHeader
        title={"Buat Pengajuan Permohonan Sistem Informasi"}
        link1={"dashboard"}
        link2={"Layanan Pengelolaan Sistem Informasi dan Keamanan Jaringan"}
      />
      <section className="flex flex-col gap-3">
        <div className="flex items-center p-3 space-x-2 text-sm font-medium text-center overflow-x-auto bg-lightColor dark:bg-cardDark rounded-lg dark:text-gray-400 text-gray-500 sm:text-base sm:p-4">
          {[
            { id: 1, label: 'Umum' },
            { id: 2, label: 'Perangkat Daerah' },
            { id: 3, label: 'Perangkat Lunak' },
            { id: 4, label: 'Lampiran' },
          ].map((step) => (
            <li
              key={step.id}
              className={`flex items-center whitespace-nowrap ${stepper >= step.id ? 'text-[#0185FF]' : ''}`}
            >
              <span
                className={`flex items-center font-semibold justify-center w-5 h-5 me-2 text-xs rounded-full shrink-0 border-1 ${stepper >= step.id ? 'border-[#0185FF]' : 'border-[#dddddd] dark:border-[#ffffff20]'
                  }`}
              >
                {step.id}
              </span>
              <span className="inline-flex">{step.label}</span>
              {step.id !== 4 && (
                <svg
                  className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 12 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m7 9 4-4-4-4M1 9l4-4-4-4"
                  />
                </svg>
              )}
            </li>
          ))}
        </div>
        <div className="flex-1 flex flex-col gap-3">
          <div className="flex flex-col gap-2 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
            {stepper === 1 &&
              <div className="flex flex-col gap-2">
                <span className="flex text-lg font-semibold">Kebutuhan Perangkat Keras</span>
                <DynamicInput
                  label={"Jenis Pengajuan"}
                  value={inputData.applicationType || ''}
                  type={'selection'}
                  options={[
                    { label: 'Pembangunan Aplikasi', value: 'Pembangunan Aplikasi' },
                    { label: 'Pengembangan Aplikasi', value: 'Pengembangan Aplikasi' }
                  ]}
                  onChange={(value) => handleInputChange('applicationType', value)}
                  placeholder={"Masukan Pengembangan / Pembangunan"}
                />
                {inputData.applicationType !== undefined &&
                  <div className="flex flex-col gap-2">
                    {inputData.applicationType?.label === 'Pembangunan Aplikasi' ?
                      <div className="flex flex-col gap-2">
                        <span className="flex text-lg font-semibold">Pembangunan Aplikasi</span>
                        <DynamicInput
                          label={"Nama Aplikasi"}
                          value={inputData.applicationName || ''}
                          type={'text'}
                          onChange={(value) => handleInputChange('applicationName', value)}
                          placeholder={"Masukan Nama Aplikasi"}
                        />
                        <DynamicInput
                          label={"Deskripsi Aplikasi"}
                          value={inputData.applicationDescription || ''}
                          type={'textarea'}
                          onChange={(value) => handleInputChange('applicationDescription', value)}
                          placeholder={"Masukan Deskripsi Pembangunan"}
                        />
                        <DynamicInput
                          label={"Kepemilikan Aplikasi"}
                          value={inputData.applicationOwnership || ''}
                          type={'selection'}
                          options={[
                            { label: 'Milik Sendiri', value: 'Milik Sendiri' },
                            { label: 'Milik Instansi', value: 'Milik Instansi' }
                          ]}
                          onChange={(value) => handleInputChange('applicationOwnership', value)}
                          placeholder={"Pilih Kepemilikan Aplikasi"}
                        />
                      </div>
                      :
                      <div className="flex flex-col gap-2">
                        <span className="flex text-lg font-semibold">Teknis Pengembangan</span>
                        <DynamicInput
                          label={"Nama Aplikasi"}
                          value={inputData.applicationName}
                          type={'selection'}
                          options={[
                            { label: ' Aplikasi1', value: ' Aplikasi1' },
                          ]}
                          onChange={(value) => handleInputChange('applicationName', value)}
                          placeholder={"Masukan Nama Aplikasi"}
                        />
                        <DynamicInput
                          label={"Hal yang Dikembangkan"}
                          value={inputData.developmentAspect}
                          type={'textarea'}
                          onChange={(value) => {
                            handleInputChange('developmentAspect', value)
                          }}
                          placeholder={"Masukan Hal yang Dikembangkan"}
                        />
                        <DynamicInput
                          label={"Tujuan Pengembangan Aplikasi"}
                          value={inputData.developmentGoal}
                          type={'textarea'}
                          onChange={(value) => handleInputChange('developmentGoal', value)}
                          placeholder={"Masukan Tujuan Pengembangan Aplikasi"}
                        />
                        <DynamicInput
                          label={"Kepemilikan Aplikasi"}
                          value={inputData.applicationOwnership || ''}
                          type={'selection'}
                          options={[
                            { label: 'Milik Sendiri', value: 'Milik Sendiri' },
                            { label: 'Milik Instansi', value: 'Milik Instansi' }
                          ]}
                          onChange={(value) => handleInputChange('applicationOwnership', value)}
                          placeholder={"Pilih Kepemilikan Aplikasi"}
                        />
                      </div>
                    }
                  </div>
                }
              </div>}

            {stepper === 2 &&
              <div className="flex flex-col gap-2">
                <span className="flex text-lg font-semibold">Perangkat Daerah</span>
                <div className="flex md:flex-row flex-col gap-2">
                  <DynamicInput
                    label={"Nama PIC"}
                    value={inputData.name_pic}
                    type={'text'}
                    onChange={(value) => handleInputChange('name_pic', value)}
                    placeholder={"Masukan Nama PIC"}
                  />
                  <DynamicInput
                    label={"Nomor PIC"}
                    value={inputData.telp_pic}
                    type={'tel'}
                    onChange={(value) => handleInputChange('telp_pic', value)}
                    placeholder={"Masukan Nomor PIC"}
                  />
                </div>
                <DynamicInput
                  label={"Teknis Pengembangan"}
                  value={inputData.developmentTechnique || ''}
                  type={'selection'}
                  options={[
                    { label: 'Pihak Ke-3', value: 'Third Party' },
                    { label: 'Dikembangkan Tenaga Ahli', value: 'Developed by Experts' },
                    { label: 'Didampingi Diskominfo', value: 'Accompanied by Diskominfo' },
                    { label: 'Dikembangkan Mandiri', value: 'Self-developed' }
                  ]}
                  onChange={(value) => handleInputChange('developmentTechnique', value)}
                  placeholder={"Pilih Teknis Pengembangan"}
                />
                <div className="flex md:flex-row flex-col gap-2">
                  <DynamicInput
                    label={"Nama Pengembang 1 (opsional)"}
                    value={inputData.developerName1}
                    type={'text'}
                    onChange={(value) => handleInputChange('developerName1', value)}
                    placeholder={"Masukan Nama Pengembang 1"}
                  />
                  <DynamicInput
                    label={"Nama Pengembang 2 (opsional)"}
                    value={inputData.developerName2}
                    type={'text'}
                    onChange={(value) => handleInputChange('developerName2', value)}
                    placeholder={"Masukan Nama Pengembang 2"}
                  />
                </div>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                  <DynamicInput
                    label={"Lama Pengembangan"}
                    value={inputData.developmentDuration || ''}
                    type={'selection'}
                    options={[
                      { label: '1 Bulan', value: '1 Month' },
                      { label: '2 Bulan', value: '2 Months' },
                      { label: '3 Bulan', value: '3 Months' },
                      { label: '4 Bulan', value: '4 Months' },
                      { label: '5 Bulan', value: '5 Months' },
                      { label: '6 Bulan', value: '6 Months' },
                      { label: '7 Bulan', value: '7 Months' },
                      { label: '8 Bulan', value: '8 Months' },
                      { label: '9 Bulan', value: '9 Months' },
                      { label: '10 Bulan', value: '10 Months' },
                      { label: '11 Bulan', value: '11 Months' },
                      { label: '12 Bulan', value: '12 Months' }
                    ]}
                    onChange={(value) => handleInputChange('developmentDuration', value)}
                    placeholder={"Pilih Lama Pengembangan"}
                  />
                  <DynamicInput
                    label={"Sumber Anggaran"}
                    value={inputData.fundingSource || ''}
                    type={'selection'}
                    options={[
                      { label: 'APBN', value: 'APBN' },
                      { label: 'APBD', value: 'APBD' }
                    ]}
                    onChange={(value) => handleInputChange('fundingSource', value)}
                    placeholder={"Pilih Sumber Anggaran"}
                  />
                  <DynamicInput
                    label={"Besar Anggaran (Rp)"}
                    value={inputData.budgetAmount}
                    type={'text'}
                    onChange={(value) => handleInputChange('budgetAmount', value)}
                    placeholder={"Masukan Besar Anggaran"}
                  />
                  <DynamicInput
                    label={"Sumber Dana Lainnya (opsional)"}
                    type={'text'}
                    value={inputData.otherFundingSource}
                    onChange={(value) => handleInputChange('otherFundingSource', value)}
                    placeholder={"Masukan Sumber Dana Lainnya"}
                  />
                  <DynamicInput
                    label={"Kategori Klaster"}
                    value={inputData.clusterCategory || ''}
                    type={'selection'}
                    options={[
                      { label: 'Pengelolaan Aset', value: 'Asset Management' }
                      // Add other options here
                    ]}
                    onChange={(value) => handleInputChange('clusterCategory', value)}
                    placeholder={"Pilih Kategori Klaster"}
                  />
                  <DynamicInput
                    label={"Klaster Lainnya (opsional)"}
                    value={inputData.otherCluster}
                    type={'text'}
                    onChange={(value) => handleInputChange('otherCluster', value)}
                    placeholder={"Masukan Klaster Lainnya"}
                  />
                  <DynamicInput
                    label={"Bahasa Pemrograman"}
                    value={inputData.programmingLanguage || ''}
                    type={'multi_selection'}
                    options={[
                      { label: 'PHP', value: 'PHP' },
                      { label: 'JavaScript', value: 'JavaScript' },
                      { label: 'Python', value: 'Python' },
                      { label: 'Java', value: 'Java' }
                      // Add other programming languages here
                    ]}
                    onChange={(value) => handleInputChange('programmingLanguage', value)}
                    placeholder={"Pilih Bahasa Pemrograman"}
                  />
                  <DynamicInput
                    label={"Bahasa Pemrograman Lainnya (opsional)"}
                    value={inputData.otherProgrammingLanguage}
                    type={'text'}
                    onChange={(value) => handleInputChange('otherProgrammingLanguage', value)}
                    placeholder={"Masukan Bahasa Pemrograman Lainnya"}
                  />
                </div>

                <DynamicInput
                  label={"Database Lainnya (opsional)"}
                  type={'text'}
                  value={inputData.Otherdatabase}
                  onChange={(value) => handleInputChange('Otherdatabase', value)}
                  placeholder={"Masukan Database Lainnya"}
                />
              </div>
            }
            {stepper === 3 &&
              <div className="flex flex-col gap-2">
                <span className="flex text-lg font-semibold">Kebutuhan Perangkat Lunak</span>
                <DynamicInput
                  label={"Media Penyimpanan"}
                  value={inputData.storageMedia || ''}
                  type={'selection'}
                  options={[
                    { label: 'Server Milik', value: 'Owned Server' },
                    { label: 'Server Diskominfo', value: 'Diskominfo Server' },
                    { label: 'Sewa Server', value: 'Server Rental' },
                    { label: 'Cloud', value: 'Cloud' },
                    { label: 'PDN', value: 'PDN' }
                  ]}
                  onChange={(value) => handleInputChange('storageMedia', value)}
                  placeholder={"Pilih Media Penyimpanan"}
                />
                <DynamicInput
                  label={"Alasan Pemilihan Media Penyimpanan"}
                  type={'textarea'}
                  value={inputData.reasonForChoosingStorageMedia}
                  onChange={(value) => handleInputChange('reasonForChoosingStorageMedia', value)}
                  placeholder={"Masukan Alasan Pemilihan Media Penyimpanan"}
                />
                <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                  <DynamicInput
                    label={"Lokasi Sewa Server (opsional)"}
                    value={inputData.serverRentalLocation}
                    type={'text'}
                    onChange={(value) => handleInputChange('serverRentalLocation', value)}
                    placeholder={"Masukan Lokasi Sewa Server"}
                  />
                  <DynamicInput
                    label={"Lokasi Cloud (opsional)"}
                    type={'text'}
                    value={inputData.cloudLocation}
                    onChange={(value) => handleInputChange('cloudLocation', value)}
                    placeholder={"Masukan Lokasi Cloud"}
                  />
                  <DynamicInput
                    label={"Spesifikasi CPU (opsional)"}
                    type={'text'}
                    value={inputData.cpuSpecifications}
                    onChange={(value) => handleInputChange('cpuSpecifications', value)}
                    placeholder={"Masukan Spesifikasi CPU"}
                  />
                  <DynamicInput
                    label={"Spesifikasi RAM (opsional)"}
                    type={'text'}
                    value={inputData.ramSpecifications}
                    onChange={(value) => handleInputChange('ramSpecifications', value)}
                    placeholder={"Masukan Spesifikasi RAM"}
                  />
                  <DynamicInput
                    label={"Spesifikasi Hardisk/Memory (opsional)"}
                    value={inputData.hardDiskSpecifications}
                    type={'text'}
                    onChange={(value) => handleInputChange('hardDiskSpecifications', value)}
                    placeholder={"Masukan Spesifikasi Hardisk/Memory"}
                  />
                </div>
                <span className="flex text-lg font-semibold">Data</span>
                <DynamicInput
                  label={"Sumber Data"}
                  value={inputData.dataSource}
                  type={'text'}
                  onChange={(value) => handleInputChange('dataSource', value)}
                  placeholder={"Masukan Sumber Data"}
                />
                <span className="flex text-lg font-semibold">Integrasi</span>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                  <DynamicInput
                    label={"Integrasi Dengan Sistem (opsional)"}
                    type={'text'}
                    value={inputData.integrationWithSystem}
                    onChange={(value) => handleInputChange('integrationWithSystem', value)}
                    placeholder={"Masukan Integrasi Dengan Sistem"}
                  />
                  <DynamicInput
                    label={"Alasan Integrasi (opsional)"}
                    type={'text'}
                    value={inputData.reasonForIntegration}
                    onChange={(value) => handleInputChange('reasonForIntegration', value)}
                    placeholder={"Masukan Alasan Integrasi"}
                  />
                  <DynamicInput
                    label={"Domain yang Diusulkan (opsional)"}
                    value={inputData.proposedDomain}
                    type={'text'}
                    onChange={(value) => handleInputChange('proposedDomain', value)}
                    placeholder={"Masukan Domain yang Diusulkan"}
                  />
                  <DynamicInput
                    label={"Format Penukaran (opsional)"}
                    value={inputData.exchangeFormat}
                    type={'text'}
                    onChange={(value) => handleInputChange('exchangeFormat', value)}
                    placeholder={"Masukan Format Penukaran"}
                  />
                </div>
              </div>
            }
            {stepper === 4 &&
              <div className="flex flex-col gap-2">
                <span className="flex text-lg font-semibold">Lampiran</span>
                <DynamicInput
                  label={"Nomor Surat"}
                  value={inputData.letterNumber}
                  type={'text'}
                  onChange={(value) => handleInputChange('letterNumber', value)}
                  placeholder={"Masukan Nomor Surat"}
                />
                <DynamicInput
                  label={"Tanggal Surat"}
                  value={inputData.letterDate}
                  type={'date'}
                  onChange={(value) => handleInputChange('letterDate', value)}
                  placeholder={"Masukan Tanggal Surat"}
                />
                <DynamicInput
                  label={"Surat Permohonan SKPD"}
                  value={inputData.skpdRequestLetter}
                  type={'file_upload'}
                  onChange={(value) => handleInputChange('skpdRequestLetter', value)}
                  placeholder={"Upload Surat Permohonan SKPD"}
                />
                <DynamicInput
                  label={"Lampiran KAK"}
                  value={inputData.kakAttachment}
                  type={'file_upload'}
                  onChange={(value) => handleInputChange('kakAttachment', value)}
                  placeholder={"Upload Lampiran KAK"}
                />
                <DynamicInput
                  label={"Apakah pembangunan aplikasi terdapat dalam PETA Rencana SPBE OPD?"}
                  value={inputData.spbePlan || ''}
                  type={'radio_button'}
                  options={[
                    { label: 'Ya', value: 'Yes' },
                    { label: 'Tidak', value: 'No' }
                  ]}
                  onChange={(value) => handleInputChange('spbePlan', value)}
                  placeholder={"Pilih Ya atau Tidak"}
                />
                <DynamicInput
                  label={"Apakah sudah dilaksanakan manajemen risiko SPBE?"}
                  value={inputData.riskManagement || ''}
                  type={'radio_button'}
                  options={[
                    { label: 'Ya', value: 'Yes' },
                    { label: 'Tidak', value: 'No' }
                  ]}
                  onChange={(value) => handleInputChange('riskManagement', value)}
                  placeholder={"Pilih Ya atau Tidak"}
                />
                <DynamicInput
                  label={"Pembangunan aplikasi termasuk dalam Reformasi Birokrasi (RB) Tematik?"}
                  value={inputData.reformasiBirokrasi || ''}
                  type={'selection'}
                  options={[
                    { label: 'Penanggulangan Kemiskinan', value: 'Poverty Alleviation' },
                    { label: 'Peningkatan Investasi', value: 'Investment Improvement' },
                    { label: 'Percepatan Prioritas Aktual Presiden', value: 'Presidential Priority Acceleration' },
                    { label: 'Digitalisasi Administrasi Pemerintahan', value: 'Government Administration Digitalization' }
                  ]}
                  onChange={(value) => handleInputChange('reformasiBirokrasi', value)}
                  placeholder={"Pilih Kategori Reformasi Birokrasi"}
                />
              </div>
            }

            <div className="flex flex-row gap-2 justify-end">
              {stepper > 1 &&
                <DynamicButton
                  initialValue={"Sebelumnya"}
                  type="fill"
                  color={"#ffffff"}
                  className="inline-flex bg-cardLight dark:bg-cardDark text-cardDark dark:text-cardLight"
                  onClick={() => {
                    setStepper(stepper - 1);
                  }}
                />
              }<DynamicButton
                initialValue={stepper === 4 ? 'Ajukan Permohonan' : "Selanjutnya"}
                type="fill"
                color={"#ffffff"}
                className="inline-flex  bg-[#0185FF] text-darkColor"
                onClick={() => {
                  checkingFormData(inputData);
                }}
              />
            </div>
          </div>
        </div>
        {/* {JSON.stringify(inputData)} */}
      </section>
      <ModalContent
        className={"sm:max-w-xl"}
        children={
          <div className="flex flex-col gap-2">
            <div className="flex flex-col items-center justify-center ">
              {isModalVerif.data?.icon && (
                <isModalVerif.data.icon
                  className={`flex flex-col flex-1 max-w-[150%] aspect-square bg-[${isModalVerif.data.color}] rounded-full`}
                />
              )}
            </div>
            <div className="flex  flex-col items-center justify-center ">
              <span className="text-lg font-bold">
                {isModalVerif.data?.title}
              </span>
              <span className="text-sm font-light opacity-70">
                {isModalVerif.data?.msg}
              </span>
            </div>
            <div className="flex flex-col gap-2 ">
              <DynamicButton
                initialValue={"Kembali"}
                type="fill"
                color={"#ffffff"}
                className={`inline-flex flex-1 bg-[${isModalVerif.data.color}] text-darkColor`}
                onClick={() => {
                  // setisModalVerif({ data: {}, status: false });
                  navigate("/layanan-pengelolaan-sistem-informasi-dan-keamanan-jaringan", { state: 'Permohonan Sistem Informasi' });
                }}
              />
            </div>
          </div>
        }
        active={isModalVerif.status}
      />
    </div>
  );
}

export default CreateAplikasiPages;
