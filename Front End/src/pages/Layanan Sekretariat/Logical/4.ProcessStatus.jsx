
import React, { useState } from "react";
import { toast } from "react-toastify";
import DynamicButton from "../../../components/common/DynamicButton";
import DynamicInput from "../../../components/common/DynamicInput";
import DynamicShow from "../../../components/common/DynamicShow";
import { validateFile, validateImage } from "../../../utils/helpers/validateForm";
import DynamicDetails from "../DynamicDetails";
import { getMagangFinish, getMagangProcess, getPendataanTenagaAhliFinish, getPendataanTenagaAhliProcess } from "../data";

const ProcessStatus = ({
    submissionStatus,
    validationDataTechnique,
    processData,
    authProfile,
    checkingFormData,
    detailData,
    loading,
    finishData, setfinishData,
}) => {

    const [inputLocal, setInputLocal] = useState({});
    const MagangProcess = getMagangProcess(inputLocal);
    const MagangFinish = getMagangFinish(finishData);

    const PendataanTenagaAhliProcess = getPendataanTenagaAhliProcess(inputLocal);
    const PendataanTenagaAhliFinish = getPendataanTenagaAhliFinish(finishData);

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
        <>
            {submissionStatus === 6 &&
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-2 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
                        <div className="flex flex-row gap-2 items-center">
                            <span className="text-lg font-bold">Status Validasi Kelengkapan :</span>
                            <div
                                className={`flex flex-row gap-2 p-1 px-3 rounded-md text-darkColor bg-[#0185FF]`}
                            >
                                <span className="text-base">
                                    Disetujui
                                </span>
                            </div>
                        </div>
                    </div>
                    {(JSON.parse(authProfile)?.role === "teknis_sekre" || JSON.parse(authProfile)?.role === "katim_sekre" ?
                        <div className="flex flex-col gap-3">
                            {JSON.parse(authProfile)?.role === "katim_sekre" && (
                                Object.entries(processData).length === 0 &&
                                <div className="flex flex-col bg-[#0185FF]/10 border-1 border-[#0185FF] text-[#0185FF] p-3 gap-3 items-center rounded-lg">
                                    <span className="text-base font-semibold text-center">
                                        Menunggu Laporan dari Anggota Tim Teknis
                                    </span>
                                </div>

                            )}
                            {JSON.parse(authProfile)?.role === "teknis_sekre" && (
                                Object.entries(processData).length !== 0 &&
                                <div className="flex flex-col gap-3">
                                    <div className="flex flex-1 flex-col gap-3 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
                                        <span className='text-lg font-bold'>Tahapan Proses</span>
                                        {Object.entries(processData).map(([key, value]) => (
                                            <DynamicShow
                                                key={key}
                                                label={
                                                    key === "upload_dokumen_hasil"
                                                        ? "Dokument Hasil"
                                                        : key
                                                }
                                                value={value}
                                                location={"sekretariat"}
                                                type={
                                                    key === "upload_dokumen_hasil"
                                                        ? "pdf"
                                                        : "text"
                                                }
                                            />
                                        ))}
                                    </div>
                                    <div className="flex flex-col bg-[#0185FF]/10 border-1 border-[#0185FF] text-[#0185FF] p-3 gap-3 items-center rounded-lg">
                                        <span className="text-base font-semibold text-center">
                                            Laporan sudah dikirim ke Ketua Tim Teknis
                                        </span>
                                    </div>
                                </div>
                            )}
                            <div className="flex flex-col-reverse lg:flex-row gap-3">
                                <div className="flex flex-1 flex-col gap-3">
                                    <div className="flex flex-col gap-2 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
                                        <div className="flex flex-row gap-2 items-center">
                                            <span className='text-lg font-bold'>Tahapan Validasi Kelengkapan</span>
                                        </div>
                                        {Object.entries(validationDataTechnique).map(([key, value]) => (
                                            <DynamicShow
                                                key={key}
                                                label={
                                                    key === "working_schedule"
                                                        ? "Jadwal Kerja"
                                                        : key === "team_response"
                                                            ? "Tanggapan dari Tim Teknis"
                                                            : key
                                                }
                                                value={value}
                                                location={"sekretariat"}
                                                type={
                                                    key === "working_schedule"
                                                        ? "multi_date"
                                                        : "text"
                                                }
                                            />
                                        ))}
                                    </div>
                                </div>
                                <DynamicDetails
                                    location={'sekretariat'}
                                    detailData={detailData}
                                    loading={loading}
                                />
                            </div>
                            {JSON.parse(authProfile)?.role === "teknis_sekre" && (
                                Object.entries(processData).length === 0 &&
                                <div className="flex flex-1 flex-col gap-3 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
                                    <span className='text-lg font-bold'>Tahapan Proses</span>
                                    {renderProcessInputs(detailData.submission_title === "Layanan Pendataan Tenaga Ahli" ?
                                        PendataanTenagaAhliProcess : detailData.submission_title === "Layanan Pendaftaran Magang" ?
                                            MagangProcess : []
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

                                                if (detailData.submission_title === "Layanan Pendataan Tenaga Ahli") {
                                                    isValid = isValid && validateFile(inputLocal.upload_dokumen_hasil, "Unggah Dokumen Laporan Hasil Pendataan Ahli");
                                                } if (isValid) {
                                                    checkingFormData('process', filteredDataResult);
                                                }
                                            }}

                                        />
                                    </div>
                                </div>
                            )}
                            {JSON.parse(authProfile)?.role === "katim_sekre" && (
                                Object.entries(processData).length !== 0 &&
                                <div className="flex flex-col gap-3">
                                    <div className="flex flex-1 flex-col gap-3 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
                                        <span className='text-lg font-bold'>Tahapan Proses</span>
                                        {Object.entries(processData).map(([key, value]) => (
                                            <DynamicShow
                                                key={key}
                                                label={
                                                    key === "upload_dokumen_hasil"
                                                        ? "Dokument Hasil Pendataan Ahli"
                                                        : key
                                                }
                                                value={value}
                                                location={"sekretariat"}
                                                type={
                                                    key === "upload_dokumen_hasil"
                                                        ? "pdf"
                                                        : "text"
                                                }
                                            />
                                        ))}
                                    </div>
                                    <div className="flex flex-1 flex-col gap-3 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
                                        <span className='text-lg font-bold'>Proses Selesai</span>
                                        {renderFinishInputs(detailData.submission_title === "Layanan Pendataan Tenaga Ahli" ?
                                            PendataanTenagaAhliFinish : detailData.submission_title === "Layanan Pendaftaran Magang" ?
                                                MagangFinish : []
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
                            )}
                        </div>
                        :
                        <div className='flex flex-col  gap-3'>
                            <DynamicDetails location={"sekretariat"} detailData={detailData} loading={loading} />
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
                                        {Object.entries(validationDataTechnique).map(([key, value]) => (
                                            key === "working_schedule" &&
                                            <DynamicShow
                                                key={key}
                                                label={key === "working_schedule" ? "Jadwal Kerja" : key === "file_scema_integration" ? "File Skema Integrasi" : key}
                                                value={value}
                                                type={"working_schedule" ? "multi_date" : 'text'}
                                            />
                                        ))}
                                        {Object.entries(processData).map(([key, value]) => (
                                            <DynamicShow
                                                key={key}
                                                label={
                                                    key === "upload_foto_alat_sebelum_di_relokasi"
                                                        ? "Foto Alat Sebelum Di Relokasikan"
                                                        : key === "upload_foto_alat_sesudah_di_relokasi"
                                                            ? "Foto Alat Sesudah Di Relokasikan"
                                                            : key === "upload_foto_alat_sebelum_di_tambahkan"
                                                                ? "Foto Alat Sebelum Di Tambahkan"
                                                                : key === "upload_foto_alat_sesudah_di_tambahkan"
                                                                    ? "Foto Alat Sesudah Di Tambahkan"
                                                                    : key === "upload_foto_kegiatan"
                                                                        ? "Foto Kegiatan"
                                                                        : key
                                                }
                                                value={value}
                                                location={"sekretariat"}
                                                type={
                                                    key === "upload_foto_alat_sebelum_di_relokasi" || key === "upload_foto_alat_sesudah_di_relokasi" || key === "upload_foto_alat_sebelum_di_tambahkan" || key === "upload_foto_alat_sesudah_di_tambahkan" || key === "upload_foto_kegiatan"
                                                        ? "images"
                                                        : "text"
                                                }
                                            />
                                        ))}
                                    </div>
                                }
                            </div>
                        </div>
                    )}
                </div>


            }
        </>
    );
};

export default ProcessStatus;
