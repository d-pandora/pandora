import React, { SFC } from 'react'
import { Menu, Icon } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router-dom'

const SubMenu = Menu.SubMenu

interface IMenu {
  name: string,
  url: string,
  icon?: string,
  children?: IMenu[],
}
export interface IProps extends RouteComponentProps {
  data: IMenu[],
}

const MenuComponent: SFC<IProps> = function (props) {
  const { data } = props

  const handleClickMenu = (e: any) => {
    props.history.push(e.key)
  }

  return (
    <Menu
      mode="inline"
      theme="dark"
      onClick={handleClickMenu}
    >
      {
        data.map((menu: any, index: number) => {
          if (menu.children && menu.children.length) {
            return (
              <SubMenu
                key={index}
                title={<span>{ menu.icon ? <Icon type={menu.icon} /> : null}<span>{menu.name}</span></span>}
              >
                {
                  menu.children.map((subMenu: any) => <Menu.Item key={subMenu.url}><span>{subMenu.name}</span></Menu.Item>)
                }
              </SubMenu>
            )
          } else {
            return (
              <Menu.Item key={menu.url}>
                { menu.icon ? <Icon type={menu.icon} /> : null}
                <span>{menu.name}</span>
              </Menu.Item>
            )
          }
        })
      }
    </Menu>
  )
}

export default withRouter(MenuComponent)