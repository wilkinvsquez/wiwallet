import { Redirect } from "expo-router";
import { useAuth } from "../context/auth.context";

export default function Index() {
	const { signed, loading } = useAuth();

	if (loading) return null;

	if (signed) {
		return <Redirect href='/(main)/home' />;
	}

	return <Redirect href='/login' />;
}
