export class UserAlreadyExistsError extends Error {
  constructor(message = "User already exists with e-mail") {
    super(message);
    this.name = "UserAlreadyExistsError";
  }
}

export class NotFoundError extends Error {
  constructor(message = "User Not Found") {
    super(message);
    this.name = "NotFoundError";
  }
}
export class UserDeleteError extends Error {
  constructor(message = "Error deleting user") {
    super(message);
    this.name = "UserDeleteError";
  }
}