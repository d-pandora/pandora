import React from 'react'

interface IProps {}
interface IState {
  hasError: boolean,
}

/** 
 * TODO
 * 目前hooks还不支持 getDerivedStateFromError 和 componentDidCatch
 * 等支持了之后需要改成function component
*/
export default class ErrorBoundary extends React.Component<IProps, IState> {
  state = {
    hasError: false,
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // 将错误日志上报给服务器
  }

  render() {
    const { hasError } = this.state
    if (hasError) {
      return (
        <div>
          <h1>Something went wrong.</h1>
        </div>
      )
    }

    return this.props.children; 
  }
}