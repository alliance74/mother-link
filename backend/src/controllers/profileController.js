import { supabase } from "../services/supabaseClient.js";
import { errorResponse, successResponse } from "../utils/response.js";

const TABLE = "mobile_health_workers";

export const updateProfile = async (req, res) => {
  try {
    const updates = { ...req.body };
    if ("password" in updates) {
      delete updates.password;
    }

    const { data, error } = await supabase
      .from(TABLE)
      .update(updates)
      .eq("id", req.user.id)
      .select()
      .single();

    if (error || !data) {
      return errorResponse(res, "Failed to update profile", 400, error);
    }

    const { password_hash, ...cleanData } = data;
    return successResponse(res, cleanData, "Profile updated");
  } catch (err) {
    console.error(err);
    return errorResponse(res, "Unexpected error updating profile", 500);
  }
};

