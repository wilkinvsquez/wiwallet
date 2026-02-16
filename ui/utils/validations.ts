/**
 * Method to handle the email validation
 * @param email string
 * @returns boolean
 */
export const validateEmail = (email: string): boolean => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};

/**
 * Method to handle the password validation
 * @param password string
 * @returns { isValid: boolean; message: string }
 */
export const validatePassword = (
	password: string,
): { isValid: boolean; message: string } => {
	if (password.length < 6) {
		return {
			isValid: false,
			message: "La contraseña debe tener al menos 6 caracteres",
		};
	}
	return { isValid: true, message: "" };
};

/**
 * Method to handle the name validation
 * @param name string
 * @returns boolean
 */
export const validateName = (name: string): boolean => {
	return name.trim().length >= 2;
};
