import { provide } from 'inversifyExpress/index'

@provide('UserService')
export default class UserService {

  public getUserList (id: number) {
    return { id }
  }

}
