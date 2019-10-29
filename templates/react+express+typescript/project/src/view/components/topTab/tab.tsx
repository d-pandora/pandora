import React, { SFC } from 'react'
import { Icon } from 'antd'
import { ITab } from './store'

type ClickEvent = React.MouseEvent<HTMLDivElement, MouseEvent>

export interface ITabProps {
  item: ITab,
  active?: boolean,
  onClick?: (item: ITab) => void, 
  onClose?: (item: ITab) => void, 
}

const Tab = function(props: ITabProps) {
  const { item, active, onClick, onClose } = props
  const { value, title } = item
  const handleClick = (e: ClickEvent) => {
    onClick && onClick(item)
  }
  const handleClose = (e: ClickEvent) => {
    e.stopPropagation()
    onClose && onClose(item)
  }
  return (
    <div className={active ? 'tab active-tab' : 'tab'} key={title} title={title} onClick={handleClick}>
      {value} <Icon type="close" onClick={handleClose} />
    </div>
  )
}

export default Tab