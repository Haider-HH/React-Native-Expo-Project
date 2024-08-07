import { supabase } from "@/src/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const useInsertOrderSub = () => {
    const queryClient = useQueryClient();
    
    useEffect(() => {
      const channels = supabase.channel('custom-insert-channel')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'orders' },
          (payload) => {
            console.log('Change received!', payload);
            queryClient.invalidateQueries({queryKey: ['orders']}); // Refreshes the orders list as soon an order is created
          }
        ).subscribe();
    
      return () => {
        channels.unsubscribe();
      };
      
    }, []);

};

export const useUpdateOrderSub = (id: number) => {
    const queryClient = useQueryClient();
    useEffect(() => {
        const orders = supabase
          .channel('custom-filter-channel')
          .on(
            'postgres_changes',
            {
              event: 'UPDATE',
              schema: 'public',
              table: 'orders',
              filter: `id=eq.${id}`,
            },
            (payload) => {
                queryClient.invalidateQueries({queryKey: ['orders', id]}); // Refreshes the orders list as soon an order is created

            }
          )
          .subscribe();
      
        return () => {
          orders.unsubscribe();
        };
      }, []);
}