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
  ): Promise<any> {
    this.UserService.getUserList(id)
    await new Promise((re, rj) => {
      setTimeout(() => re(true), 2000)
    })
    return {
      totalCount: 100,
      currentPage: 1,
      pageSize: 20,
      data: [{
        inputItem: 'inputItem',
        inputNumberItem: 1,
        selectItem: 1,
        radioItem: 1,
        checkboxItem: 1,
        treeSelectItem: [1],
        datePickerItem: new Date(),
        rangePickerItem: [new Date(), new Date()],
      }],
    }
  }
}
