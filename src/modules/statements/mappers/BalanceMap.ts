import { Statement } from "../entities/Statement";
import statementView from "../views/statementView";

export class BalanceMap {
  static toDTO({statement, balance}: { statement: Statement[], balance: number}) {
    const parsedStatement = statement.map(item => statementView.show(item));

    return {
      statement: parsedStatement,
      balance: Number(balance)
    }
  }
}
