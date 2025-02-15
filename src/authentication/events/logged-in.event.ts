import { UserEntity } from 'src/user/entities/user.entity';

export default class AuthenticationLoggedInEvent {
  constructor(public readonly user: UserEntity) {}
}
