import { createStore } from 'east-store'

export interface ITab {
  value: string, // tab上显示的文字
  title?: string, // 鼠标hover时提示
  key: string,
}

interface TabData {
  tabs: ITab[],
  activeKey: string,
}

const initTabData: TabData = {
  tabs: [],
  activeKey: '',
}

export const topTabStore = createStore(initTabData, {
  initTabData: () => (state) => {
    const storageState = localStorage.getItem('topTabs')
    if (storageState) {
      state = JSON.parse(storageState)
    }
    return state
  },
  updateTabData: (value: ITab) => async (state) => {
    state = {
      tabs: [
        ...state.tabs,
        value,
      ],
      activeKey: value.key,
    }
    localStorage.setItem('topTabs', JSON.stringify(state))
    return state
  },
  updateActiveTab: (activeKey: string) => (state) => {
    state.activeKey = activeKey
    localStorage.setItem('topTabs', JSON.stringify(state))
  },
  removeTab: (key: string) => (state) => {
    const { tabs, activeKey } = state
    let index = tabs.length - 1
    const newTabs = tabs.filter((tab: ITab, idx: number) => {
      if (tab.key === key) {
        // 找到需要关闭的tab
        index = idx
      }
      return tab.key !== key
    })
    let newActiveKey = activeKey
    if (key === activeKey) {
      // 关闭的是当前激活tab，则打开当前tab的下一个tab
      index = Math.min(index, newTabs.length - 1)
      newActiveKey = index > -1 ? newTabs[index].key : ''
    }
    state = {
      tabs: newTabs,
      activeKey: newActiveKey,
    }
    localStorage.setItem('topTabs', JSON.stringify(state))
    return state
  },

})
