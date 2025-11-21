import { supabase } from "../services/supabaseClient.js";
import { errorResponse, successResponse } from "../utils/response.js";

const TABLE = "notifications";

export const getTodayNotifications = async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .eq("healthWorkerId", req.user.id)
      .gte("createdAt", startOfDay.toISOString())
      .lte("createdAt", endOfDay.toISOString())
      .order("createdAt", { ascending: false });

    if (error) {
      console.error(error);
      return errorResponse(res, "Failed to fetch notifications", 500, error);
    }

    return successResponse(res, data);
  } catch (err) {
    console.error(err);
    return errorResponse(res, "Unexpected error fetching notifications", 500);
  }
};

