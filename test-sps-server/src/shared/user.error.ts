export class UserAlreadyExistsError extends Error {
  constructor(message = "User already exists with e-mail") {
    super(message);
    this.name = "UserAlreadyExistsError";
  }
}

export class UserNotFoundError extends Error {
  constructor(message = "Usuário não encontrado") {
    super(message);
    this.name = "UserNotFound";
  }
}
export class UserDeleteError extends Error {
  constructor(message = "Erro ao remover usuário") {
    super(message);
    this.name = "UserDeleteError";
  }
}