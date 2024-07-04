import React, { useState } from "react";
import { toast } from "react-toastify";
import { ReactComponent as PengajuanBerahasilIcon } from "../../../assets/icon/ic_pengajuan_berhasil.svg";
import DynamicButton from "../../../components/common/DynamicButton";
import DynamicInput from "../../../components/common/DynamicInput";
import DynamicShow from "../../../components/common/DynamicShow";
import DynamicDetails from "../../../components/ui/DynamicDetails";
import { apiClient } from "../../../utils/api/apiClient";
import { validateFile, validateImage } from "../../../utils/helpers/validateForm";
import { getIntergasiSIFinish, getIntergasiSIProcess, getModulTTEProcess, getModulTTEFinish, getUserAccountSIProcess, getUserAccountSIFinish, getEmailProcess, getEmailFinish, getCelahKeamananProcess, getCelahKeamananFinish } from "../data";

const ProcessStatus = ({
    submissionStatus,
    validationData,
    processData,
    authProfile,
    slug,
    setisModalVerif,
    checkingFormData,
    detailData,
    loading,
    finishData, setfinishData,
}) => {

    const [inputLocal, setInputLocal] = useState({});

    const IntergasiSIProcess = getIntergasiSIProcess(inputLocal);

    const IntergasiSIFinish = getIntergasiSIFinish(finishData);

    const ModulTTEProcess = getModulTTEProcess(inputLocal);

    const ModulTTEFinish = getModulTTEFinish(finishData);

    const UserAkunSIProcess = getUserAccountSIProcess(inputLocal);

    const UserAkunSIFinish = getUserAccountSIFinish(finishData);

    const EmailProcess = getEmailProcess(inputLocal);

    const EmailFinish = getEmailFinish(finishData);

    const CelahKeamananProcess = getCelahKeamananProcess (inputLocal);

    const CelahKeamananFinish = getCelahKeamananFinish (finishData);

    const fetchSetProgress = async (api_key, token, status) => {
        const params = new URLSearchParams();
        params.append("id", slug);
        params.append("status", status);

        try {
            const response = await apiClient({
                baseurl: "aplikasi/set_process",
                method: "POST",
                body: params,
                apiKey: api_key,
                token: token,
            });
            if (response?.statusCode === 200) {
                setisModalVerif({
                    data: {
                        title: 'aplikasi Berhasil diupdate',
                        msg: 'Selamat, Pengajuan aplikasi sudah diupdate',
                        icon: PengajuanBerahasilIcon,
                        color: '#13C39C'
                    },
                    status: true
                })
            } else {
                toast.error(response.result.msg, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const renderProcessInputs = (inputs) => {
        return inputs.map((inputProps, index) => (
            <div className="flex flex-row gap-2" key={index}>
                <div className="flex flex-1">
                    <DynamicInput
                        key={index}
                        label={inputProps.label}
                        value={inputProps.value}
                        type={inputProps.type}
                        options={inputProps.options}
                        onChange={(value) => {
                            setInputLocal(prevState => ({
                                ...prevState,
                                [inputProps.name]: value
                            }));
                        }}
                    />
                </div>
            </div>
        ));
    };

    const renderFinishInputs = (inputs) => {
        return inputs.map((inputProps, index) => (
            <DynamicInput
                key={index}
                label={inputProps.label}
                value={inputProps.value}
                type={inputProps.type}
                options={inputProps.options}
                onChange={(value) => {
                    setfinishData(prevState => ({
                        ...prevState,
                        [inputProps.name]: value
                    }));
                }}
            />
        ));
    };
    return (
        submissionStatus === 6 && (JSON.parse(authProfile)?.role === "teknis_aplikasi" || JSON.parse(authProfile)?.role === "katim_aplikasi" ?
            <div className="flex flex-col gap-3">
                {JSON.parse(authProfile)?.role === "teknis_aplikasi" && (
                    Object.entries(processData).length === 0 ?
                        <div className="flex flex-1 flex-col gap-3 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
                            <span className='text-lg font-bold'>Tahapan Proses</span>
                            {Object.entries(validationData).map(([key, value]) => (
                                key === "working_schedule" &&
                                <DynamicShow
                                    key={key}
                                    label={key === "working_schedule" ? "Jadwal Kerja" : key === "file_scema_integration" ? "File Skema Integrasi" : key}
                                    value={value}
                                    type={"working_schedule" ? "multidate" : 'text'}
                                />
                            ))}
                            {renderProcessInputs(detailData.submission_title === "Integrasi Sistem Informasi" ?
                                IntergasiSIProcess : 
                                detailData.submission_title === "Penerapan Modul TTE" ? ModulTTEProcess : 
                                detailData.submission_title === "User Akun Sistem Informasi" ? UserAkunSIProcess :
                                detailData.submission_title === "Permohonan Email" ? EmailProcess :
                                detailData.submission_title === "Permohonan Pengujian Celah Keamanan" ?  CelahKeamananProcess :
                                []

                            )}
                            <div className='flex sm:flex-row flex-col gap-2'>
                                <DynamicButton
                                    initialValue={"Lapor Proses Teknis ke Ketua Tim Teknis"}
                                    type="fill"
                                    color={"#ffffff"}
                                    className="inline-flex  bg-[#0185FF] text-darkColor"
                                    onClick={() => {
                                        const result = {
                                            ...inputLocal,
                                        };

                                        const filteredDataResult = Object.fromEntries(
                                            Object.entries(result).filter(([_, value]) => {
                                                return value !== undefined && value !== null && value !== '' && !(Array.isArray(value) && value.length === 0);
                                            })
                                        );

                                        let isValid = true;

                                        if (detailData.submission_title === "Integrasi Sistem Informasi") {
                                            isValid = isValid && validateFile(inputLocal.upload_dokumen_hasil_integrasi, "Upload File Dokumen Hasil Integrasi");
                                        }
                                        if (detailData.submission_title === "Penerapan Modul TTE") {
                                            isValid = isValid && validateFile(inputLocal.upload_dokumen_laporan_modul_tte, "Upload Surat Pengesahan");
                                        }
                                        if (detailData.submission_title === "User Akun Sistem Informasi") {
                                            isValid = isValid && validateFile(inputLocal.upload_dokumen_laporan_pembuatan_akun, "Upload Dokumen Laporan Hasil Pembuatan Akun");
                                        }
                                        if (detailData.submission_title === "Permohonan Email") {
                                            isValid = isValid && validateFile(inputLocal.upload_surat_pengesahan, "Upload Surat Pengesahan");
                                        } if (detailData.submission_title === "Permohonan Pengujian Celah Keamanan") {
                                            isValid = isValid && validateFile(inputLocal.upload_dokumen_pengujian_celah_keamanan, "Upload Surat Pengesahan");
                                        }
                                        if (detailData.submission_title === "Permohonan Pengujian Celah Keamanan") {
                                            isValid = isValid && validateFile(inputLocal.upload_hasil_pengujian, "Unggah Dokumen Laporan Hasil Pengujian");
                                            isValid = isValid && validateFile(inputLocal.upload_hasil_penetrasi, "Unggah Dokumen Hasil Uji Penetrasi");
                                        }
                                        if (isValid) {
                                            checkingFormData('process', filteredDataResult);
                                        }
                                    }}

                                />
                            </div>
                        </div> :
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col bg-[#0185FF]/10 border-1 border-[#0185FF] text-[#0185FF] p-3 gap-3 items-center rounded-lg">
                                <span className="text-base font-semibold text-center">
                                    Laporan sudah dikirim ke Ketua Tim Teknis
                                </span>
                            </div>
                            <div className="flex flex-1 flex-col gap-3 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
                                <span className='text-lg font-bold'>Tahapan Proses</span>
                                {Object.entries(validationData).map(([key, value]) => (
                                    key === "working_schedule" &&
                                    <DynamicShow
                                        key={key}
                                        label={key === "working_schedule" ? "Jadwal Kerja" : key === "file_scema_integration" ? "File Skema Integrasi" : key}
                                        value={value}
                                        type={"working_schedule" ? "multidate" : 'text'}
                                    />
                                ))}
                                {Object.entries(processData).map(([key, value]) => (
                                    <DynamicShow
                                        key={key}
                                        label={
                                            key === "file_scema_integration" ? "File Dokumen Hasil Integrasi" :
                                            key === "upload_dokumen_laporan_modul_tte" ? "Surat Pengesahan" :
                                            key === "upload_dokumen_laporan_pembuatan_akun" ? "Upload Dokumen Laporan Hasil Pembuatan Akun" :
                                            key === "upload_surat_pengesahan" ? "Surat Pengesahan" :
                                            key === "upload_hasil_pengujian" ? "Dokumen Laporan Hasil Pengujian" :
                                            key === "upload_hasil_penetrasi" ? "Dokumen Hasil Uji Penetrasi" :
                                            key === "file_scema_integration" ? "File Skema Integrasi" : 
                                            key
                                        }
                                        value={value}
                                        location={"aplikasi"}
                                        type={
                                            key === "file_scema_integration" || "upload_dokumen_laporan_modul_tte" || 
                                            "upload_dokumen_laporan_pembuatan_akun" || "upload_surat_pengesahan" ||
                                            "upload_hasil_pengujian" || "upload_hasil_penetrasi"
                                                ? "pdf"
                                                : "text"
                                        }
                                    />
                                ))}
                            </div>
                        </div>
                )}
                {JSON.parse(authProfile)?.role === "katim_aplikasi" && (
                    Object.entries(processData).length !== 0 ?
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-1 flex-col gap-3 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
                                <span className='text-lg font-bold'>Tahapan Proses</span>
                                {Object.entries(validationData).map(([key, value]) => (
                                    key === "working_schedule" &&
                                    <DynamicShow
                                        key={key}
                                        label={key === "working_schedule" ? "Jadwal Kerja" : key === "file_scema_integration" ? "File Skema Integrasi" : key}
                                        value={value}
                                        type={"working_schedule" ? "multidate" : 'text'}
                                    />
                                ))}
                                {Object.entries(processData).map(([key, value]) => (
                                    <DynamicShow
                                    key={key}
                                    label={
                                        key === "file_scema_integration" ? "File Dokumen Hasil Integrasi" :
                                        key === "upload_dokumen_laporan_modul_tte" ? "Surat Pengesahan" :
                                        key === "upload_dokumen_laporan_pembuatan_akun" ? "Upload Dokumen Laporan Hasil Pembuatan Akun" :
                                        key === "upload_surat_pengesahan" ? "Surat Pengesahan" :
                                        key === "upload_hasil_pengujian" ? "Dokumen Laporan Hasil Pengujian" :
                                        key === "upload_hasil_penetrasi" ? "Dokumen Hasil Uji Penetrasi" :
                                        key === "file_scema_integration" ? "File Skema Integrasi" : 
                                        key
                                    }
                                    value={value}
                                    location={"aplikasi"}
                                    type={
                                        key === "file_scema_integration" || "upload_dokumen_laporan_modul_tte" || 
                                        "upload_dokumen_laporan_pembuatan_akun" || "upload_surat_pengesahan" ||
                                        "upload_hasil_pengujian" || "upload_hasil_penetrasi"
                                            ? "pdf"
                                            : "text"
                                    }
                                />
                                ))}
                            </div>
                            <div className="flex flex-1 flex-col gap-3 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
                                <span className='text-lg font-bold'>Proses Selesai</span>
                                {renderFinishInputs(detailData.submission_title === "Integrasi Sistem Informasi" ?
                                    IntergasiSIFinish :
                                    detailData.submission_title === "Penerapan Modul TTE" ? ModulTTEFinish :
                                    detailData.submission_title === "User Akun Sistem Informasi" ? UserAkunSIFinish :
                                    detailData.submission_title === "Permohonan Email" ? EmailFinish :
                                    detailData.submission_title === "Permohonan Pengujian Celah Keamanan" ? CelahKeamananFinish :
                                    []
                                )}
                                <DynamicButton
                                    initialValue={"Pengajuan Selesai"}
                                    type="fill"
                                    color={"#ffffff"}
                                    className="inline-flex  bg-[#0185FF] text-darkColor"
                                    onClick={() => {
                                        if (finishData?.response === undefined) {
                                            toast.error('Wajib masukan Tanggapan', {
                                                position: toast.POSITION.TOP_RIGHT,
                                            });
                                        } else {
                                            checkingFormData('finish', finishData);
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        :
                        <div className="flex flex-col bg-[#0185FF]/10 border-1 border-[#0185FF] text-[#0185FF] p-3 gap-3 items-center rounded-lg">
                            <span className="text-base font-semibold text-center">
                                Menunggu Laporan dari Anggota Tim Teknis
                            </span>
                        </div>

                )}
                <DynamicDetails

                    location={'aplikasi'}
                    detailData={detailData}
                    loading={loading}
                />
            </div>
            :
            <div className='flex flex-col lg:flex-row gap-3'>
                <div className="flex flex-col flex-1 gap-3">
                    {Object.entries(processData).length === 0 ?
                        <div className="flex flex-col bg-lightColor dark:bg-cardDark p-5 gap-3 items-center rounded-lg">
                            <img
                                src={require('../../../assets/image/process.gif')}
                                alt={'processing'}
                                className="object-contain flex w-[20%] min-w-[200px] aspect-square"
                                effect="blur"
                            />
                            <span className="text-base text-center">
                                Pengajuan Sedang <b>Di Proses</b> Perbaikan
                            </span>
                        </div>
                        :
                        <div className="flex  flex-col gap-3 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
                            <span className='text-lg font-bold'>Tahapan Proses</span>
                            {Object.entries(validationData).map(([key, value]) => (
                                key === "working_schedule" &&
                                <DynamicShow
                                    key={key}
                                    label={key === "working_schedule" ? "Jadwal Kerja" : key === "file_scema_integration" ? "File Skema Integrasi" : key}
                                    value={value}
                                    type={"working_schedule" ? "multidate" : 'text'}
                                />
                            ))}
                            {Object.entries(processData).map(([key, value]) => (
                                <DynamicShow
                                    key={key}
                                    label={
                                        key === "upload_dokumen_hasil_integrasi"
                                        ? "File Dokumen Hasil Integrasi"
                                        : "upload_dokumen_laporan_modul_tte"
                                        ? "Surat Pengesahan"
                                        : "upload_dokumen_laporan_pembuatan_akun"
                                        ? "Upload Dokumen Laporan Hasil Pembuatan Akun"
                                        : "upload_surat_pengesahan"
                                        ? "Surat Pengesahan"
                                        : "upload_hasil_pengujian"
                                        ? "Dokumen Laporan Hasil Pengujian"
                                        : "upload_hasil_penetrasi"
                                        ? "Dokumen Hasil Uji Penetrasi"
                                        :
                                        key === "file_scema_integration" ? "File Skema Integrasi" : key
                                    }
                                    value={value}
                                    location={"aplikasi"}
                                    type={
                                        key === "upload_dokumen_hasil_integrasi" || "upload_dokumen_laporan_modul_tte" || 
                                        "upload_dokumen_laporan_pembuatan_akun" || "upload_surat_pengesahan" ||
                                        "upload_hasil_pengujian" || "upload_hasil_penetrasi"
                                            ? "pdf"
                                            : "text"
                                    }
                                />
                            ))}
                        </div>
                    }
                </div>
                <DynamicDetails location={"aplikasi"} detailData={detailData} loading={loading} />
            </div>
        )
    );
};

export default ProcessStatus;
