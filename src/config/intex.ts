import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join((process.cwd(), ".env")) });

export default {
  payment_gateway_pk: process.env.PAYMENT_GATEWAY_PK,
};
