
export default class UrnHelper {
	public static NumpadDigits: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
	public static IsVoteValid(electoralNumber?: number) : boolean {
		if (!electoralNumber) 
			return false;

		return electoralNumber >= 10 && electoralNumber <= 99;
	}

	public static ParseDigits(firstDigit?: number, secondDigit?: number): number {
		let electoralNumber =  '';

		if (firstDigit !== undefined) {
			electoralNumber += firstDigit;
		}
		if (secondDigit !== undefined) {
			electoralNumber += secondDigit;
		}


		return parseInt(electoralNumber, 10);
	}
}