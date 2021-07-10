import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateTransferUseCase from "./CreateTransferUseCase";

class CreateTransferController {
  async execute(request: Request, response: Response): Promise<Response> {
    const { amount, description } = request.body;
    const { user_id: receiver_user_id } = request.params;
    const { id : sender_user_id } = request.user;

    const createTransferUseCase = container.resolve(CreateTransferUseCase);
    
    const transfer = await createTransferUseCase.execute({ 
      amount, 
      description, 
      sender_user_id, 
      receiver_user_id 
    });

    return response.json(transfer)
  }
}

export default CreateTransferController;