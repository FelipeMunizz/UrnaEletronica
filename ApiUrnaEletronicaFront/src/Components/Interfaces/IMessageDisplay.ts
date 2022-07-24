export default interface IMessageDisplay {
	message: string;
	messageType: 'error' | 'warning' | 'success';
}