import { UserEntity } from 'src/user/entities/user.entity';

export default class AuthenticationRegisteredEvent {
  constructor(public readonly user: UserEntity) {}
}
