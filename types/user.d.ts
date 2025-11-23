interface IUserData {
  // id: string; // ใช้สำหรับ CRUD
  key: string; // ใช้สำหรับ Antd Table
  title: string; // Mr / Mrs / Ms
  firstname: string;
  lastname: string;
  birthday: string; // YYYY-MM-DD
  nationality: string;

  citizenId: string; // รวม 1–4 ช่อง เป็นเลขเดียว
  gender: string; // male / female / unsex

  mobile_prefix: string; // +66 / +84 / +86 etc.
  phone: string; // 0912345678
  passport?: string; // optional

  expectedSalary: string; // string หรือ number ก็ได้
}

interface TitlePageProps {
  name: string;
}
