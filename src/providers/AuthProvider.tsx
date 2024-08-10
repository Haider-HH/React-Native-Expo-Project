import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";

type Profile = {
    id: string;
    group: string;
    avatar_url: string | null;
    full_name: string | null;
    updated_at: string | null;
    username: string | null;
    website: string | null;
};

type AuthData = {
    session: Session | null;
    profile: Profile | null;
    loading: boolean;
    isAdmin: boolean;
};

const AuthContext = createContext<AuthData>({
    session: null,
    loading: true,
    profile: null,
    isAdmin: false,
});

const AuthProvider = ({children}: PropsWithChildren) => {
    const [session, setSession] = useState<Session | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    const fetchProfile = async (userId: string) => {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) {
            console.error('Error fetching profile:', error);
            setProfile(null);
        } else {
            setProfile(data);
        }
    };

    useEffect(() => {
        const fetchSession = async () => {
            const {data: {session}} = await supabase.auth.getSession();
            setSession(session);

            if (session) {
                await fetchProfile(session.user.id);
            } else {
                setProfile(null);
            }
            setLoading(false);
        };

        fetchSession();

        supabase.auth.onAuthStateChange(async (_event, session) => {
            setSession(session);
            if (session) {
                await fetchProfile(session.user.id);
            } else {
                setProfile(null);
            }
        });
    }, []);

    useEffect(() => {
        if (profile) {
            setIsAdmin(profile.group === "ADMIN");
        } else {
            setIsAdmin(false);
        }
    }, [profile]);

    return (
        <AuthContext.Provider value={{session, loading, profile, isAdmin}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
