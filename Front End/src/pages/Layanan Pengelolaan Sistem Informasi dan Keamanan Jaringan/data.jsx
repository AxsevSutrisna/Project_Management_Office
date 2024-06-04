export const formData = [
  {
    name: "Pengajuan User Akun Sistem Informasi",
    type: "Pengajuan Layanan Pengelolaan Sistem Informasi dan Keamanan Jaringan",
    role: [
      "op_pmo",
      "perangkat_daerah",
      "kabid_aplikasi",
      "katim_aplikasi",
      "teknis_aplikasi",
    ],
    fields: [
      { name: "name_pic", label: "Name PIC", value: "", type: "text" },
      { name: "telp_pic", label: "Nomor PIC", value: "", type: "tel" },
      {
        name: "submission_type",
        label: "Jenis Pengajuan",
        value: [],
        type: "selection",
        options: [
          {
            value: "reset_password",
            label: "Reset Password",
          },
          {
            value: "new_account",
            label: "Pembuatan Akun Baru",
          },
        ],
        field: [
          {
            name: "password",
            label: "Password Lama",
            value: "",
            type: "password",
            type_select: "reset_password",
          },
          {
            name: "new_password",
            label: "Password Baru",
            value: "",
            type: "password",
            type_select: "reset_password",
          },
          {
            name: "repeat_password",
            label: "Ulangi Password",
            value: "",
            type: "password",
            type_select: "reset_password",
          },
          {
            name: "account_type",
            label: "Jenis Akun",
            value: [],
            type: "selection",
            type_select: "new_account",
            options: [
              { value: "account_1", label: "Akun 1" },
              { value: "account_2", label: "Akun 2" },
            ],
          },
        ],
      },
      {
        name: "reason",
        label: "Alasan Pengajuan",
        value: "",
        type: "editor",
      },
    ],
  },
  {

    name: "Pengajuan Integrasi Sistem Informasi",
    type: "Pengajuan Layanan Pengelolaan Sistem Informasi dan Keamanan Jaringan",
    role: [
      "op_pmo",
      "perangkat_daerah",
      "kabid_aplikasi",
      "katim_aplikasi",
      "teknis_aplikasi",
    ],
    fields: [
      { name: "name_pic", label: "Name PIC", value: "", type: "text" },
      { name: "telp_pic", label: "Nomor PIC", value: "", type: "tel" },
      {
        name: "app_name",
        label: "Nama Aplikasi",
        value: [],
        type: "selection",
        options: [
          { value: "15", label: "15 Mbps" },
          { value: "20", label: "20 Mbps" },
          { value: "25", label: "25 Mbps" },
          { value: "30", label: "30 Mbps" },
        ]
      },
      {
        name: "app_desc",
        label: "Deskripsi Aplikasi",
        value: "",
        type: "editor",
      },
      {
        name: "needed_data",
        label: "Data Yang di Butuhkan",
        value: "",
        type: "editor",
      },
      {
        name: "integration",
        label: "Tujuan Integrasi",
        value: "",
        type: "editor",
      },
    ],
  },
  {
    name: "Pengajuan Penerapan Modul TTE",
    type: "Pengajuan Layanan Pengelolaan Sistem Informasi dan Keamanan Jaringan",
    role: [
      "op_pmo",
      "perangkat_daerah",
      "kabid_aplikasi",
      "katim_aplikasi",
      "teknis_aplikasi",
    ],
    fields: [
      { name: "name_pic", label: "Name PIC", value: "", type: "text" },
      { name: "telp_pic", label: "Nomor PIC", value: "", type: "tel" },
      {
        name: "app_name",
        label: "Nama Aplikasi",
        value: [],
        type: "selection",
        options: [
          { value: "15", label: "15 Mbps" },
          { value: "20", label: "20 Mbps" },
          { value: "25", label: "25 Mbps" },
          { value: "30", label: "30 Mbps" },
        ]
      },
      {
        name: "app_desc",
        label: "Deskripsi Aplikasi",
        value: "",
        type: "editor",
      },
      {
        name: "reason",
        label: "Alasan Pengajuan",
        value: "",
        type: "editor",
      },
      {
        name: "file_process_bisiness",
        label: "Dokumen Proses Bisnis",
        value: "",
        type: "file_upload"
      },
      {
        name: "period",
        label: "Jadwal Penerapan",
        value: {
          startDate: null,
          endDate: null,
        },
        type: "date",
        visible: true,
      }
    ],
  },
]

// Integrasi
const getIntergasiSIProcess = (inputLocal) => [
  {
    label: "Upload File Hasil Integrasi",
    value: inputLocal.upload_dokumen_hasil_integrasi,
    type: "file_upload",
    name: 'upload_dokumen_hasil_integrasi'
  },
];
const getIntergasiSIFinish = (finishData) => [
  {
    label: "Status Pengajuan",
    value: finishData.submission_status,
    name: "submission_status",
    type: "radio_button",
    options: [
      { value: "1", label: "Menyetujui" },
      { value: "0", label: "Tidak Menyetujui" }
    ]
  },
  {
    label: "Upload Surat Pemberitahuan untuk OPD",
    value: finishData.file_submission,
    name: 'file_submission',
    type: "file_upload"
  },
  {
    label: "Tanggapan",
    value: finishData.response || null,
    type: "textarea",
    name: 'response'
  }
];

// Penerapan Modul TTE
const getModulTTEProcess = (inputLocal) => [
  {
    label: "Upload Surat Pengesahan",
    value: inputLocal.upload_dokumen_laporan_modul_tte,
    type: "file_upload",
    name: 'upload_dokumen_laporan_modul_tte'
  },
];

const getModulTTEFinish = (finishData) => [
  {
    label: "Status Pengajuan",
    value: finishData.submission_status,
    name: "submission_status",
    type: "radio_button",
    options: [
      { value: "1", label: "Menyetujui" },
      { value: "0", label: "Tidak Menyetujui" }
    ]
  },
  {
    label: "Upload Surat Pemberitahuan untuk OPD",
    value: finishData.file_submission,
    name: 'file_submission',
    type: "file_upload"
  },
  {
    label: "Tanggapan",
    value: finishData.response || null,
    type: "textarea",
    name: 'response'
  }
];

// User Account SI
const getUserAccountSIProcess = (inputLocal) => [
  {
    label: "Upload Dokumen Laporan Hasil Pembuatan Akun",
    value: inputLocal.upload_dokumen_laporan_pembuatan_akun,
    type: "file_upload",
    name: 'upload_dokumen_laporan_pembuatan_akun'
  },
];

const getUserAccountSIFinish = (finishData) => [
  {
    label: "Status Pengajuan",
    value: finishData.submission_status,
    name: "submission_status",
    type: "radio_button",
    options: [
      { value: "1", label: "Menyetujui" },
      { value: "0", label: "Tidak Menyetujui" }
    ]
  },
  {
    label: "Upload Surat Pemberitahuan untuk OPD",
    value: finishData.file_submission,
    name: 'file_submission',
    type: "file_upload"
  },
  {
    label: "Tanggapan",
    value: finishData.response || null,
    type: "textarea",
    name: 'response'
  }
];


export {
  getIntergasiSIProcess, getIntergasiSIFinish, getModulTTEProcess, getModulTTEFinish, getUserAccountSIProcess, getUserAccountSIFinish
};
