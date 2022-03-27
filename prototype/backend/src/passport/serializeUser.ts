export function makeSerializeUser() {
	return (user: any, done: any) => {
		done(null, user._id);
	};
}
