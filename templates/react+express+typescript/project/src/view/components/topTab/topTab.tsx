import React, { SFC, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { OPEN_TOPTAB_EVENT } from 'utils/constants'
import { ITab, topTabStore } from './store'
import { ITabProps } from './tab'

export interface IProps {
  renderItem: (item: ITabProps) => JSX.Element | null,
}

const TopTab: SFC<IProps> = function (props) {
  const { renderItem } = props

  const [state, actions] = topTabStore.useState()

  const history = useHistory()

  const handleOpenTab = (event: Event) => {
    event.stopPropagation()
    const newtab = (event as CustomEvent).detail as ITab
    const { tabs } = state

    if (tabs.find((tab: ITab) => tab.key === newtab.key)) {
      actions.updateActiveTab(newtab.key)
    } else {
      actions.updateTabData(newtab)
    }
  }

  // did mount init tabData from localStorage
  useEffect(() => {
    actions.initTabData()
  }, [])

  useEffect(() => {
    window.addEventListener(OPEN_TOPTAB_EVENT, handleOpenTab)
    return () => {
      window.removeEventListener(OPEN_TOPTAB_EVENT, handleOpenTab)
    }
  }, [state])

  useEffect(() => {
    history.push(state.activeKey)
  }, [state.activeKey])

  const { tabs, activeKey } = state

  const container = React.createRef<HTMLDivElement>()

  const handleClickTab = (item: ITab) => {
    history.push(item.key)
    actions.updateActiveTab(item.key)
  }
  const handleCloseTab = (item: ITab) => {
    actions.removeTab(item.key)
  }

  return (
    <div className="top-tab-container" ref={container}>
      {tabs.map((item: ITab) => renderItem({
        item,
        active: item.key === activeKey,
        onClick: handleClickTab,
        onClose: handleCloseTab,
      }))}
    </div>
  )
}

export default TopTab
