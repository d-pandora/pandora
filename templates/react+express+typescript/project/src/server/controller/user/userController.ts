import { Logger } from 'winston'
import {
  Controller, Get, QueryParam, ResponseBody,
} from 'inversifyExpress/index'
import { provideNamed, inject } from 'inversifyExpress/ioc'
import { TYPE } from 'inversifyExpress/constants'

import UserService from 'service/user/userService'


@provideNamed(TYPE.Controller, 'UserController')
@Controller('/')
export default class UserController {
  @inject('Logger')
  private logger: Logger

  @inject('UserService')
  private UserService: UserService

  @Get('api/user/list')
  @ResponseBody
  public async getUserList(
    @QueryParam('id') id: number,
  ) {
    const result = await this.UserService.getUserList(id)
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true)
      }, 3000)
    })
    return {
      totalCount: 100,
      currentPage: 1,
      pageSize: 20,
      data: [result],
    }
  }
}
