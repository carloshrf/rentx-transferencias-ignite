import { Statement } from "../entities/Statement";

export default {
  show(data: Statement) {
    if (data.type === 'transfer') 
      return {
        id: data.id,
        sender_id: data.user_id,
        amount: data.amount,
        description: data.description,
        type: data.type,
        created_at: data.created_at,
        updated_at: data.updated_at
      };

    return {
      id: data.id,
      user_id: data.user_id,
      amount: data.amount,
      description: data.description,
      type: data.type,
      created_at: data.created_at,
      updated_at: data.updated_at
    };
  }
}