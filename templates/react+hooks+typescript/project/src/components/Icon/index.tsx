import React from 'react'
import { Tooltip } from 'antd'
import '../../font/iconfont.css'

const IconTypes = {
  question: 'icon-question',
  questionFill: 'icon-question-fill',
  mobile: 'icon-dianhua',
  view: 'icon-icon2',
  edit: 'icon-icon3',
  copy: 'icon-icon4',
  import: 'icon-icon5',
  export: 'icon-icon6',
  search: 'icon-icon7',
  retract: 'icon-icon8',
  open: 'icon-icon9',
  batch: 'icon-icon10',
  viewHide: 'icon-icon32',
  success: 'icon-icon33',
  fail: 'icon-icon34',
  warning: 'icon-icon35',
  tip: 'icon-icon36',
  location: 'icon-icon37',
  message: 'icon-icon38',
  information: 'icon-icon39',
  date: 'icon-icon40',
  add: 'icon-tianjia',
  close: 'icon-guanbianniu',
  delete: 'icon-shanchu',
  more: 'icon-gengduo1-copy',
  arrowUp: 'icon-guanbiquanbuzhankai',
  arrowDown: 'icon-shouqijiantou',
}

interface Props {
  type: keyof typeof IconTypes;
  color?: string;
  size?: string;
  onClick?: (event: any) => void | undefined;
  title?: string;
  pointer?: boolean;
  className?: string;
}

export default function Icon (props: Props) {
  const { color, size = '14px', title, pointer, onClick, className, type } = props
  const icon = (
    <i
      className={`${className || ''} iconfont ${IconTypes[type]} ${pointer ? 'interactive' : ''}`}
      style={{ color, fontSize: size }}
      onClick={onClick}
    />
  )
  if (title) {
    return (
      <Tooltip placement="top" title={title}>
        {icon}
      </Tooltip>
    )
  }
  return icon
}
