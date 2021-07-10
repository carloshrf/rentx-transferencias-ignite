export default interface ICreateTransferDTO {
  amount: number;
  description: string;
  sender_user_id: string;
  receiver_user_id: string;
}