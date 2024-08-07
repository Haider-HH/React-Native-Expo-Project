import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../lib/supabase";
import { useAuth } from "@/src/providers/AuthProvider";
import { Tables } from "@/src/database.types";
import { InsertTables } from "@/src/types";

export const useInsertOrderItems = () => {
    const queryClient = useQueryClient();

    return useMutation({
      async mutationFn(items: InsertTables<'order_items'>[]) {
         const {error, data: newProduct} = await supabase.from('order_items').insert(items).select();
        
        if (error) {
          throw new Error(error.message)
        };
        return newProduct;
      },
    })
};
  