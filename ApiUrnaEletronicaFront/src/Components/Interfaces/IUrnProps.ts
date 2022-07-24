import IErrorResponse from '../../Interfaces/IErrorResponse';

export default interface IUrnProps {
	setMessage(messageInfo: IErrorResponse): void;
}