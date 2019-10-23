import React, { SFC, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { OPEN_TOPTAB_EVENT } from 'utils/constants'
import tabDataStore, { ITab } from './store'
import { ITabProps } from './tab'

export interface IProps {
  renderItem: (item: ITabProps) => JSX.Element | null,
}

const TopTab: SFC<IProps> = function (props) {
  const { renderItem } = props
    
  const store = tabDataStore()

  const handleOpenTab = (event: Event) => {
    event.stopPropagation()
    const newtab = (event as CustomEvent).detail as ITab
    const tabs = store.tabData.tabs
    
    if (tabs.some((tab: ITab) => tab.key === newtab.key)) {
      store.updateTabData({ activeKey: newtab.key })
    } else {
      store.updateTabData({ tabs: [...tabs, newtab],activeKey: newtab.key })
    }
  }
  
  useEffect(() => {
    window.addEventListener(OPEN_TOPTAB_EVENT, handleOpenTab)
    return () => {
      window.removeEventListener(OPEN_TOPTAB_EVENT, handleOpenTab)
    }
  }, [store])

  let {
    tabData,
    updateTabData,
    removeTab,
  } = store
  const { tabs, activeKey } = tabData
  let history = useHistory()
  const container = React.createRef<HTMLDivElement>()

  const handleClickTab = (item: ITab) => {
    history.push(item.key)
    updateTabData({ activeKey: item.key })
  }
  const handleCloseTab = (item: ITab) => {
    const newKey = removeTab(item.key)
    if (newKey !== activeKey) {
      history.push(newKey)
    }
  }

  return (
    <div className="top-tab-container" ref={container}>
      {tabs.map((item: ITab) => {
        return renderItem({
          item,
          active: item.key === activeKey,
          onClick: handleClickTab,
          onClose: handleCloseTab,
        })
      })}
    </div>
  )
}

export default TopTab