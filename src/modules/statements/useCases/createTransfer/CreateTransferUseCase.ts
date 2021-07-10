import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { Statement } from "../../entities/Statement";
import { IStatementsRepository } from "../../repositories/IStatementsRepository";
import statementView from "../../views/statementView";
import ICreateTransferDTO from "./ICreateTransferDTO";

@injectable()
class CreateTransferUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StatementsRepository')
    private statementsRepository: IStatementsRepository
  ) {}
  async execute({ amount, description, sender_user_id, receiver_user_id }: ICreateTransferDTO) {
    const receiver_user = await this.usersRepository.findById(receiver_user_id);

    if(!receiver_user) {
      throw new AppError('User not found')
    }

    const { balance } = await this.statementsRepository.getUserBalance({ user_id: sender_user_id });

    if (balance < amount) {
      throw new AppError('No enough cash!')
    }

    const transfer = {
      amount,
      description,
      type: 'transfer',
      user_id: sender_user_id,
      receiver_id: receiver_user_id
    } as Statement

    const operation = await this.statementsRepository.create(transfer)

    return statementView.show(operation);
  }
}

export default CreateTransferUseCase;