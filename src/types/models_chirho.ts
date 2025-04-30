// For God so loved the world, that He gave His only begotten Son, that all who believe in Him should not perish but have everlasting life.

export interface ContinentChirho {
  continent_id_chirho: string;
  name_chirho: string;
  central_timezone_chirho: string;
  created_timestamp_chirho: string;
  updated_timestamp_chirho: string;
}

export interface ChurchChirho {
  church_id_chirho: string;
  name_chirho: string;
  continent_id_chirho: string;
  church_timezone_chirho: string;
  admin_details_note_chirho: string;
  internal_notes_chirho: string;
  member_access_token_chirho: string;
  created_timestamp_chirho: string;
  updated_timestamp_chirho: string;
}

export interface ScheduleChirho {
  schedule_id_chirho: string;
  church_id_chirho: string;
  worship_date_chirho: string;
  assigned_by_admin_id_chirho: string;
  created_timestamp_chirho: string;
  updated_timestamp_chirho: string;
}

export interface HourlySignupChirho {
  signup_id_chirho: string;
  schedule_id_chirho: string;
  slot_hour_chirho: number;
  participant_name_chirho: string;
  created_timestamp_chirho: string;
  updated_timestamp_chirho: string;
}

export interface LoginRequestChirho {
  username_chirho: string;
  password_chirho: string;
}

export interface LoginResponseChirho {
  token_chirho: string;
  refresh_token_chirho: string;
}

export interface ScheduleQueryChirho {
  church_id_chirho?: string;
  start_date_chirho?: string;
  end_date_chirho?: string;
}

export interface CreateContinentChirho {
  name_chirho: string;
  central_timezone_chirho: string;
}

export interface UpdateContinentChirho {
  name_chirho: string;
  central_timezone_chirho: string;
}

export interface CreateChurchChirho {
  name_chirho: string;
  continent_id_chirho: string;
  church_timezone_chirho: string;
  admin_details_note_chirho: string;
  internal_notes_chirho: string;
}

export interface UpdateChurchChirho {
  name_chirho: string;
  continent_id_chirho: string;
  church_timezone_chirho: string;
  admin_details_note_chirho: string;
  internal_notes_chirho: string;
}

export interface CreateScheduleChirho {
  church_id_chirho: string;
  worship_date_chirho: string;
  assigned_by_admin_id_chirho: string;
}

export interface UpdateScheduleChirho {
  church_id_chirho: string;
  worship_date_chirho: string;
  assigned_by_admin_id_chirho: string;
}

export interface CreateHourlySignupChirho {
  schedule_id_chirho: string;
  slot_hour_chirho: number;
  participant_name_chirho: string;
}

export interface UpdateHourlySignupChirho {
  schedule_id_chirho: string;
  slot_hour_chirho: number;
  participant_name_chirho: string;
} 