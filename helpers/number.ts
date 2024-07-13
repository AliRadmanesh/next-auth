export const generateOtpCode = () => { 
	const digits = '0123456789'
	const length = digits.length
	let OTP = ''

  for (let i = 0; i < 5; i++) {
		OTP += digits[Math.floor(Math.random() * length)]
	}

	return OTP
}
