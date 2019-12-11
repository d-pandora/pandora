import React from 'react'

interface IProps {
  children: React.ReactNode;
}
interface IState {
  hasError: boolean;
}

/**
 * TODO
 * 目前hooks还不支持 getDerivedStateFromError 和 componentDidCatch
 * 等支持了之后需要改成function component
*/
export default class ErrorBoundary extends React.Component<IProps, IState> {
  public static getDerivedStateFromError () {
    return { hasError: true }
  }

  public constructor (props: IProps) {
    super(props)
    this.state = {
      hasError: false,
    }
  }

  public componentDidCatch () {
    // 将错误日志上报给服务器
  }

  public render () {
    const { hasError } = this.state
    if (hasError) {
      return (
        <div>
          <h1>Something went wrong.</h1>
        </div>
      )
    }
    // eslint-disable-next-line
    return this.props.children
  }
}
