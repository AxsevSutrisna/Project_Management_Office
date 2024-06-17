import { validateArray, validateFile, validateFullname, validateHTML, validatePassword, validatePeriod, validatePeriod1, validateRadioBottom, validateRepeatPassword, validateTelp, validateText, validateTextArea } from "../../utils/helpers/validateForm";


export const isValidatorUserAccountSI = (obj) => {
  let isValid = true;
  isValid = isValid && validateFullname(obj.name_pic, "Nama PIC");
  isValid = isValid && validateTelp(obj.telp_pic, "Nomor PIC");
  isValid = isValid && validateHTML(obj.reason, "Alasan Pengajuan");
  isValid = isValid && validateArray(obj.submission_type_user_account, "Jenis Pengajuan");


  if (obj.submission_type_user_account === 'reset_password') {
    isValid = isValid && validatePassword(obj.password, "Password Lama");
    isValid = isValid && validatePassword(obj.new_password, "Password Lama");
    isValid = isValid && validateRepeatPassword(obj.new_password, obj.repeat_password);
  } else if (obj.submission_type_user_account === 'new_account') {
    isValid = isValid && validateArray(obj.account_type, "Jenis Akun");

  }
  return isValid;
};
export const isValidatorPenerapanModulTTE = (obj) => {
  let isValid = true;
  isValid = isValid && validateFullname(obj.name_pic, "Nama PIC");
  isValid = isValid && validateTelp(obj.telp_pic, "Nomor PIC");
  isValid = isValid && validateArray(obj.app_name, "Nama Aplikasi");
  isValid = isValid && validateHTML(obj.app_desc, "Deskripsi Aplikasi");
  isValid = isValid && validateHTML(obj.reason, "Alasan Pengajuan");
  isValid = isValid && validateFile(obj.file_process_bisiness, 'Dokumen Proses Bisnis');
  isValid = isValid && validatePeriod1(obj.period, 'Jadwal Penerapan');

  return isValid;
};

export const isValidatorIntegrasi = (obj) => {
  let isValid = true;
  isValid = isValid && validateFullname(obj.name_pic, "Nama PIC");
  isValid = isValid && validateTelp(obj.telp_pic, "Nomor PIC");
  isValid = isValid && validateArray(obj.app_name, "Nama Aplikasi");
  isValid = isValid && validateHTML(obj.app_desc, "Deskripsi Aplikasi");
  isValid = isValid && validateHTML(obj.needed_data, "Data Yang di Butuhkan");
  isValid = isValid && validateHTML(obj.integration, "Tujuan Integrasi");

  return isValid;
};
