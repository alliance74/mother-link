import { supabase } from "../services/supabaseClient.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { signToken } from "../utils/jwt.js";
import { errorResponse, successResponse } from "../utils/response.js";

const TABLE = "mobile_health_workers";

export const registerHealthWorker = async (req, res) => {
  try {
    const {
      email,
      nationalId,
      chwId,
      password,
      fullName,
      gender,
      cell,
      village,
      district,
      sector,
      phoneNumber,
      dateJoined,
      status,
    } = req.body;

    const existingEmail = await supabase.from(TABLE).select("id").eq("email", email).maybeSingle();
    if (existingEmail.data) {
      return errorResponse(res, "Email already registered", 409);
    }

    const existingNationalId = await supabase
      .from(TABLE)
      .select("id")
      .eq("nationalId", nationalId)
      .maybeSingle();
    if (existingNationalId.data) {
      return errorResponse(res, "nationalId already registered", 409);
    }

    const existingChwId = await supabase.from(TABLE).select("id").eq("chwId", chwId).maybeSingle();
    if (existingChwId.data) {
      return errorResponse(res, "chwId already registered", 409);
    }

    const passwordHash = await hashPassword(password);

    const { data, error } = await supabase
      .from(TABLE)
      .insert({
        email,
        nationalId,
        chwId,
        fullName,
        gender,
        cell,
        village,
        district,
        sector,
        phoneNumber,
        dateJoined,
        status,
        password_hash: passwordHash,
      })
      .select()
      .single();

    if (error) {
      console.error(error);
      return errorResponse(res, "Failed to register health worker", 500, error);
    }

    const token = signToken({ id: data.id, chwId: data.chwId, email: data.email });
    const { password_hash, ...cleanData } = data;

    return successResponse(
      res,
      { worker: cleanData, accessToken: token },
      "Health worker registered successfully",
      201
    );
  } catch (err) {
    console.error(err);
    return errorResponse(res, "Unexpected error during registration", 500);
  }
};

export const loginHealthWorker = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .eq("email", email)
      .single();

    if (error || !data) {
      return errorResponse(res, "Invalid credentials", 401);
    }

    const isValid = await comparePassword(password, data.password_hash);
    if (!isValid) {
      return errorResponse(res, "Invalid credentials", 401);
    }

    const token = signToken({ id: data.id, chwId: data.chwId, email: data.email });
    const { password_hash, ...cleanData } = data;

    return successResponse(res, { worker: cleanData, accessToken: token }, "Login successful");
  } catch (err) {
    console.error(err);
    return errorResponse(res, "Unexpected error during login", 500);
  }
};

