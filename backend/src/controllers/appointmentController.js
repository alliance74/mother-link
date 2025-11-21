import { supabase } from "../services/supabaseClient.js";
import { errorResponse, successResponse } from "../utils/response.js";

const TABLE = "appointments";

export const getUpcomingAppointments = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from(TABLE)
      .select(`
        *,
        mothers ( fullName )
      `)
      .eq("healthWorkerId", req.user.id)
      .gte("scheduledAt", new Date().toISOString())
      .order("scheduledAt", { ascending: true });

    if (error) {
      console.error(error);
      return errorResponse(res, "Failed to fetch appointments", 500, error);
    }

    // Flatten motherName for frontend convenience
    const flattened = data.map(appt => ({
      ...appt,
      motherName: appt.mothers?.fullName || null,
    }));

    return successResponse(res, flattened);
  } catch (err) {
    console.error(err);
    return errorResponse(res, "Unexpected error fetching appointments", 500);
  }
};

