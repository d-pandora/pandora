import React, { Fragment } from 'react'
import commonStore from 'store/common'

interface IProps {
  authCode: string;
  children: React.ReactNode;
}

export default function AuthWrapper (props: IProps): JSX.Element {
  const { authCode, children } = props
  const [globalConfig] = commonStore.useStore()
  console.log('authcode', authCode, globalConfig.AUTHCODE, globalConfig.AUTHCODE[authCode])
  if (!globalConfig.AUTHCODE[authCode]) {
    return <div />
  }
  return <Fragment key={authCode}>{children}</Fragment>
}
