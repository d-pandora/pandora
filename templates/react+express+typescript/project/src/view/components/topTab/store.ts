import { useStore } from 'utils/store'

export interface ITab {
  value: string, // tab上显示的文字
  title?: string, // 鼠标hover时提示
  key: string,
}

export default function () {
  
  const initTabData = {
    tabs: [
      { value: 'tab 1', title: 'tab 1', key: '/user/list' },
      { value: 'tab 2', title: 'tab 2', key: '/about' },
    ],
    activeKey: '/about',
  }
  
  const topTabStore = useStore('topTabStore')

  const [tabData, setTabData] = topTabStore(initTabData)

  function updateTabData(value: any) {
    setTabData({
      ...tabData,
      ...value,
    })
  }

  /**
   * 
   * @param key 需要关闭的tab的key
   */
  function removeTab(key: string) {
    const { tabs, activeKey } = tabData
    let index = tabs.length - 1
    const newTabs = tabs.filter((tab: ITab, idx: number) => {
      if (tab.key === key) {
        // 找到需要关闭的tab
        index = idx
      }
      return tab.key !== key
    })
    let newActiveKey = activeKey
    if (key !== activeKey) {
      // 如果关闭的不是当前激活tab，则保持不变
      newActiveKey = activeKey
    } else {
      // 关闭的是当前激活tab，则打开当前tab的下一个tab
      index = Math.min(index, newTabs.length - 1)
      newActiveKey = index > -1 ? newTabs[index].key : ''
    }
    setTabData({
      tabs: newTabs,
      activeKey: newActiveKey,
    })
    return newActiveKey
  }

  return {
    tabData,
    updateTabData,
    removeTab,
  }
}