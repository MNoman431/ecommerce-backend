import multer from "multer";
// Memory storage -> direct buffer me file aayegi, local save nahi hogi
const storage = multer.memoryStorage();

export const upload = multer({ storage });
