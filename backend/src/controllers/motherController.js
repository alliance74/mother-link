import { supabase } from "../services/supabaseClient.js";
import { errorResponse, successResponse } from "../utils/response.js";

const TABLE = "mothers";

export const listMothers = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .eq("healthWorkerId", req.user.id);

    if (error) {
      console.error(error);
      return errorResponse(res, "Failed to fetch mothers", 500, error);
    }

    return successResponse(res, data);
  } catch (err) {
    console.error(err);
    return errorResponse(res, "Unexpected error fetching mothers", 500);
  }
};

export const totalMothers = async (req, res) => {
  try {
    const { count, error } = await supabase
      .from(TABLE)
      .select("*", { count: "exact", head: true })
      .eq("healthWorkerId", req.user.id);

    if (error) {
      console.error(error);
      return errorResponse(res, "Failed to compute total mothers", 500, error);
    }
    return successResponse(res, { total: count || 0 });
  } catch (err) {
    console.error(err);
    return errorResponse(res, "Unexpected error computing total", 500);
  }
};

export const createMother = async (req, res) => {
  try {
    const payload = { ...req.body, healthWorkerId: req.user.id };

    const { data, error } = await supabase.from(TABLE).insert(payload).select().single();
    if (error) {
      console.error(error);
      return errorResponse(res, "Failed to create mother", 500, error);
    }

    return successResponse(res, data, "Mother created", 201);
  } catch (err) {
    console.error(err);
    return errorResponse(res, "Unexpected error creating mother", 500);
  }
};

export const updateMother = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const { data, error } = await supabase
      .from(TABLE)
      .update(updates)
      .eq("id", id)
      .eq("healthWorkerId", req.user.id)
      .select()
      .single();

    if (error || !data) {
      return errorResponse(res, "Mother not found or update failed", 404, error);
    }

    return successResponse(res, data, "Mother updated");
  } catch (err) {
    console.error(err);
    return errorResponse(res, "Unexpected error updating mother", 500);
  }
};

export const deleteMother = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from(TABLE)
      .delete()
      .eq("id", id)
      .eq("healthWorkerId", req.user.id);

    if (error) {
      console.error(error);
      return errorResponse(res, "Failed to delete mother", 500, error);
    }

    return successResponse(res, null, "Mother deleted");
  } catch (err) {
    console.error(err);
    return errorResponse(res, "Unexpected error deleting mother", 500);
  }
};

