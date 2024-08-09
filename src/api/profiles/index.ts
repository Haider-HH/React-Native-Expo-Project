import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../lib/supabase";
import { Tables } from "../../types";

export const useGetProfileData = (user_id: string) => {
    return useQuery<Tables<"profiles">>({
        queryKey: ["profiles", user_id],
        queryFn: async () => {
            const {data: userData, error} = await supabase.from("profiles").select('*').eq('id', user_id).single();
            if (error) {
                throw new Error(error.message);
            }
            return userData;
        }
    });
};