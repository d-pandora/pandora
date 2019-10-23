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
    const { title } = e.item.node.dataset
    props.history.push(e.key)
    window.dispatchEvent(new CustomEvent('openTab', { detail: { key: e.key, value: title, title }}))
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
                data-title={menu.name}
                title={<span>{ menu.icon ? <Icon type={menu.icon} /> : null}<span>{menu.name}</span></span>}
              >
                {
                  menu.children.map((subMenu: any) => <Menu.Item key={subMenu.url}><span>{subMenu.name}</span></Menu.Item>)
                }
              </SubMenu>
            )
          } else {
            return (
              <Menu.Item key={menu.url} data-title={menu.name}>
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