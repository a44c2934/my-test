import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UsersState {
  list: IUserData[];
}

const LOCAL_STORAGE_KEY = "users";
const MOCK_DATA: IUserData[] = [
  {
    key: "1",
    title: "Mrs.",
    firstname: "สมหญิง",
    lastname: "ใจงาม",
    birthday: "2025-11-19",
    nationality: "Thai",
    citizenId: "485564564565",
    gender: "female",
    mobile_prefix: "TH",
    phone: "0855665664",
    passport: "6531231313",
    expectedSalary: "50000",
  },
  {
    key: "2",
    title: "Mr.",
    firstname: "สมชาย",
    lastname: "บุญมี",
    birthday: "1993-04-12",
    nationality: "Thai",
    citizenId: "174998563214",
    gender: "male",
    mobile_prefix: "TH",
    phone: "0894567891",
    passport: "AN563212",
    expectedSalary: "42000",
  },
  {
    key: "3",
    title: "Ms.",
    firstname: "สุชาดา",
    lastname: "พรมมา",
    birthday: "1998-09-30",
    nationality: "Thai",
    citizenId: "335421123654",
    gender: "female",
    mobile_prefix: "TH",
    phone: "0812345678",
    passport: "BB223344",
    expectedSalary: "38000",
  },
  {
    key: "4",
    title: "Mr.",
    firstname: "John",
    lastname: "Miller",
    birthday: "1989-02-17",
    nationality: "American",
    citizenId: "",
    gender: "male",
    mobile_prefix: "US",
    phone: "2025550147",
    passport: "XJ9988221",
    expectedSalary: "90000",
  },
  {
    key: "5",
    title: "Mrs.",
    firstname: "Chanida",
    lastname: "Wong",
    birthday: "1992-07-08",
    nationality: "Thai",
    citizenId: "498563214785",
    gender: "female",
    mobile_prefix: "TH",
    phone: "0823345612",
    passport: "TH554433",
    expectedSalary: "48000",
  },
  {
    key: "6",
    title: "Mr.",
    firstname: "Arthit",
    lastname: "Kornchai",
    birthday: "1991-01-19",
    nationality: "Thai",
    citizenId: "126598745231",
    gender: "male",
    mobile_prefix: "TH",
    phone: "0869992311",
    passport: "TH112233",
    expectedSalary: "52000",
  },
  {
    key: "7",
    title: "Ms.",
    firstname: "May",
    lastname: "Tan",
    birthday: "1997-11-01",
    nationality: "Singaporean",
    citizenId: "",
    gender: "female",
    mobile_prefix: "SG",
    phone: "81234567",
    passport: "S3322115",
    expectedSalary: "75000",
  },
  {
    key: "8",
    title: "Miss",
    firstname: "ปาริชาติ",
    lastname: "เพชรดี",
    birthday: "2000-05-22",
    nationality: "Thai",
    citizenId: "789654123014",
    gender: "female",
    mobile_prefix: "TH",
    phone: "0908887766",
    passport: "PP991122",
    expectedSalary: "36000",
  },
  {
    key: "9",
    title: "Mr.",
    firstname: "Hiroshi",
    lastname: "Sato",
    birthday: "1988-03-15",
    nationality: "Japanese",
    citizenId: "",
    gender: "male",
    mobile_prefix: "JP",
    phone: "08044556677",
    passport: "JP445566",
    expectedSalary: "110000",
  },
  {
    key: "10",
    title: "Mrs.",
    firstname: "กัญญารัตน์",
    lastname: "ทองดี",
    birthday: "1995-09-11",
    nationality: "Thai",
    citizenId: "552314987654",
    gender: "female",
    mobile_prefix: "TH",
    phone: "0831122334",
    passport: "TH663399",
    expectedSalary: "40000",
  },
  {
    key: "11",
    title: "Mr.",
    firstname: "Ahmed",
    lastname: "Khalid",
    birthday: "1990-06-03",
    nationality: "UAE",
    citizenId: "",
    gender: "male",
    mobile_prefix: "AE",
    phone: "506667778",
    passport: "AE778899",
    expectedSalary: "130000",
  },
  {
    key: "12",
    title: "Ms.",
    firstname: "สุภาวดี",
    lastname: "คำสิงห์",
    birthday: "1999-12-01",
    nationality: "Thai",
    citizenId: "665544332211",
    gender: "female",
    mobile_prefix: "TH",
    phone: "0845566778",
    passport: "TH112299",
    expectedSalary: "37000",
  },
  {
    key: "13",
    title: "Mr.",
    firstname: "Kevin",
    lastname: "Brown",
    birthday: "1986-08-29",
    nationality: "British",
    citizenId: "",
    gender: "male",
    mobile_prefix: "GB",
    phone: "7440012234",
    passport: "UK998877",
    expectedSalary: "95000",
  },
];

const saveUsers = (users: IUserData[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));
};

const initialState: UsersState = {
  list: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<IUserData[]>) {
      state.list = action.payload;
      saveUsers(state.list);
    },
    loadFromLocalStorage(state) {
      if (typeof window !== "undefined") {
        const data = localStorage.getItem(LOCAL_STORAGE_KEY);

        if (data === null) {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(MOCK_DATA));
          console.log("No existing data. Added initial mock data.");
          return;
        }

        const parsed = JSON.parse(data);

        if (Array.isArray(parsed) && parsed.length === 0) {
          console.log("localStorage exists but is empty → do nothing.");
          state.list = [];
          return;
        }

        state.list = parsed;
        console.log("Loaded users from localStorage:", parsed);
      }
    },
    addUser(state, action: PayloadAction<Omit<IUserData, "key">>) {
      const newUser: IUserData = {
        ...action.payload,
        key: `user-${Date.now()}`,
      };
      state.list.push(newUser);
      saveUsers(state.list);
    },
    updateUser(state, action: PayloadAction<IUserData>) {
      const index = state.list.findIndex((u) => u.key === action.payload.key);
      if (index !== -1) {
        state.list[index] = action.payload;
        saveUsers(state.list);
      }
    },
    deleteUsers(state, action: PayloadAction<string[]>) {
      state.list = state.list.filter((u) => !action.payload.includes(u.key));
      saveUsers(state.list);
    },
  },
});

export const {
  setUsers,
  addUser,
  updateUser,
  deleteUsers,
  loadFromLocalStorage,
} = usersSlice.actions;
export default usersSlice.reducer;
